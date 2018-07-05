<template>
  <transition name="slide">
    <div class="container">
      <list-item
        :pullup="true"
        :title="itemName"
        @scroll="scroll"
        @touchEnd="touchEnd"
        @scrollEnd="scrollEnd"
        :loadingText="loadingText"
        :loadingStyle="loadingStyle"
        :loadingClass="loadingClass"
        @h_click="addWork"
      >
        <ul class="ul">
          <li v-for="item in itemList" :key="item.id" @click="itemDetail(item)">
            <div class="box">
              <div class="avatar">
                <img :src="icon">
              </div>
              <div class="item_text" v-if="item.applydate">
                <p>申请时间：{{item.applydate}}</p>
                <p>说明： <span v-html="item.title"></span></p>
                <p :class="{unfinished:item.step!=='0'}">{{item.next}}</p>
              </div>
              <div class="item_text" v-if="item.time">
                <p>{{formatTime(item.time)}}</p>
              </div>
            </div>
          </li>
        </ul>
        <no-result v-if="!itemList.length" :title="NoResultTitle"></no-result>
      </list-item>
      <toast type="cancel" v-model="toastShow" :text="toastMsg" position="bottom"></toast>
      <router-view></router-view>
    </div>
  </transition>

</template>

<script>
  import ListItem from '@/base/list-item'
  import {getApplyList, getSalarys} from '@/api/get'
  import {Toast} from 'vux'
  import NoResult from '@/base/no-result'
  export default {
    name: 'item_detail',
    data() {
      return {
        item: '',
        itemName: '',
        itemList: [],
        page: 1,
        loadingText: '',
        loadingStyle: {},
        loadingClass: [],
        NoResultTitle: '',
        toastMsg: ''
      }
    },
    methods: {
      addWork(){
        this.toastMsg = '新建流程请在PC端或APP中完成~';
        // let path = `/navbars/new_flow/${this.item}`;
        // this.$router.push({path});
      },
      formatTime(time){
        let year=time.substr(0,4);
        let momth=time.substr(4,6);
        let formatTime=`${year}年${momth}月工资`;
        return formatTime;
      },
      itemDetail(item) {
        console.log('item',item);
        if(this.item === 'salarys'){
          this.$router.push({
            path: '/navbars/detail/salarys',
            query: {
              id: item.salaryid
            }
          });
        }else{
          this.$router.push({
            path: '/navbars/detail/apply_show',
            query: {
              op: this.item,
              id: item.id
            }
          });
        }
      },
      scroll(pos) {
        if (pos.y > 30 && !this.loadingText.length) {
          this.loadingText = '刷新中';
          this.loadingClass = ['fa-spinner', 'fa-spin'];
          this.loadingStyle = {
            top: '45px',
            bottom: ''
          };
          this.page = 1;
          this._getApplyList(this.item, this.page);
          this.loadingText = '刷新成功';
        }
        if (pos.y < -15 && !this.loadingText.length) {
          this.loadingText = '请求中';
          this.loadingClass = ['fa-spinner', 'fa-spin'];
          this.loadingStyle = {
            top: '',
            bottom: 0
          };
          this.page += 1;
          this._getApplyList(this.item, this.page, true);
        }
      },
      touchEnd() {
        this.loadingText = '';
      },
      scrollEnd() {
        this.loadingText = '';
      },
      _getApplyList(item, page, loadmore = false) {
        if (item === 'salarys') {
          getSalarys().then((res) => {
            this._setData(res,page,loadmore);
          })
        } else {
          getApplyList(item, page).then((res) => {
            this._setData(res,page,loadmore);
          });
        }
      },
      _setData(res,page,loadmore){
        let new_lists = res.data;
        if (loadmore) {
          if (new_lists.length <= 0) {
            this.page -= 1;
            this.loadingText = `没有更多${this.itemName}`;
            this.loadingClass = ['fa-hand-stop-o'];
            return;
          }
          this.itemList.push(...new_lists);
          this.loadingText = '请求成功';
          this.loadingClass = ['fa-check-circle-o'];
        } else {
          this.itemList = [...new_lists];
          this.loadingClass = ['fa-check-circle-o'];
          if (!this.itemList.length) {
            this.NoResultTitle = `暂无${this.itemName}`;
          }
        }
      },
      _initPage() {
        let route = this.$route.query;
        this.item = route.item;
        this.itemName = route.name;
        this.icon = route.icon;
        this._getApplyList(this.item);
      },
    },
    watch:  {
      '$route': function(to,from){
        if(from.path==='/navbars/detail/apply_show') {
          this._initPage();
        }
      },
      toastMsg: function(val) {
        if(val.length){
          setTimeout(()=>{
            this.toastMsg = '';
          },1000);
        }
      }
    },
    created() {
      this._initPage();
    },
    computed: {
      toastShow : {
        get: function () {
          return this.toastMsg.length>0?true:false;
        },
        set: function () {

        }
      }
    },
    components: {
      ListItem,
      Toast,
      NoResult
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  @import '../../static/styles/list-item.less';

  .container {
    z-index: 1;
  }

</style>
<style>
  .weui-toast {
    padding: 0 10px;
    border-radius: 10px;
    width: 10em;
  }

  ul.ul {
    padding: 10px 0 15px;
  }
</style>

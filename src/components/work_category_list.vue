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
        h_btn_text=""
      >
        <ul class="ul" id="list_item">
          <li v-for="item in itemList" :key="item.id" @click="itemDetail(item)">
            <div class="box">
              <div class="avatar user">
                <img v-lazy="item.truepic">
              </div>
              <div class="item_text">
                <p>申请人：{{item.uname}}</p>
                <p>申请时间：{{item.creadetime}}</p>
                <p>说明： <span class="explain" v-html="item.detail"></span></p>
              </div>
            </div>
          </li>
        </ul>
        <no-result v-if="!itemList.length" :title="NoResultTitle"></no-result>
      </list-item>
      <router-view></router-view>
    </div>
  </transition>

</template>

<script>
  import ListItem from '@/base/list-item'
  import {getBacklog,getDoneWork} from '@/api/get'
  import {Toast, XImg} from 'vux'
  import NoResult from '@/base/no-result'

  export default {
    name: 'work_category_list',
    data() {
      return {
        prefix: '',
        type: '',
        itemName: '',
        itemList: [],
        loadingText: '',
        loadingStyle: {},
        loadingClass: [],
        NoResultTitle: ''
      }
    },
    methods: {
      itemDetail(item) {
        console.log(item);
        let id='';
        if('wait'===this.type){
          id=item.aid;
        }else{
          id=item.id;
        }
        this.$router.push({
          path: '/work/category/detail',
          query: {
            op: this.prefix,
            id,
            type:this.type
          }
        })
      },
      scroll(pos) {
        if (pos.y > 30 && !this.loadingText.length) {
          this.loadingText = '刷新中';
          this.loadingClass = ['fa-spinner', 'fa-spin'];
          this.loadingStyle = {
            top: '45px',
            bottom: ''
          };
          this._getApplyList(this.prefix);
          this.loadingText = '刷新成功';
        }
      },
      touchEnd() {
        this.loadingText = '';
      },
      scrollEnd() {
        this.loadingText = '';
      },
      _getApplyList(prefix) {
        if ('wait' === this.type) {
          getBacklog(prefix).then((res) => {
            let new_lists = res.data;
            this.itemList = [...new_lists];
            this.loadingClass = ['fa-check-circle-o'];
            if (!this.itemList.length) {
              this.NoResultTitle = `暂无${this.itemName}`;
            }
          })
        }
        if('done'===this.type){
          getDoneWork(prefix).then((res) => {
            let new_lists = res.data;
            this.itemList = [...new_lists];
            this.loadingClass = ['fa-check-circle-o'];
            if (!this.itemList.length) {
              this.NoResultTitle = `暂无${this.itemName}`;
            }
          })
        }
      },
      _initPage() {
        let route = this.$route.query;
        this.prefix = route.prefix;
        this.itemName = route.prefixName;
        this.type = route.type;
        this._getApplyList(this.prefix, this.type);
      }
    },
    watch:  {
      '$route': function(to,from){
        if(from.path==='/work/category/detail') {
          this._initPage();
        }
      }
    },
    created() {
      this._initPage();
    },
    computed: {},
    components: {
      ListItem,
      Toast,
      NoResult,
      XImg
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  @import '../../static/styles/list-item.less';

  .container {
    z-index: 6;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
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

  img[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default_head_img.png");
    background-size: 100%;
  }
</style>

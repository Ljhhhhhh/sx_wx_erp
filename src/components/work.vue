<template>
  <div id="work" ref="container">
    <div class="main">
      <button-tab ref="tab">
        <button-tab-item selected @on-item-click="_getBacklog">待办</button-tab-item>
        <button-tab-item @on-item-click="_getDoneWork">已办</button-tab-item>
      </button-tab>
      <div>
        <div ref="wrapper" class="works_list">
          <group gutter="0" ref="works">
            <cell
              v-for="item in backloglist"
              :key="item.prefix"
              :border-intent="false"
              @click.native="goCategorylist(item,'wait')"
              v-show="backloglist_show">
              <p slot="title">
                <i class="work_icon" :class="item.prefix"></i>
                <span>{{item.opname}}</span>
              </p>
              <badge :text="item.count"></badge>
            </cell>
            <cell
              v-for="item in donelist"
              :key="item.name"
              :border-intent="false"
              @click.native="goCategorylist(item,'done')"
              v-show="!backloglist_show">
              <p slot="title">
                <i class="work_icon" :class="item.op"></i>
                <span>{{item.name}}</span>
              </p>
              <badge :text="item.num"></badge>
            </cell>
            <no-result :title="no_result_title" v-show="no_result_title.length"></no-result>
          </group>
          <p class="loading_dom" ref="loading" v-show="loading_show">
            <inline-loading></inline-loading>
          </p>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <footer-tab :activeIndex="2" :btn_state="false" ref="footertab"></footer-tab>
  </div>
</template>
<script>
  import {
    Group,
    Cell,
    Badge,
    ButtonTab,
    ButtonTabItem,
    InlineLoading
  } from 'vux'
  import FooterTab from '@/base/tab'
  import {
    getBacklog,
    getDoneWork
  } from '@/api/get'
  import {
    calHei
  } from 'static/js/dom'
  import Bscroll from 'better-scroll'
  import NoResult from '@/base/no-result'
  export default {
    name: 'Work',
    data() {
      return {
        backloglist: [],
        donelist: [],
        backloglist_show: true,
        loading_show: false,
        no_result_title:''
      }
    },
    methods: {
      goCategorylist(item,type){
        let prefix,prefixName
        if(type==='wait'){
          prefix=item.prefix;
          prefixName=item.opname
        }else{
          prefix=item.op;
          prefixName=item.name
        }

        this.$router.push({
          path:'/work/category',
          query:{
            prefix,
            prefixName,
            type
          }
        })
      },
      _getBacklog() {
        this.no_result_title='';
        getBacklog().then((res) => {
            this.backloglist = res.data;
            this.backloglist_show = true;
            if(!this.backloglist.length){
              this.no_result_title='暂无待办事宜';
            }
        });
      },
      _getDoneWork() {
        this.no_result_title='';
        getDoneWork().then((res) => {
            this.donelist = res.data;
            this.backloglist_show = false;
          if(!this.donelist.length){
            this.no_result_title='暂无已办事宜';
          }
        });
      },
      _initpage() {
        this._getBacklog();
        this.$nextTick(() => {
          calHei(this.$refs.container, this.$refs.wrapper, this.$refs.tab, this.$refs.footertab);
          this.$refs.works.$el.children[0].style.minHeight=parseInt(this.$refs.wrapper.style.height)+0.5+'px';
          this.scroll = new Bscroll(this.$refs.wrapper, {
            probeType: 2,
            click:true
          })
          let _this = this;
          this.scroll.on('scroll', function (position) {
            if (position.y > 20 && !_this.loading_show) {
              _this.loading_show = true;
              if (_this.backloglist_show) {
                _this._getBacklog();
              } else {
                _this._getDoneWork();
              }
            }
          });
          this.scroll.on('touchEnd', function (position) {
              _this.loading_show = false;
          })
        })
      },
    },
    watch: {
      '$route': function (to,from) {
        if(from.path === '/work/category' && from.query.type === 'wait') {
          this._initpage();
        }
      }
    },
    mounted() {
      this._initpage();
    },
    components: {
      FooterTab,
      Group,
      Cell,
      Badge,
      ButtonTab,
      ButtonTabItem,
      InlineLoading,
      NoResult,
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';

.weui-cell:last-child:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    left: 0;
}


  #work {
    width: 100%;
    height: 100%;
    .main{
      width: 100%;
      height: 100%;
    }
  }

  .vux-badge {
    background-color: @default_active;
  }

  .vux-button-group {
    width: 40%;
    margin: 0 auto 15px;
    padding-top: 10px;
  }

  .vux-button-group>a.vux-button-group-current {
    background-color: @default_active;
  }

  .vux-button-group>a.vux-button-tab-item-last:after,
  .vux-button-group>a.vux-button-tab-item-first:after {
    border-color: @default_active;
  }

  .works_list {
    background-color: #EEE;
    overflow-y: hidden;
    position: relative;
  }

  .loading_dom {
    position: absolute;
    top: 0;
    height: 30px;
    line-height: 30px;
    width: 100%;
    text-align: center;
  }

  .vux-label p {
    color: @default_color;
    font-size: 16px;
    span {
      line-height: 20px;
      vertical-align: middle;
    }
   #footer_tab li p{ font-size: 12px;}
    .work_icon {
      display: inline-block;
      width: 21px;
      height: 21px;
      background-color: #3c4c5c;
      margin-right: 5px;
      vertical-align: middle;
      background: url('../../static/images/icons/small_icons_sprite.png') no-repeat;
       background-size: 55px;
      &.jb{
        background-position: 0 -196px;
      }
      &.bf{
        background-position: -28px -315px;
      }
      &.bk{
        background-position: -31px -243px;
      }
      &.bx{
        background-position: -31px -48px;
      }
      &.lz{
        background-position: 0 -338px;
      }
      &.cc{
        background-position: 0 -169px;
      }
       &.de{
        background-position: 0 -142px;
      }
       &.gz{
        background-position: -31px -339px;
      }
      &.if{
        background-position: 0px -142px;
      }
      &.lf{
        background-position: 0px -142px;
      }
      &.jk{
        background-position: 0px -48px;
      }
       &.hr{
        background-position: -31px -361px;
      }
       &.qj{
        background-position: -0px -119px;
      }
      &.qs{
        background-position: -0px -406px;
      }
      &.rf{
       background-position: -0px -169px;
     }
      &.sg{
       background-position: -31px -196px;
      }
       &.ss{
       background-position: -0px -293px;
      }
       &.wr{
       background-position: -31px -383px;
      }
       &.wx{
       background-position: -31px -292px;
      }
       &.yk{
       background-position: -31px -143px;
      }
       &.fc{
       background-position: -0px -314px;
      }
      &.ly{
       background-position: -0px -94px;
      }
      &.wq{
       background-position: -31px -170px;
      }
       &.mpsq{
       background-position: -31px -118px;
      }
       &.dr{
       background-position: -0px -246px;
      }
       &.yc{
       background-position: -0px -246px;
      }
       &.mt{
       background-position: -0px -26px;
      }
       &.nt{
       background-position: -31px -70px;
      }
       &.pu{
       background-position: -0px -71px;
      }
      &.wl{
       background-position: -0px -71px;
      }
       &.yw{
       background-position: -31px -94px;
      }
      &.td{
       background-position: -31px -422px;
      }
       &.jm{
       background-position: -0px -445px;
      }
      &.bg{
       background-position: -31px -445px;
      }
       &.zz{
       background-position: -0px -360px;
      }
       &.sy{
       background-position: -31px -268px;
      } 
      &.kq{
       background-position: -31px -467px;
      }  
      &.fd{
       background-position: -0px -490px;
      }
      &.hc{
       background-position: -0px -512px;
      } 
       &.zp{
       background-position: -0px -467px;
      }

    }
  }

</style>

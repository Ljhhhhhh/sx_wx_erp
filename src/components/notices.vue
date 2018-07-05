<template>
  <transition name="slide">
    <div class="container" ref="container">
      <x-header :left-options="{backText: ''}" ref="header">公告</x-header>
      <p class="loading" v-show="scrolling" ref="loading">
        <span>{{loadingText}}</span>
        <inline-loading></inline-loading>
      </p>
      <div class="scroll" ref="wrapper">
        <div ref="content" class="notices_box">
          <div @click.stop.prevent="showDetail(item)" v-for="item in notices" :key="item.noticeid" class="new_list vux-1px-b" :class="item.readCls">
            <h5>{{item.noticetitle}}</h5>
            <p>发布时间：{{item.senddate}} 发布人：{{item.sendperson}}</p>
          </div>
        </div>
        <toast position='middle' class="toast" :time='1000' type='text' v-model="noMoreMsg">没有更多消息</toast>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>
<script>
  import {
    getNews
  } from '@/api/get'
  import {
    mapGetters
  } from 'vuex'
  import {
    calHei
  } from 'static/js/dom'
  import BScroll from 'better-scroll'
  import {
    XHeader,
    InlineLoading,
    Toast
  } from 'vux'
  import {
    updateNoticeStatus,
  } from '@/api/put'

  export default {
    data() {
      return {
        notices: [],
        loadingText: '',
        scrolling: false,
        msgsPage: 1,
        noMoreMsg: false,
      }
    },
    methods: {
      showDetail(item) {
        let id = item.noticeid;
        updateNoticeStatus(id).then(res => {
          if ('success' === res.data) {
            item.readCls = 'read';
          }else{
            console.log('状态更新失败');
          }
        });
        this.$router.push({
          path: `/notices/notice_detail`,
          query: {
            id
          }
        })
      },
      _getNotices(page, loadmore = false) {
        getNews(page,10).then((res) => {
            let new_notices = res.data;
            new_notices.forEach(item => {
              if (item.readperson.includes(`|${this.userinfo.u_id}|`)) {
                item.readCls = 'read'
              } else {
                item.readCls = 'unread'
              }
            })
            if (loadmore) {
              if (new_notices <= 0) {
                this.msgsPage -= 1;
                this.noMoreMsg = true;
                return;
              }
              this.notices.push(...new_notices);
            } else {
              this.notices = new_notices;
            }
        });
      },
      _initpage() {
        this._getNotices();
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: 1,
          click: true
        });
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 30 && !this.scrolling) {
            this.loadingText = '刷新中';
            this.scrolling = true;
            this.$refs.loading.style.top = '60px';
            this.$refs.loading.style.bottom = '';
            this.msgsPage = 1;
            this._getNotices(this.msgsPage);
          }
          if (pos.y < -30 && !this.scrolling) {
            this.loadingText = '请求中'
            this.scrolling = true;
            this.$refs.loading.style.bottom = '0';
            this.$refs.loading.style.top = '';
            this.msgsPage += 1;
            this._getNotices(this.msgsPage, true);
            this.$nextTick(this.scroll.refresh());
          }
        })
        this.scroll.on('scrollEnd', () => {
          this.scrolling = false;
          this.$refs.loading.style.display = 'none';
        })
        this.$nextTick(function () {
          if (this.$route.path !== '/notices') {
            return;
          }
          calHei(this.$refs.container, this.$refs.wrapper, this.$refs.header);
          this.$refs.content.style.minHeight = parseInt(this.$refs.wrapper.style.height) + 1 + 'px';
        })
      }
    },
    computed: {
      ...mapGetters([
        'userinfo'
      ])
    },
    mounted() {
      this._initpage();
    },
    components: {
      XHeader,
      InlineLoading,
      Toast,
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #F5F5F5;
  }

  .scroll {
    overflow: hidden;
  }

  .new_list {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: auto;
    padding: 5px 15px;
    box-sizing: border-box;
    &.unread{
      background-color: #fff5f7;
    }
    &.read{
      background-color: #FFF;
    }
    h5 {
      display: block; // max-width: 85%;
      line-height: 30px;
      font-size: 14px;
      color: #1b1b1b;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      line-height: 20px;
      color: #959595;
      font-size: 12px;
      span{
        display: inline-block;
        margin-right: 10px;
      }
    }
  }

  .loading {
    text-align: center;
    background-color: #F5F5F5;
    padding: 5px 0;
    position: fixed;
    width: 100%;
    height: auto;
    span {
      display: inline-block;
      color: #3C4C5C;
      vertical-align: middle;
      font-size: 14px;
    }
  }

</style>

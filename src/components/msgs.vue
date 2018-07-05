<template>
  <div class="cont" ref="container">
    <p class="loading" v-show="scrolling" ref="loading"><span>{{loadingText}}</span>
      <inline-loading></inline-loading>
    </p>
    <div ref="scroll" class="scroll">
      <ul id="msg_list" ref="scroll_list">
        <li v-for="item in msgs" :key="item.id" @click='read(item)'>
          <div class="box">
            <div class="avatar">
              <img v-lazy="item.avatar">
            </div>
            <div class="msg_text">
              <h5>
                <strong>{{item.user.applyuname}}
                  <em :class="item.readCls">{{item.isreadText}}</em>
                </strong>
                <span>{{item.posttime}}</span>
              </h5>
              <p>{{item.content}}</p>
            </div>
          </div>
        </li>
        <no-result :title="noMsgTitle" v-if="!msgs.length"></no-result>
      </ul>
    </div>
    <router-view></router-view>
    <footer-tab :activeIndex="5" :btn_state="false" ref="footertab"></footer-tab>
    <toast position='middle' class="toast" :time='1000' type='text' v-model="noMoreMsg">没有更多消息</toast>
  </div>
</template>
<script>
  import FooterTab from '@/base/tab'
  import {InlineLoading, Toast} from 'vux'
  import { getMessages } from '@/api/get'
  import {hasReadMsg} from '@/api/put'
  import BScroll from 'better-scroll'
  import NoResult from '@/base/no-result'
  import {mapGetters, mapMutations} from 'vuex'
  import {
    calHei
  } from 'static/js/dom'

  export default {
    data() {
      return {
        msgs: [],
        msgsPage: 1,
        scrolling: false,
        loadingText: '',
        noMoreMsg: false,
        noMsgTitle: ''
      }
    },
    methods: {
      read(item) {
        hasReadMsg(item.id).then(() => {
          item.isread = 1;
          item.isreadText = '已读';
          item.readCls = 'read';
          getMessages().then(res => {
            let total = 0;
            res.data.forEach(item => {
              if(item.isread === 0) {
                total++
              }
            });
            this.setMsgTotal(total);
          })
        })
      },
      _getMessages(page, loadmore = false) {
        this.noMsgTitle = '';
        getMessages(page).then((res) => {
          let new_msgs = res.data;
          new_msgs.forEach((item) => {
            item.avatar = item.user.applyupic;
            if (0 === parseInt(item.isread)) {
              item.isreadText = '未读';
              item.readCls = 'unread'
            } else {
              item.isreadText = '已读';
              item.readCls = 'read'
            }
          });
          if (loadmore) {
            if (new_msgs.length <= 0) {
              this.msgsPage -= 1;
              this.noMoreMsg = true;
              return;
            }
            this.msgs.push(...new_msgs);
            this.scroll.refresh();
          } else {
            this.msgs = [...new_msgs];
          }
          if (!this.msgs.length) {
            this.noMsgTitle = '暂无消息';
          }
          console.log(this.msgs);
        })
      },
      _initPage() {
        this.scroll = new BScroll(this.$refs.scroll, {
          probeType: 1,
          click: true
        });
        this.scroll.on('scroll', (pos) => {
          if (pos.y > 30 && !this.scrolling) {
            this.loadingText = '刷新中';
            this.scrolling = true;
            this.$refs.loading.style.top = '0';
            this.$refs.loading.style.bottom = '';
            this.msgsPage = 1;
            this._getMessages(this.msgsPage);
          }
          if (pos.y < -30 && !this.scrolling) {
            this.loadingText = '请求中';
            this.scrolling = true;
            this.$refs.loading.style.bottom = '60px';
            this.$refs.loading.style.top = '';
            this.msgsPage += 1;
            this._getMessages(this.msgsPage, true);
            this.$nextTick(this.scroll.refresh());
          }
        });
        this.scroll.on('scrollEnd', () => {
          this.scrolling = false;
          this.$refs.loading.style.display = 'none';
        });
        calHei(this.$refs.container, this.$refs.scroll, this.$refs.footertab);
        this.$refs.scroll_list.style.minHeight = parseInt(this.$refs.scroll.style.height) + 1 + 'px';
      },
      ...mapMutations({
        'setMsgTotal': 'SET_MSGTOTAL'
      })
    },
    computed: {
      ...mapGetters([
        'msgTotal'
      ]),
    },
    mounted() {
      this._getMessages();
      this._initPage();
    },
    components: {
      FooterTab,
      InlineLoading,
      Toast,
      NoResult,
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .cont {
    width: 100%;
    height: 100%;
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

  .scroll {
    width: 100%; // height: calc(~"100% - 55px");
    height: auto;
    overflow: hidden;
    background-color: #F5F5F5;
  }

  #msg_list {
    width: 100%;
    height: auto;
    background-color: #FFF;
    li {
      width: 95%;
      height: auto;
      margin: 0 auto;
      padding: 10px 0 5px;
      .box {
        color: @default_color;
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0px 1px 2px 2px #EEE;
        .avatar {
          width: 45px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          margin-right: 15px;
          img {
            width: 100%;
            height: auto;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        .msg_text {
          //width: calc( 100% - 50px);
          h5 {
            margin-bottom: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            strong {
              font-size: 16px; font-weight: normal;
              margin-bottom: 2px;
              vertical-align: top;
              color: #000;
              em {
                margin-left: 5px;
                font-size: 10px;
                font-style: normal;
                padding: 0 3px;

                vertical-align: text-top;
                display: inline-block;
                border-radius: 5px;
                border: 1px solid @default_color;
                font-weight: 100;
                &.unread {
                  color: #FF1212;
                  border-color: #FF1212;
                }
                &.read {
                  color: #3C4C5C;
                  border-color: #3C4C5C;
                }
              }
            }
            span {
              color: #999;
              font-weight: 300;
              vertical-align: middle;
            }
          }
          p {
            font-size: 14px;
            line-height: 1.4em;
          }
        }
      }
    }
  }
  img[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default_head_img.png");
    background-size: 100%;
  }

</style>

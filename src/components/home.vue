<template>
  <div class="container">
    <drawer :show.sync="slide_show" :drawer-style="{'background-color':'#EEE', width: '70%'}">
      <div slot="drawer" class="drawer">
        <div class="drawer_header">
          <div class="drawer_avatar">
            <img class="user_avatar" default-src="static/images/icons/default_head_img.png" v-lazy="avatar">
          </div>
          <p>{{userinfo.u_truename}}</p>
          <p>{{userinfo.u_dept}}</p>
          <p>{{userinfo.u_center}}</p>
        </div>
        <group :gutter="10" class="user_control">
          <cell link="/login" :border-intent="false">
            <p slot="icon">
              <i class="fa fa-unlock-alt"></i>
              <span>修改密码</span>
            </p>
          </cell>
          <cell link="/login" :border-intent="false">
            <p slot="icon">
              <i class="fa fa-user-o"></i>
              <span>个人信息</span>
            </p>
          </cell>
          <cell @click.native="qrcode" is-link :border-intent="false">
            <p slot="icon">
              <i class="fa fa-qrcode"></i>
              <span>扫一扫</span>
            </p>
          </cell>
        </group>
        <group :gutter="10">
          <cell value-align="center" align-items="center" title="退出登录" id="logout_btn" @click.native="logout"></cell>
        </group>
        <confirm title="提示" content="您是否要退出当前账户" v-model="logout_show" @on-confirm="doLogout">
        </confirm>
      </div>
      <div class="main">
        <div class="topbar">
          <div @click="slide_toggle">
            <span id="avatar">
              <img class="user_avatar" v-lazy="avatar">
            </span>
            <span class="name">
              {{name}}
            </span>
          </div>
          <div>
            <span @click="qrcode">
              <i class="fa fa-qrcode"></i>
            </span>
            <router-link to="/punch">
              <i class="fa fa-calendar-check-o"></i>
            </router-link>
          </div>
        </div>
        <div class="cover" @click="changeCover">
          <img src="static/images/head_img.png">
          <!--添加更换封面操作-->
        </div>
        <ul class="menu_links">
          <li v-for="item in navbars" :key="item.id">
            <router-link :to="{path:'/navbars',query:{id:item.id}}">
              <img v-lazy="item.show_appiconurl" default-src="static/images/icons/default.png">
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
        <div class="news">
          <div class="news_title vux-1px-tb">
            <span>商翔公告</span>
            <router-link to="/notices">
              <span>查看更多</span>
              <i class="fa fa-angle-right"></i>
            </router-link>
          </div>
          <div>
            <div v-for="item in notices" :key="item.noticeid" class="new_list vux-1px-b" :class="item.readCls" @click="showDetail(item)">
              <h5>{{item.noticetitle}}</h5>
              <p><span>{{item.senddate}}</span><span>{{item.sendperson}}</span></p>
            </div>
          </div>
        </div>
        <tab :activeIndex="1" :btn_state="false"></tab>
      </div>
    </drawer>
    <router-view class="children_view"></router-view>
  </div>
</template>
<script>
  import {
    Drawer,
    XImg,
    Group,
    Cell,
    Confirm
  } from 'vux'
  import {IMG_ADS} from "@/api/config";
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import Tab from '@/base/tab'
  import {
    getWeather,
    getNews,
    getNavbars,
  } from '@/api/get'
  import {
    updateNoticeStatus
  } from '@/api/put'
  import GStorage from 'good-storage'
  import {wxSsdkOnload} from 'static/js/wechatSsdk'

  export default {
    data() {
      return {
        slide_show: false,
        notices: [],
        logout_show: false
      }
    },
    methods: {
      qrcode() {
        wxSsdkOnload();
      },
      changeCover() {
        //修改封面图片，暂未开通此功能
      },
      showDetail(item) {
        let id = item.noticeid;
        updateNoticeStatus(id).then(() => {
          item.readCls = 'read';
        });
        this.$router.push({
          path: `/notices/notice_detail`,
          query: {
            id,
          }
        })
      },
      slide_toggle() {
        this.slide_show = !this.slide_show;
      },
      logout() {
        this.logout_show = true;
      },
      doLogout() {
        this.setUserInfo({});
        GStorage.clear();
        window.location.reload(); //清除登录信息后，强制刷新，使之前keep-alive保存的状态全部初始化
      },
      _getNavbars() {
        let openItems = ['行政事务','人力管理','人事管理','客服工作','金融管理'];
        if (!this.navbars.length) {
          getNavbars().then(res => {
            let navbarArr = [];
            res.data.forEach((item) => {
              if(openItems.indexOf(item.name) > -1){
                navbarArr.push(item);
              }
            });
            navbarArr.forEach((item) => {
              item.show_appiconurl = IMG_ADS + item.appiconurl;
            });
            this.setNavbars(navbarArr);
          });
        }
      },
      _initpage() {
        this._getNavbars();
        getNews().then((res) => {
          this.notices = res.data;
          this.notices.forEach(item => {
            if (item.readperson.includes(`|${this.userinfo.u_id}|`)) {
              item.readCls = 'read'
            } else {
              item.readCls = 'unread'
            }
          })
        });

      },
      ...mapMutations({
        setUserInfo: 'SET_USERINFO',
        setNavbars: 'SET_NAVBARS',
      })
    },
    components: {
      Drawer,
      XImg,
      Tab,
      Group,
      Cell,
      Confirm
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'navbars',
      ]),
      avatar() {
        return `${this.userinfo.u_truepic}.thumb.jpg`; //+'.thumb.jpg'
      },
      name() {
        return `${this.userinfo.u_truename}`
      }
    },
    created() {
      this._initpage();
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .container {
    width: 100%;
    height: 100%;
  }

  .main {
    height: calc(~"100% - 55px");
    overflow: scroll;
  }

  .topbar {
    width: 100%;
    height: 44px;
    overflow-y: hidden;
    padding: 5px 15px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        display: inline-block;
        &#avatar {
          height: 28px;
          max-width: 28px;
          width: 28px;
          overflow: hidden;
          border-radius: 50%;
          position: relative;;
          margin-right: 10px;
          img {
            height: auto;
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &.name {
          font-size: 16px;
        }
      }
      &:last-child {
        display: block;
        line-height: 34px;
        text-align: right;
        a,span {
          display: inline-block;
          margin-left: 15px;
          vertical-align: middle;
          height: 30px;
          line-height: 30px;
          color: #3C4C5C;
          i {
            font-size: 20px;
            vertical-align: 2px;
            &.fa-qrcode {
              font-size: 23px;
              vertical-align: 0;
            }
          }
        }
      }
    }
  }

  .cover {
    width: 96%;
    height: auto;
    margin: 0 auto;
    img {
      width: 100%;
      height: auto;
    }
  }

  .menu_links {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    height: 90px;
    width: 100%;
    padding-top: 15px;
    box-sizing: border-box;
    li {
      flex: 1;
      min-width: 25%;
      max-width: 25%;
      a {
        display: block;
        text-align: center;
        width: 100%;
        height: 100%;
        color: #000;
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
        }
        p {
          line-height: 24px;
          font-size: 13px;
        }
      }

    }
  }

  .news {
    width: 100%;
    height: auto;
    margin-top: 10px;
    padding-bottom: 20px;
    .news_title {
      padding: 10px 15px;
      line-height: 30px;
      span{
        font-size: 16px; font-weight: bold;
        color: #333;
      }
      a {
        color: #999;
        float: right;
        line-height: 25px;
        span {
          font-weight: 300;
          font-size: 14px;
          vertical-align: baseline;
          color: #696969;
        }
      }
    }
    .new_list {
      margin: 0 auto;
      display: block;
      width: 100%;
      height: auto;
      padding: 8px 15px;
      box-sizing: border-box;
      &.unread{
        background-color: #fff5f7;
      }
      &.read{
        background-color: #FFF;
      }
      h5 {
        display: block; // max-width: 85%;
        line-height: 26px;
        font-size: 16px;
        color: #1b1b1b;
        font-weight: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        line-height: 20px;
        color: #959595;
        font-size: 14px;
        span{
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
  }

  #tabbar {
    position: fixed;
    bottom: 0;
  }

  .drawer {
    .drawer_header {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      padding: 15px 0;
      color: #F5F5F5;
      background-color: @default_color;
      background-size: 100%;
      .drawer_avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: auto;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .user_control {
      .weui-cell {
        height: 40px;
        p {
          color: #666;
          font-size: 14px;
          i {
            display: inline-block;
            width: 1.5em;
          }
        }
      }
    }
    #logout_btn {
      text-align: center;
      color: #ff1122;
      font-size: 16px;
    }
  }
  img[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default.png");
    background-size: 100%;
  }
  img.user_avatar[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default_head_img.png");
    background-size: 100%;
  }
</style>

<template>
  <div class="tab_container">
    <div id="footer">
      <ul id="footer_tab">
        <li :class="{active:activeIndex===1}">
          <router-link to="/">
            <i class="icon"></i>
            <p>首页</p>
          </router-link>
        </li>
        <li :class="{active:activeIndex===2}">
          <router-link to="/work">
            <badge :text="workTotal" class="badge" v-if="workTotal && activeIndex!==2"></badge>
            <i class="icon"></i>
            <p>工作</p>
          </router-link>
        </li>
        <li id="more_tab_btn" ref="more_tab_btn" @click="showMoreTab">
          <span :class="{active:btn_state}"></span>
        </li>
        <li :class="{active:activeIndex===4}">
          <router-link to="/contact">
            <i class="icon"></i>
            <p>通讯录</p>
          </router-link>
        </li>
        <li :class="{active:activeIndex===5}">
          <router-link to="/msgs">
            <badge :text="msgTotal" class="badge" v-if="msgTotal && activeIndex!==5"></badge>
            <i class="icon"></i>
            <p>消息</p>
          </router-link>
        </li>
      </ul>
    </div>
    <ul id="more_tab" :class="{show:btn_state}">
      <li v-for="item in userShortcut" :key="item.name" @click="goNavbars(item)">
        <div>
          <img v-lazy="item.appiconurl">
          <p>{{item.name}}</p>
        </div>
      </li>
      <li>
        <span @click="setUserShortcut">
          <img src="static/images/icons/add_icon.png">  <!--变成函数式导航，跳转前触发hideMoretab-->
          <p>添加</p>
        </span>
      </li>
    </ul>
    <div id="showdom" @click.prevent.stop="hideMoretab" :class="{show:btn_state}"></div>
  </div>
</template>
<script>
  import {
    XImg,
    Popup,
    Badge
  } from 'vux'
  import {
    getAllShortcut,
    getBacklog,
    getMessages
  } from '@/api/get'
  import {
    IMG_ADS
  } from '@/api/config'
  import {mapGetters, mapMutations} from 'vuex'
  import _ from 'loadsh';

  export default {
    data() {
      return {
        btn_state: false,
      }
    },
    props: ["activeIndex"],
    components: {
      XImg,
      Popup,
      Badge
    },
    methods: {
      goNavbars(item){
        let g=_.cloneDeep(item);
        if(g.path==='salaryList'){
          g.path= 'salarys';
        }
        this.$router.push({
          path: '/navbars/detail',
          query: {
            item: g.path,
            name: g.name,
            icon: g.appiconurl,
          }
        });
        this.btn_state=false;
      },
      setUserShortcut() {
        this.$router.push({
          path: 'change_user_shortcut'
        });
        this.hideMoretab();
      },
      showMoreTab() {
        this.btn_state = !this.btn_state;
      },
      hideMoretab() {
        this.btn_state = false;
      },
      _getUserShortcut() {
        if (!this.shortcut.length) {
          getAllShortcut().then((res) => {
            res.data.forEach((item) => {
              return item.appiconurl = IMG_ADS + item.appiconurl;
            });
            this.setAllShortcut(res.data);
          })
        }
      },
      _getBadgeTotal() {
        getBacklog().then(res => {
          let total = 0;
          res.data.forEach(item => {
            total += parseInt(item.count);
          })
          this.setWorkTotal(total);
        });
        getMessages().then(res => {
          let total = 0;
          res.data.forEach(item => {
            if(item.isread === 0) {
              total++
            }
          });
          this.setMsgTotal(total);
        })
      },
      _initPage() {
        this._getUserShortcut();
        this._getBadgeTotal();
      },
      ...mapMutations({
        'setAllShortcut': 'SET_SHORTCUT',
        'setWorkTotal': 'SET_WORKTOTAL',
        'setMsgTotal': 'SET_MSGTOTAL'
      })
    },
    computed: {
      ...mapGetters([
        'shortcut',
        'workTotal',
        'msgTotal'
      ]),
      userShortcut: function () {
        return this.shortcut.filter(item=>{
          return item.switch;
        });
      }
    },
    mounted() {
      this._initPage();
    },
  }

</script>
<style lang="less" scoped>
  .tab_container {
    width: 100%;
    height: 55px;
    position: fixed;
    bottom: 0;
    z-index: 5;
  }

  #footer {
    width: 100%;
    height: 100%;
    background-color: #FFF;
  }

  #footer_tab {
    width: 100%;
    height: 100%;
    border-top: 1px solid #EEE;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    position: relative;
    li {
      list-style-type: none;
      text-align: center;
      flex: 1;
      line-height: 1;
      height: 100%;
      &#more_tab_btn {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          margin: 0 auto;
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #3c4c5c;
          position: relative;
          transition: all 0.3s;
          &::after,
          &::before {
            content: "";
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
            background-color: #FFF;
          }
          &::after {
            width: 3px;
            height: 25px;
            border-radius: 50% e('/') 1px;
          }
          &::before {
            width: 25px;
            height: 3px;
            border-radius: 1px e('/') 50%;
          }
          &.active {
            transform: rotate(45deg);
            background-color: #ff2233;
          }
        }
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        .badge{
          position: absolute;
          top: 3%;
          right: 5%;
        }
      }
      i {
        display: inline-block;
        width: 30px;
        height: 26px;
        background: url('../../static/images/icons/tab_sprite.png') no-repeat;
        background-size: 35px;
        background-position-x: -2px;
        margin-top: 8px;
      }
      p {
        line-height: 1.5em;
        font-size: 12px;
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        color: #898989;
      }
      &.active p {
        color: #fbc700;
      }
      &:first-child a i {
        background-position-y: -3px;
      }
      &:nth-child(2) a i {
        background-position-y: -206px;
      }
      &:nth-child(4) a i {
        background-position-y: -72px;
      }
      &:nth-child(5) a i {
        background-position-y: -140px;
      }
      &.active:first-child a i {
        background-position-y: -38px;
      }
      &.active:nth-child(2) a i {
        background-position-y: -240px;
      }
      &.active:nth-child(4) a i {
        background-position-y: -106px;
      }
      &.active:nth-child(5) a i {
        background-position-y: -174px;
      }
    }
  }

  #more_tab {
    width: 100%;
    height: auto;
    background-color: #FFF;
    border-radius: 10px 10px 0 0;
    position: fixed;
    bottom: 55px;
    left: 0;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    z-index: 101;
    padding: 10px 0 20px;
    box-sizing: border-box;
    transition: all 0.3s;
    transform: scale(0);
    transform-origin: bottom;
    font-size: 0;
    &.show {
      transform: scale(1);
    }
    li {
      display: inline-block;
      width: 25%;
      min-width: 25%;
      max-width: 25%;
      list-style-type: none;
      text-align: center;
      margin-top: 10px;
      div, span {
        color: #898989;
        padding: 0 15px;
        box-sizing: border-box;
        display: block;
        font-size: 12px;
        img {
          width: 60%;
          height: auto;
        }
        p {
          line-height: 25px;
        }
      }
    }
  }

  #showdom {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
    display: none;
    &.show {
      display: block;
    }
  }

</style>

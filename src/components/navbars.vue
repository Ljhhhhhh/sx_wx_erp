<template>
  <transition name="slide">
    <div ref="container" class="container">
      <x-header :left-options="{backText:''}" ref="header" class="header">{{title}}</x-header>
      <div class="menu_box" ref="menu_box">
        <div class="main_menu">
          <p ref="main_menu_option" :class="{active:activeIndex==item.id}" v-for="item in navbar" :key="item.id"
             @click="selectItem(item)">
            <span>{{item.name}}</span>
          </p>
        </div>
        <div class="sub_menu">
          <flexbox :gutter=0 justify="start" align="center" wrap="wrap">
            <flexbox-item class="sub_menu_opt" :span="1/2" v-for="item in activeSubNav" :key="item.id">
              <div @click="detail(item)" class="item_box">
                <img v-lazy="item.show_appiconurl">
                <p>{{item.name}}</p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <toast type="text" v-model="toastShow" :text="toastMsg" position="middle"></toast>
      <router-view></router-view>
    </div>
  </transition>
</template>


<script>
  import {IMG_ADS} from "@/api/config";
  import {
    XHeader,
    Flexbox,
    FlexboxItem,
    XImg,
    Toast
  } from 'vux'
  import {mapGetters} from 'vuex'
  import {calHei} from "static/js/dom";

  export default {
    name: 'navbars',
    data() {
      return {
        navbar: [],
        activeIndex: null,
        activeSubNav: [],
        title: '',
        toastMsg: ''
      }
    },
    methods: {
      detail(item) {
        console.log('item:',item);
        if(!item.n_path){
          this.toastMsg = '模块开发中';
          return;
        }
        if (item.n_path === 'salaryList') {
          item.n_path = 'salarys';
        }
        this.$router.push({
          path: '/navbars/detail',
          query: {
            item: item.n_path,
            name: item.name,
            icon: item.show_appiconurl,
          }
        })
      },
      selectItem(item) {
        this.activeIndex = item.id;
        this.activeSubNav = item.children;
        this.activeSubNav.forEach(item => {
          item.show_appiconurl = IMG_ADS + item.appiconurl;
          item.n_path = item.path.substr(item.path.lastIndexOf('/') + 1);
        });
      },
      selectNavbar() {
        let id = this.$route.query.id;
        if (!id || !this.navbars.length) {
          this.$router.push('/');
          return;
        }
        this.navbars.forEach(item => {
          if (id === item.id) {
            this.title = item.name;
            this.navbar = item.children;
          }
        });
        this.activeIndex = this.navbar[0].id;
        this.activeSubNav = this.navbar[0].children;
        this.activeSubNav.forEach(item => {
          item.show_appiconurl = IMG_ADS + item.appiconurl;
          item.n_path = item.path.substr(item.path.lastIndexOf('/') + 1);
        });
      }
    },
    // created() {
    //   this.selectNavbar();
    // },
    activated() { //选择不同的版块更新所需展示的类目
      this.selectNavbar();
    },
    mounted() {
      calHei(this.$refs.container, this.$refs.menu_box, this.$refs.header);
    },
    watch: {
      toastMsg: function(val) {
        if(val.length){
          setTimeout(()=>{
            this.toastMsg = '';
          },1000);
        }
      }
    },
    computed: {
      ...mapGetters([
        'navbars'
      ]),
      toastShow : {
        get: function () {
          return this.toastMsg.length>0?true:false;
        },
        set: function () {

        }
      }
    },
    components: {
      XHeader,
      Flexbox,
      FlexboxItem,
      XImg,
      Toast
    }
  }

</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .container {
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: #FFF;
  }

  .menu_box {
    display: flex;
    width: 100%;
    .main_menu {
      width: 100px;
      min-width: 100px;
      max-width: 100px;
      background-color: #EEE;
      overflow-y: scroll;
      //box-shadow: -5px 0px 5px 0px #e5e5e5 inset;
      z-index: 1;
      p {
        display: block;
        width: 100%;
        height: 72px;
        box-sizing: border-box;
        text-align: center;
        color: #707070;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: 80%;
          height: auto;
          line-height: 30px;
        }
        &.active {
          background-color: #FFF;
          font-size: 16px;
          color: #1b1b1b;
          box-shadow: 0 0 10px 0px #c5c5c5;
        }
      }
    }
    .sub_menu {
      text-align: center;
      flex-grow: 1;
      background-color: #FFF;
      height: 100%;
      overflow-y: scroll;
      .sub_menu_opt {
        box-shadow: 0 0 0 1px #F5F5F5;
        text-align: center;
        height: 100px;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        .item_box {
          width: 100%;
          img {
            width: 30%;
            height: auto;
            margin: 0 auto 4px;
          }
        }
      }
    }
  }
  img[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default.png");
    background-size: 100%;
  }
</style>

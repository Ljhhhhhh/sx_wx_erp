<template>
  <transition name="slide">
    <div class="container">
      <x-header :left-options="{backText: ''}" ref="header">公告详情</x-header>
      <div class="article">
        <h3>{{notice.noticetitle}}</h3>
        <h5>
          <span>发布者：{{notice.sendperson}}</span>
          <span>时间：{{notice.senddate}}</span>
        </h5>
        <div v-html="notice.noticecontent" class="textdetail"></div>
      </div>
      <div class="adjunct" v-if="adjuct_show">
        <h5>附件：</h5>
        <p v-for="(val,key,index) in this.notice.adjunctArr" :key="index" @click="download(val)">
          <img src="static/images/icons/picarr_icon.png" class="folder">
          <span>{{key}}</span>
          <x-button mini  class="xbtn">下载</x-button>
        </p>
      </div>
    </div>
  </transition>
</template>
<script>
  import {
    IMG_ADS
  } from '@/api/config';
  import {
    XHeader,
    XButton,
  } from 'vux'
  import {
    getNoticeDetail
  } from '@/api/get'



  export default {
    data() {
      return {
        notice: {},
        adjuct_show: false
      }
    },
    methods: {
      download(val) {
        window.open(val);
      },
      /**
       * 获取文章详情
       */
      _getNoticeDetail() {
        getNoticeDetail(this.$route.query.id).then(res => {
            this.notice = res.data;
            let filenameArr = this.notice.fileNames.split('|');
            let adjuct_len = this.notice.picarr.length;
            if(adjuct_len>0) {
              this.adjuct_show = true;
            }
            let adjunctArr = {};
            for (let i = 0; i < adjuct_len; i++) {
              adjunctArr[filenameArr[i]] = this.notice.picarr[i];
            }
            this.notice.adjunctArr = adjunctArr;
        })
      },
      _initpage() {
        this._getNoticeDetail();
      }
    },
    components: {
      XHeader,
      XButton
    },
    mounted() {
      this._initpage();
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s;
  }

  .vux-header {
    position: fixed;
    width: 100%;
  }

  .container {
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: #FFF;
    position: fixed;
    overflow-y: scroll;
    .article {
      margin-top: 50px;
      padding: 10px 10px 25px;
      color: @default_color;
      line-height: 1.5;
      font-size: 12px;
      h3 {
        line-height: 30px;
        font-size: 16px;
        color: #333;
      }

      h5 {
        line-height: 30px;
        margin-bottom: 20px;
        span {
          font-size: 14px;
          font-weight: normal;
          display: inline-block;
          margin: 0 10px;
          color: #666;
        }

      }
      p {
        line-height: 1.5;
      }
       .textdetail{
          font-size: 14px;

        }
      p.MsoNormal{
        line-height: 25px;
      }
    }
    .adjunct {
      color: #000;
      font-size: 14px;
      h5 {
        background-color: #F5F5F5;
        font-size: 14px;
        line-height: 30px;
        text-indent: 1em;
      }
      p {
        line-height: 1.5;
        display: flex;
        align-items: center;
        padding: 8px 15px;
        background: #f3f3f3;
        margin: 10px auto;
        img.folder {
          width: 30px;
          height: auto;
        }
        span {
          flex: 6;
          text-align: center;
          color: @default_color;
        }
        .xbtn {
          flex: 1;
        }
      }
    }
  }

</style>

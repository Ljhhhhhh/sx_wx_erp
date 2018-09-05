<template>
<transition name="slide">
  <div class="container">
    <x-header title="会议签到" :left-options="{backText: ''}"></x-header>
    <div class="content">
      <p>
        <span>主持人：</span>
        <em>{{compere}}</em>
      </p>
      <p>
        <span>会议日期：</span>
        <em>{{date}}</em>
      </p>
      <p>
        <span>会议地点：</span>
        <em>{{addrs}}</em>
      </p>
      <p>
        <span>会议分值：</span>
        <em>{{score}}</em>
      </p>
      <p>
        <span>会议标题：</span>
        <em>{{title}}</em>
      </p>
      <p>
        <span>会议保障：</span>
      </p>
      <group>
        <x-textarea v-model="detail" :row="5" :readonly="true" :autosize="true"></x-textarea>
      </group>
      <ul class="sign">
        <li>未到人数：
          <span>{{noSignSum}}</span>
        </li>
        <em></em>
        <li>已到人数：
          <span>{{signSum}}</span>
        </li>
      </ul>
      <x-button :disabled="signState" type="primary" @click.native="signIn">{{signText}}</x-button>
    </div>
    <toast v-model="toast.show" :type="toast.type">{{toast.text}}</toast>
  </div>
</transition>
</template>

<script>
  import {
    XHeader,
    XTextarea,
    Group,
    XButton,
    Toast
  } from 'vux';
  import {
    getMeetingDetail
  } from '@/api/get';
  import {
    checkMeetings
  } from '@/api/post';

  import {
    getLocal
  } from 'static/js/wechatSsdk';

  import {
    mapChange
  } from 'static/js/util';

  import {
    mapGetters
  } from 'vuex';

  import Vue from 'vue'
  import VueJsonp from 'vue-jsonp'
  Vue.use(VueJsonp)

  export default {
    //{"code":"mt","data":{"id":"166"}}
    name: "metting",
    data() {
      return {
        compere: '',
        date: '',
        addrs: '',
        score: 0,
        title: '',
        detail: '',
        noSignSum: 0,
        signSum: 0,
        signState: false,
        local: '',
        address: '',
        signText: '签到',
        toast: {
          show: false,
          text: '',
          type: 'success'
        }
      }
    },
    methods: {
      signIn() {
        let sign_longitude = this.local.split(',')[1]; //经度
        let sign_latitude = this.local.split(',')[0]; //纬度
        let data = {
          sign_uid: this.userinfo.u_id,
          sign_meetingid: this.$route.query.id,
          sign_addrs: this.address,
          sign_longitude,
          sign_latitude,
          type: 1
        };
        checkMeetings(data).then(res => {
          console.log('res:', res)
          if (res.msg === '成功') {
            this.toast.show = true;
            this.toast.text = '签到成功';
            this.toast.type = 'success';
            this.signSum++;
            this.noSignSum--;
            this.signState = true;
            this.signText = '已签到';
          } else {
            this.toast.show = true;
            this.toast.text = '签到失败，请重试';
            this.toast.type = 'cancel';
          }
        })
      },
      getMeetingDetail() {
        const id = this.$route.query.id;
        const uid = this.userinfo.u_id;
        getMeetingDetail(uid, id).then(res => {
          this.compere = res['mt_compere'];
          this.date = res['mt_date'];
          this.addrs = res['mt_addrs'];
          this.score = res['mt_score'];
          this.title = res['mt_titl'];
          this.detail = res['mt_detail'];
          this.noSignSum = res['noSignsum'];
          this.signSum = res['signsum'];
          this.signState = res['state'] === 0 ? false : true;
          if(res['state'] === 0){
            this.signState = false;
            this.signText = '签到';
          }else{
            this.signState = true;
            this.signText = '已签到';
          }
        })
      },
      getLocation() {
        let _this = this;
        getLocal(function (res) {
          res.then(e => {
            _this.local = mapChange(e.latitude, e.longitude);
            let data = {
              callback: 'renderReverse',
              location: _this.local,
              output: 'json',
              ak: '80GPuTjeKb61h4xkzcdg4eviZItmM5YG',
              pois: 1,
              radius: 200
            }
            _this.$jsonp('http://api.map.baidu.com/geocoder/v2/', data).then(address => {
              if (address.status === 0) {
                let pois = address.result.pois;
                _this.address = (pois && pois.length) ? pois[0].addr : '无法获取到地址';
              } else {
                alert('error')
              }
            })
          })
        })
      }
    },
    computed: {
      ...mapGetters([
        'userinfo'
      ])
    },
    created() {
      this.getMeetingDetail();
      this.getLocation();
    },
    components: {
      XHeader,
      XTextarea,
      Group,
      XButton,
      Toast
    }
  }

</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  .content {
    padding: 15px;
    color: #3C4C5C;
    p {
      span {
        display: inline-block;
        width: 5em;
        text-align-last: justify;
      }
      em {
        display: inline-block;
        font-style: normal;
        font-size: 0.8em;
        text-indent: 0.5em;
      }
    }
    ul.sign {
      display: flex;
      list-style-type: none;
      justify-content: space-between;
      margin: 10px 0 25px;
      position: relative;
      li {
        span {
          color: #F33;
        }
        &:last-child span {
          color: rgb(39, 153, 4);
        }
      }
      em {
        max-width: 1px;
        height: 100%;
        border-right: 1px solid #D5D5D5;
        position: absolute;
        left: 50%;
      }
    }
  }

</style>

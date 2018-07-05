<template>
  <transition name="slide">
    <div class="container">
      <x-header title="签到" :left-options="{backText: ''}"></x-header>
      <group>
        <cell :title="date">
          <i slot="icon" class="fa fa-clock-o"></i>
        </cell>
        <popup-radio :title="addressTitle" class="address" :options="addressList" v-model="checkedAddress">
        </popup-radio>
        <cell title="请选择打卡类型">
          <i slot="icon" class="fa fa-calendar-check-o"></i>
        </cell>
        <checker v-model="checkedSign" default-item-class="checker-item" selected-item-class="checker-item-selected">
          <checker-item v-for="(item, index) in signList" :key="index" :value="index">{{item}}</checker-item>
        </checker>
        <x-textarea placeholder="签到说明（必填）" v-model="explain"></x-textarea>
      </group>
      <x-button type="primary" class="punch_btn" @click.native="punch">签到</x-button>
      <toast v-model="toast.show" :type="toast.type">{{toast.text}}</toast>
    </div>
  </transition>
</template>
<script>
  import {
    Group,
    Cell,
    PopupRadio,
    XTextarea,
    Checker,
    CheckerItem,
    XButton,
    Toast,
    XHeader
  } from 'vux';
  import {
    getLocal
  } from 'static/js/wechatSsdk';
  import {
    mapChange
  } from 'static/js/util';
  import moment from 'moment';
  import {checkPunch} from '@/api/post';
  import Vue from 'vue';
  import VueJsonp from 'vue-jsonp';
  import { mapGetters } from 'vuex';
  Vue.use(VueJsonp);

  export default {
    data() {
      return {
        checkedAddress: '请选择签到地址',
        addressList: ['无法获取地址'],
        explain: '',
        signList: ['上班打卡', '下班打卡', '外勤'],
        checkedSign: '',
        local: '',
        addressTitle: '请选择签到地址',
        toast: {
          show: false,
          type: '',
          text: ''
        }
      }
    },
    methods: {
      punch(){
        if(!this.local) {
          this.toast = {
            show: true,
            type: 'cancel',
            text: '无法获取位置信息，请允许请求位置信息'
          };
          return false;
        }
        if(this.checkedAddress === '请选择签到地址') {
          this.toast = {
            show: true,
            type: 'cancel',
            text: '请选择签到地址'
          };
          return false;
        }
        if(this.checkedSign === '') {
          this.toast = {
            show: true,
            type: 'cancel',
            text: '请选择打卡类型'
          };
          return false;
        }
        if(!this.explain) {
          this.toast = {
            show: true,
            type: 'cancel',
            text: '请填写打卡说明'
          };
          return false;
        }
        const longitude = this.local.split(',')[1]; //经度
        const latitude = this.local.split(',')[0]; //纬度
        let data = {
          longitude,
          latitude,
          describe: this.checkedAddress,
          explain: this.explain,
          attendancetype: this.checkedSign
        };
        const token = this.userinfo.token;
        checkPunch(data, token).then(res => {
          if(res.data === 'success') {
            this.toast = {
              show: true,
              type: 'success',
              text: '打卡成功'
            }
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
                if(pois.length) {
                  _this.addressList = [];
                  pois.forEach(item => {
                    _this.addressList.push(item.name || item.addr);
                  })
                }else{
                  _this.addressList.push('');
                }
              } else {
                alert('error')
              }
            })
          })
        })
      }
    },
    computed: {
      date() {
        moment.locale('en', {
          weekdays: [
            "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
          ]
        });
        return moment().format('YYYY-MM-DD,dddd');
      },
      ...mapGetters([
        'userinfo'
      ])
    },
    created() {
      this.getLocation();
    },
    components: {
      Group,
      Cell,
      PopupRadio,
      XTextarea,
      Checker,
      CheckerItem,
      XButton,
      Toast,
      XHeader
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  @import '../../static/styles/vux_reset.less';

  .punch_btn {
    margin-top: 20%;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    font-size: 20px;
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 1px 8px 1px #db8504;
    vertical-align: middle;
    &::before{
      content: '';
      width: 1.3em;
      height: 1.3em;
      background: url('../../static/images/icons/punch_btn.png');
      background-size: 100%;
      display: inline-block;
      vertical-align: -5px;
    }
    &::after{
      display: none;
    }
  }

  .checker-item {
    width: 100px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .checker-item-selected {
    background: #ffffff url('../../static/images/icons/check_icon.png') no-repeat right bottom;
    background-size: 16px;
    color: #fbc700;
    border: 1px solid;
  }

  .vux-checker-box {
    display: flex;
    justify-content: space-around;
    margin: 15px 0 20px 0;
    padding: 0 20px;
    div {
      max-width: 30%;
       font-size: 14px;
      height: auto;
      flex: 1;
      margin: 0;
    }
  }

  .weui-cell {
    color: #2C2C2C;
    font-size: 15px;
    margin-top: 0;
    i {
      display: inline-block;
      margin-right: 0.2em;
    }

  }
</style>

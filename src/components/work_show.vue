<template>
  <div class="container" ref="container">
    <x-header :left-options="{backText: ''}" ref="header" class="xheader">
      {{applyData.title}}详情<span slot="right" v-if="takeBackShow" @click="getBack">取回</span>
    </x-header>
    <div class="scroll" ref="scroll" :style="scrollPadding">
      <div ref="content" class="content">
        <apply-header :head="head"></apply-header>
        <apply-info :info="info"></apply-info>
        <apply-reject :reject="reject" v-if="rejectShow"></apply-reject>
        <apply-flow :flow="flow"></apply-flow>
      </div>
    </div>
    <toast v-model="toastShow" :type="toastType" :time='1000'>{{message}}</toast>
  </div>
</template>

<script>
  import applyHeader from './apply_show/header'
  import applyFlow from './apply_show/flow'
  import applyInfo from './apply_show/info'
  import applyReject from './apply_show/reject'
  import {getApplyDetail} from '@/api/get'
  import {XHeader,Toast} from 'vux'
  import {navbar_json,setNotSureData} from '@/api/navbars'
  // import BScroll from 'better-scroll'
  // import {calHei} from "static/js/dom";

  export default {
    name: "work_show",
    data() {
      return {
        resData: {},
        applyData: {
          complete: {
            cls: '',
            text: '',
            iconCls: ''
          },
          pics: [],
          doneFlow: [],
          waitFlow: []
        },
        notSureData: {},
        head:{},
        info:{},
        flow:{},
        reject:{},
        message: '',
        toastType: '',
        toastShow: false,
      }
    },
    methods: {
      _getDetail() {
        const query = this.$route.query;
        const op = query.op;
        const id = query.id;
        if(!navbar_json[op] || !navbar_json[op].c_name){
          this.message = '此详情完善中，即将返回……';
          this.toastType = 'cancel';
          this.toastShow = true;
          setTimeout(()=>{
            this.$router.go(-2);
            return;
          },1000);
        }else{
          getApplyDetail(op, id).then(res => {
            this.applyData.title = navbar_json[op].c_name;
            let resData=res.data;
            console.log(res)
            //头部信息
            this.head={
              name:resData[`${op}_applyuname`],
              dept:resData[`${op}_dept`],
              title:navbar_json[op].c_name,
              complete:resData[`${op}_state`]
            }
            //具体信息
            this.info={
              data:resData,
              op
            }
            //流程
            this.flow={
              doneFlow:res.history,
              workFlow:res.workflow,
              doneFlowLen:resData[`${op}_state`]
            }
            //驳回
            this.reject={
              rejectStaff:res.arrUsers,
              informStaff:res.arrUsers_jpush,
              applyName:resData[`${op}_applyuname`],
              applyItem:navbar_json[op].c_name,
            }
          })
        };
      },
      _initPage() {
        this._getDetail();
      },
    },
    computed:{
      rejectShow(){
        return this.$route.query.type==='wait';
      },
      scrollPadding() {
        if(this.$route.query.type==='wait') {
          return {
            paddingBottom: '52px'
          };
        }else{
          return {};
        }
      },
      takeBackShow(){
        return this.resData.takeback;
      }
    },
    created() {
      this._initPage();
    },
    mounted() {
      // calHei(this.$refs.container, this.$refs.scroll);
      // this.scroll = new BScroll(this.$refs.scroll,{
      //   click:true
      // });
    },
    components: {
      XHeader,
      applyHeader,
      applyFlow,
      applyInfo,
      applyReject,
      Toast,
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .container {
    width: 100%;
    height: auto;
    position: fixed;
    top: 46px;
    bottom: 0;
    overflow-y: auto;
    .scroll{
      /*overflow: hidden;*/
      padding-bottom: 10px;
    }
    .content {
      width: 100%;
      height: auto;
    }
    .xheader {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
  }
</style>

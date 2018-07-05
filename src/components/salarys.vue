<template>
  <div class="container" ref="container">
    <x-header :left-options="{backText: ''}" ref="header" class="xheader">
      工资条详情
    </x-header>
    <div class="scroll" ref="scroll">
      <div ref="content" class="content">
        <div class="header vux-1px-b">
          <div>
            <img v-lazy="staff.avatar">
            <strong>{{staff.name}}</strong>
          </div>
          <span>[工资详情]</span>
        </div>
        <div class="firstPart">
          <p v-for="(val,key,index) in staffMore" :key="index">
            <span class="key">{{key}}:</span>
            <span class="val">{{val}}</span>
          </p>
        </div>
        <div class="part">
          <h1>基本工资</h1>
          <div class="info">
            <p v-for="(val,key,index) in basepay" :key="index">
              <span class="key">{{key}}:</span>
              <span class="val">{{val}}</span>
            </p>
          </div>
        </div>
        <div class="part">
          <h1>补助津贴</h1>
          <div class="info">
            <p v-for="(val,key,index) in subsidy" :key="index" class="light">
              <span class="key">{{key}}:</span>
              <span class="val">{{val}}</span>
            </p>
          </div>
        </div>
        <div class="part">
          <h1>月扣费</h1>
          <div class="info">
            <p v-for="(val,key,index) in fee" :key="index" class="light">
              <span class="key">{{key}}:</span>
              <span class="val">{{val}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import BScroll from 'better-scroll'
  import {calHei} from "static/js/dom";
  import {getSalarys} from '@/api/get';
  import {mapGetters} from 'vuex';

  export default {
    name: "salarys",
    data() {
      return {
        staff: {},
        staffMore: {},
        basepay: {},
        subsidy: {},
        fee: {}
      }
    },
    methods: {
      _getSalarys(id) {
        getSalarys(id).then(res => {
          const data = res.data;
          this.staff = {
            name: data.name,
            avatar: this.userinfo['u_truepic'],
          };
          this.staffMore = {
            '工号': data["u_name"],
            "职位": data['zw_name'],
            '岗位': data['position'],
            '入职时间': data['u_etime'],
            '转正时间': data['u_ptime']
          };
          this.basepay={
            '基本工资': data['basicsalary'],
            '级别工资': data['levelsalary'],
            '岗位津贴': data['allowance'],
            '绩效工资': data['achievementsalary'],
            '工龄工资': data['workyearsalary'],
            '行政绩效': data['crmpoint'],
            '业务绩效': data['ywpoint'],
            '绩效得分': data['achievementpoint'],
            '实得绩效': data['achievement'],
          };
          this.subsidy={
            '全勤奖':data['fullwork'],
            '伙食补助': data['food'],
            '通讯补贴': data['tel'],
            '交通补贴': data['traffic'],
            '住房补助': data['house'],
            '提出奖励': data['tcallowance'],
            '公积金': data['publicaccumulation'],
            '社保抵扣': data['socialdebit'],
            '提成奖励': data['tcallowance'],
            '其他': data['otherallowance'],
            '补助合计': data['allowance_total'],
            '应发工资': data['shouldsalary'],
          };
          this.fee= {
            '社保抵扣': data['socialdebit'],
            '公积金抵扣': data['publicdebit'],
            '出勤': data['outdebit'],
            '水电': data['waterele'],
            '通讯': data['teldebit'],
            '交通': data['trafficdebit'],
            '伙食': data['fooddebit'],
            '住房': data['housedebit'],
            '社保抵扣': data['socialdebit'],
            '个税': data['gxdebit'],
            '其他': data['otherdebit'],
            '月扣款合计': data['debit_total'],
            '实发工资': data['factsalary']
          }
        });
      },
      _initPage() {
        let id = this.$route.query.id;
        this._getSalarys(id);
      }
    },
    computed: {
      ...mapGetters([
        'userinfo'
      ])
    },
    created() {
      this._initPage();
    },
    mounted() {
      calHei(this.$refs.container, this.$refs.scroll);
      this.scroll = new BScroll(this.$refs.scroll);
    },
    components: {
      XHeader,
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
    .scroll {
      overflow: hidden;
      padding-bottom: 15px;
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

  .header {
    margin-top: 10px;
    width: 100%;
    height: auto;
    padding: 0 15px;
    div {
      display: flex;
      align-items: center;
      img {
        width: auto;
        max-height: 35px;
        min-height: 35px;
        vertical-align: center;
        margin-right: 10px;
      }
      strong {
        flex: 1;
        font-weight: normal;
        font-size: 16px;
        vertical-align: center;
      }
    }
    span {
      line-height: 30px;
      font-size: 14px;
    }
  }
  .firstPart{
    padding: 10px 15px;
    border-bottom: 6px solid #E5E5E5;
    p{
      line-height: 25px;
      color: #666;
      font-size: 14px;
      .key{
        display: inline-block;
        margin-right: 5px;
      }
    }
  }
  .part{
    padding: 10px 0;
    border-bottom: 6px solid #E5E5E5;
    h1{
      font-size: 18px;
      font-weight: 500;
      border-bottom: 1px dashed #D5D5D5;
      padding: 0 15px 5px;
      margin-bottom: 10px;
    }
    div{
      padding: 0 15px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      p{
        flex: 1;
        max-width: 50%;
        min-width: 50%;
        line-height: 25px;
        color: #666;
        font-size: 14px;

        .key{
          display: inline-block;
          margin-right: 5px;
        }
        &.light:last-child{
          min-width: 100%;
          max-width: 100%;
          color: #fbc700;
        }
      }
    }

  }

  img[lazy=loading], img[lazy=error] {
    background: url("../../static/images/icons/default_head_img.png");
    background-size: 100%;
  }
</style>

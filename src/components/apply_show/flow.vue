<template>
  <div class="apply-flow_list">
    <div class="apply-flow_title">审批流程</div>
    <ul v-if="flowShow">
      <li v-for="item in flow.doneFlow" :key="item.as_id">
        <div class="state_icon">
          <i class="fa fa-check-circle"></i>
        </div>
        <div class="flow">
          <h4>{{item.as_role}}
            <em>{{item.content}}</em><small>{{item.as_op}}<span>({{item.as_state}})</span></small>
          </h4>
          <p>{{item.as_accepttime}}</p>
        </div>
      </li>
      <li v-for="item of waitFlow" :key="item.id" :class="item.cls">
        <div class="state_icon">
          <i class="fa" :class="item.icon_cls"></i>
        </div>
        <div class="flow">
          <h4>{{item.truename}}<em>{{item.content}}</em></h4>
          <p>{{item.stateText}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "applyFlow",
    props: {
      flow: {
        type: Object,
        required: true,
        default: {}
      }
    },
    data() {
      return {
      }
    },
    computed: {
      doneFlow() {

      },
      waitFlow() {
        if(this.flow.doneFlowLen - 1<0){
          return [];//全部审核通过的情况
        }
        let waitFlow=this.flow.workFlow.slice(this.flow.doneFlowLen - 1);
        waitFlow.forEach((item, index) => {
          if (index) {
            item.stateText = '等待中'
            item.cls='unactive'
            item.icon_cls='fa-circle-o'
          } else {
            item.stateText = '审核中'
            item.cls='active';
            item.icon_cls='fa-clock-o'
          }
        });
        return waitFlow;
      },
      flowShow() {
        return this.flow.doneFlow ? true : false
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../static/styles/reset.less';

  .apply-flow_list {
    border-top: 8px solid #F5F5F5;
    padding: 15px;
  }

  .apply-flow_title {
    font-size: 16px;
    line-height: 30px;
  }

  ul {
    width: 100%;
    height: auto;
    li {
      width: 100%;
      height: auto;
      display: flex;
      &:first-child div.state_icon:before, &:last-child div.state_icon:after {
        display: none;
      }
      &.active .flow p {
        color: @default_active;
      }
      div.state_icon {
        min-width: 30px;
        max-width: 30px;
        height: 60px;
        position: relative;
        z-index: -1;

        &:after, &:before {
          content: "";
          display: block;
          position: absolute;
          width: 1px;
          height: 24px;
          background-color: @default_color;
          top: 60%;
          left: 50%;
          transform: translate3d(-50%, 0, 0);
        }
        &:before {
          top: 0;
        }

        i {
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          color: @default_color;
          z-index: 99;
        }
      }
      div.flow {
        flex: 1;
        display: flex;
        align-items: start;
        justify-content: center;
        flex-direction: column;
        border-bottom: 1px dashed #999;
        h4 {
          font-size: 15px;
          line-height: 30px;
          overflow: hidden;
          font-weight: normal;
          text-overflow: ellipsis;
          white-space: nowrap;
          em{
            display: inline-block;
            text-indent: 0.5em;
            font-weight: normal;
            font-style: normal;
            font-size: 0.7em;
            color: #3C4C5C;
          }
          small {
            display: inline-block;
            text-indent: 0.5em;
            color: #08a7ff;
            span {
              color: #333;
            }
          }
        }
        p {
          font-size: 14px;
          color: #666;
          line-height: 20px;
        }
      }
    }
  }
</style>

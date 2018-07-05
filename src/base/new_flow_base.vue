<template>
  <transition name="slide">
    <div class="container" ref="container">
      <x-header :left-options="{backText: ''}" ref="header" class="xheader">
        {{title}}<span slot="right" @click="submit_btn">确定</span>
      </x-header>
      <div class="content">
        <group>
          <popup-radio title="工作流" :options="flowTypeArr" v-model="flowType">
            <p slot="popup-header" class="vux-1px-b popup-header">请选择工作流</p>
          </popup-radio>
        </group>
        <slot>
          this is form content.
        </slot>
        <flow v-if="workflow.length">
          <template v-for="(val,index) in workflow">
            <flow-state :title="val"></flow-state>
            <flow-line v-if="index<workflow.length-1"></flow-line>
          </template>
        </flow>
      </div>
    </div>
  </transition>
</template>

<script>
  import {XHeader, Group, Cell, PopupRadio, Flow, FlowState, FlowLine} from 'vux';
  import {getCreateApply} from '@/api/get';
  import opJson from '@/api/op';

  export default {
    name: "new_flow",
    data() {
      return {
        title: '',
        flowType: '请选择工作流',
        op: '',
        flow: [],
      }
    },
    methods: {
      submit_btn() {
        console.log('提交了！');
      },
      _initPage() {
        const path = this.$route.path.split('/');
        this.op = path[path.length-1];
        this.title =`新建${opJson[this.op]}`;
        getCreateApply(this.op).then(res => {
          this.flow = res.new_workflow;
          this.$emit('hasData',this.flow);
        });
      }
    },
    computed: {
      flowTypeArr() {
        let arr = [];
        this.flow.forEach(item => {
          arr.push(item['fname']);
        });
        return arr;
      },
      workflow() {
        let index = this.flowTypeArr.findIndex((value) => {
          return value === this.flowType;
        });
        if (index === -1) {
          return [];
        }
        let flowData = this.flow[index]['rulelist'];
        let workflow = [];
        flowData.forEach(item => {
          workflow.push(item['truename']);
        })
        return workflow;
      }
    },
    created() {
      this._initPage();
    },
    deactivated() {
      this.$destroy();
    },
    components: {
      XHeader,
      Group,
      Cell,
      PopupRadio,
      Flow,
      FlowState,
      FlowLine
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

  .popup-header {
    text-align: center;
    color: #fbc700;
    line-height: 30px;
    padding: 10px 0;
  }
</style>

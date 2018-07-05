<template>
  <transition name="slide">
  <div class="container" ref="container">
    <x-header :left-options="{backText: ''}" ref="header" class="xheader">
      新建加班单<span slot="right" @click="submit_btn">确定</span>
    </x-header>
    <div class="content">
      <group>
        <cell title="工作流"></cell>
      </group>
    </div>
  </div>
  </transition>
</template>

<script>
  import {XHeader,Group,Cell,PopupRadio } from 'vux';
  import getFields from '@/api/addNewFlowJson.js';
  export default {
    name: "new_flow",
    methods: {
      submit_btn() {
        console.log('提交了！');
      }
    },
    created() {
      getFields('qj');
    },
    components: {
      XHeader,
      Group,
      Cell,
      PopupRadio
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
</style>

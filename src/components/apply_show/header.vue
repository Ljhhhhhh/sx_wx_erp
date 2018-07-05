<template>
  <div class="userinfo vux-1px-b">
    <h5>{{head.name}}</h5>
    <p>{{head.dept}}</p>
    <p>
      <span>[{{head.title}}申请]</span>
      <strong :class="cls"><i class="fa" :class="iconCls"></i>{{text}}</strong>
    </p>
  </div>
</template>

<script>
  export default {
    name: "applyHeader",
    props:{
      head:{
        type: Object,
        required: true
      },
    },
    computed:{
      cls(){
        return this.head.complete=== "0" ?'complete':'uncomplete';
      },
      text(){
        return this.head.complete=== "0" ?'审核完成':'审核中';
      },
      iconCls(){
        return this.head.complete=== "0" ?'fa-check-circle-o':'fa-clock-o';
      }
    }
  }
</script>

<style lang="less" scoped>
  .userinfo {
    padding: 5px 15px;
    h5 {
      color: #1B1B1B;
      font-size: 16px;
      line-height: 25px;
      font-weight: normal;
    }
    p {
      color: #999;
      font-size: 14px;
      line-height: 20px;
      span {
        color: #1B1B1B;
        display: inline-block;
        margin-right: 10px;
      }
      strong {
        font-weight: normal;
        &.complete {
          color: #666;
        }
        &.uncomplete {
          color: #fbc700;
        }
        i {
          display: inline-block;
          margin-right: 5px;
        }
      }
    }
  }
</style>

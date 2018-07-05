<template>
  <new-flow @hasData="initpage">
    999
  </new-flow>
</template>
<script>
  import NewFlow from '@/base/new_flow_base';
  export default {
    name: 'jb',
    data() {
      return {
      }
    },
    methods: {
      initpage(flow) {
        console.log(flow);
      }
    },
    created() {
      this.initpage();
    },
    components: {
      NewFlow
    }
  }
</script>
<style lang="less" scoped>

</style>

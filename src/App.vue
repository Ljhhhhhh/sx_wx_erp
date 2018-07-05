<template>
  <div id="app">
    <keep-alive exclude="change_menu,item_detail,apply_show">
        <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import GStorage from 'good-storage'
  import {
    USERINFO
  } from '@/api/config'

  export default {
    name: 'app',
    data() {
      return {}
    },
    methods: {
      check_userinfo() {
        if (!GStorage.get(USERINFO)) {
          this.$router.push({
            path: '/login'
          });
        } else {
          if (!this.userinfo.token) {
            this.setUserInfo(GStorage.get(USERINFO));
          }
        }
      },
      ...mapMutations({
        setUserInfo: 'SET_USERINFO'
      })
    },
    watch: {
      $route() {
        this.check_userinfo();
      }
    },
    created() {
      this.check_userinfo()
    },
    computed: {
      ...mapGetters([
        'userinfo'
      ])
    }
  }

</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close.less';

  body,
  html,
  #app {
    width: 100%;
    height: 100%;
  }
</style>

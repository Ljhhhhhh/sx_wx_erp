<template>
  <div ref="container" class="container">
    <x-header :left-options="{backText: ''}" ref="header">添加快捷方式<span slot="right" @click="saveShortcut">保存</span>
    </x-header>
    <div ref="wrapper" class="wrapper">
      <group ref="content" :gutter='0'>
        <x-switch
          v-for="item in AllShortcut"
          :key="item.id"
          :title="item.name"
          v-model="item.switch"
          @on-change="setUserSelectShortcut(item)"
        />
      </group>
    </div>
    <toast v-model="toastShow" type="warn">没有更改项或者更改失败</toast>
  </div>
</template>

<script>
  import {XHeader, Group, XSwitch, Toast} from 'vux'
  import {getAllShortcut} from '@/api/get'
  import {SetUserShortcut} from '@/api/put'
  import BScroll from 'better-scroll'
  import {calHei} from 'static/js/dom'
  import {mapGetters, mapMutations} from 'vuex'
  import {IMG_ADS} from '@/api/config'

  export default {
    name: "change_menu",
    data() {
      return {
        AllShortcut: [],
        selectedShortcut: [],
        toastShow: false
      }
    },
    methods: {
      setUserSelectShortcut(item) {
        let id=item.id;
        let ArrIndex = this.selectedShortcut.findIndex(function (val) {
          return val === id;
        });
        if (ArrIndex > -1) {
          this.selectedShortcut.splice(ArrIndex, 1);
        } else {
          this.selectedShortcut.push(id);
        }
      },
      saveShortcut() {
        SetUserShortcut(this.userinfo.u_id, this.selectedShortcut.join(',')).then(res => {
          if ('success' === res.data) {
            this.setAllShortcut(this.AllShortcut);
            this.$router.back();
            this.$destroy();
          } else {
            this.toastShow = true;
          }
        });
      },
      _getAllShortcut() {
        getAllShortcut().then(res => {
          this.AllShortcut =[...res.data];
          this.AllShortcut.forEach(item => {
            item.appiconurl = IMG_ADS + item.appiconurl;
            if (item.switch) {
              this.selectedShortcut.push(item.id);
            }
          });
        });
      },
      _initPage() {
        this.$nextTick(() => {
          calHei(this.$refs.container, this.$refs.wrapper, this.$refs.header);
          this.scroll = new BScroll(this.$refs.wrapper, {})
        });
      },
      ...mapMutations({
        'setAllShortcut': 'SET_SHORTCUT'
      })
    },
    created() {
      this._getAllShortcut();
    },
    mounted() {
      this._initPage();
    },
    computed: {
      ...mapGetters([
        'userinfo',
        'shortcut'
      ])
    },
    components: {
      XHeader,
      Group,
      XSwitch,
      Toast
    }
  }
</script>

<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  .wrapper {
    overflow: hidden;
  }

  .vux-header-right span {
    font-size: 18px;
    color: @default_active;
  }
</style>

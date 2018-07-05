<template>
  <div id="container" ref="container">
    <button-tab ref="tab" v-model="sel_tab">
      <button-tab-item @on-item-click="byName">按人名</button-tab-item>
      <button-tab-item @on-item-click="byDept">按部门</button-tab-item>
    </button-tab>
    <div ref="name_search" class="name_search">
      <search placeholder="请输入姓名/手机号" :auto-fixed='false' v-model="searchName" @on-change="searchByName" v-show="sel_tab===0" ref="search"></search>
    </div>
    <div class="contact_list_box" ref="contact">
      <list-view :data="contacts" ref="list" v-if="listview" @select="selectStaff"></list-view>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <no-result v-show="!contacts.length&&searchName " title="抱歉，查无此人"></no-result>
      <loading v-if="!contacts.length"></loading>
    </div>
    <x-dialog v-model="showToast" class="dialog" :hide-on-blur="true" v-show="showToast">
      <div style="padding:15px 20px;">
        <h3 class="vux-1px-b">{{showStaff.u_truename}}
          <span class="vux-close" @click="showToast=false"></span>
        </h3>
        <x-table :content-bordered="false" :cell-bordered="false">
          <tr>
            <td>性别：</td>
            <td>{{showStaff.u_sex}}</td>
          </tr>
          <tr>
            <td>所属公司：</td>
            <td>{{showStaff.u_center}}</td>
          </tr>
          <tr>
            <td>岗位：</td>
            <td>{{showStaff.u_dept}}</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td v-html="showStaff.u_ATel"></td>
          </tr>
          <tr>
            <td>短号：</td>
            <td v-html="showStaff.u_ACornet"></td>
          </tr>
          <tr>
            <td>QQ：</td>
            <td>{{showStaff.u_chat}}</td>
          </tr>
          <tr>
            <td>邮箱：</td>
            <td>{{showStaff.u_email}}</td>
          </tr>
        </x-table>
      </div>
    </x-dialog>
    <footer-tab :activeIndex=4 ref="footerTab"></footer-tab>
  </div>
</template>
<script>
  import {
    getContactBook
  } from '@/api/get'
  import {
    calHei
  } from 'static/js/dom'
  import footerTab from '@/base/tab'
  import {
    ButtonTab,
    ButtonTabItem,
    Search,
    XDialog,
    XTable
  } from 'vux'
  import ListView from '@/base/listview'
  import NoResult from '@/base/no-result'
  import Loading from '@/base/loading'

  export default {
    data() {
      return {
        contacts: [],
        originalContacts: [],
        listview: false,
        sel_tab: 0,
        searchName: '',
        showToast: false,
        showStaff: {}
      }
    },
    methods: {
      byName() {
        this.$router.push({
          path: '/contact'
        })
      },
      byDept() {
        this.$router.push({
          path: '/contact/dept'
        })
      },
      searchByName() {
        this.contacts = [];
        this.originalContacts.forEach((res) => {
          if (res.u_truename.includes(this.searchName) || res.u_tel.includes(this.searchName) || res.u_cornet.includes(this.searchName)) {
            this.contacts.push(res);
          };
        })
        this._normalizeList(this.contacts);
      },
      selectStaff(staff) {
        this.showToast = true;
        this.showStaff = staff;
        this.showStaff.u_sex = this.showStaff.u_sex === "0" ? "女" : "男"
        this.showStaff.u_ATel = this.showStaff.u_tel ? this.showStaff.u_tel !== '无' ?
          `<a href="tel:${this.showStaff.u_tel}">${this.showStaff.u_tel}</a>` : '无' : '无'
        this.showStaff.u_ACornet = this.showStaff.u_cornet ? this.showStaff.u_cornet !== '无' ?
          `<a href="tel:${this.showStaff.u_cornet}">${this.showStaff.u_cornet}</a>` : '无' : '无'
        this.showStaff.u_chat = this.showStaff.u_chat ? this.showStaff.u_chat : "无"
        this.showStaff.u_email = this.showStaff.u_chat ? this.showStaff.u_chat !== "无" ?
          `${this.showStaff.u_chat}@qq.com` : '无' : "无"
      },
      _getContactBook() {
        getContactBook().then((res) => {
          this.originalContacts = res.data;
          this._normalizeList(res.data);
          this.listview = true;
          calHei(this.$refs.container, this.$refs.contact, this.$refs.tab, this.$refs.footerTab, this.$refs.name_search);
        })
      },
      _normalizeList(list) {
        let map = {};
        list.forEach((item, index) => {
          const key = item.u_spell.substr(0, 1).toUpperCase();
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            };
          }
          map[key].items.push(item);
        });
        let ret = [];
        for (let key in map) {
          let val = map[key];
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val);
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0);
        });
        this.contacts = ret;
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === '/contact/dept') {
          this.sel_tab = 1
          this.$refs.contact.style.height = 44 + parseInt(this.$refs.contact.style.height) + 'px';
        }
        if (to.path === '/contact') {
          this.sel_tab = 0
          if (from.path === '/contact/dept') {
            this.$refs.contact.style.height = parseInt(this.$refs.contact.style.height) - 44 + 'px';
          }
        }
      }
    },
    mounted() {
      this._getContactBook();
    },
    components: {
      footerTab,
      ButtonTab,
      ButtonTabItem,
      Search,
      ListView,
      NoResult,
      XDialog,
      XTable,
      Loading
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';

  #container {
    height: 100%;
    width: 100%;
  }

  .contact_list_box {
    overflow: hidden;
    position: relative;
  }

  .vux-button-group {
    width: 40%;
    margin: 0 auto 15px;
    padding-top: 10px;
  }

  .vux-button-group>a.vux-button-group-current {
    background-color: @default_active;
  }

  .vux-button-group>a.vux-button-tab-item-last:after,
  .vux-button-group>a.vux-button-tab-item-first:after {
    border-color: @default_active;
  }
 
  .dialog {
    border-radius: 15px;
    h3 {
      color: @default_color;
      font-weight: normal;
      text-align: left;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-size: 16px;
      span {
        float: right;
      }
    }
    tr {
      text-align: left;
      color: @default_color;
      line-height: 30px;
      border-collapse: separate;
      border-spacing: 0px 10px;
      td {
        font-weight: 300;
        display: inline-block;
        height: 100%;
        font-size: 15px;
        line-height: 20px;
        width: 65%;
        text-align: left;
        a {
          color: #ffa201;
        }
        &:first-child {
          width: 35%;
        }
      }
    }
    .vux-table:after {
      display: none;
    }
    .vux-table td:before,
    .vux-table th:before {
      display: none;
    }
    .vux-close:before, .vux-close:after{ width: 20px; top: 6px;}
  }

</style>

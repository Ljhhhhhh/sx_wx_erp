<template>
  <div id="dept" ref="wrapper">
    <ul class="content" ref="content">
      <li v-for="item in contactsDept" :key="item.dept_id" @click.stop="showTwo($event)">
        <h3 class="vux-1px-t">{{item.dept_name}}</h3>
        <ul v-if="item.dept.length" ref="categoryTwo" class="category_two">
          <li v-for="item in item.dept" :key="item.dept_id" @click.stop="showStaffTwo($event)">
            <h5>{{item.dept_name}}</h5>
            <ul ref="staffTwo" class="staff_two" @click.stop>
              <li v-for="item in item.staff" :key="item.u_id" @click.stop="selectStaff(item)" class="staff_li">
                <span>{{item.u_truename}}</span><samp>{{item.u_tel}}</samp>
              </li>
            </ul>
          </li>
        </ul>
        <ul v-if="item.staff" ref="staffOne" class="staff_one" @click.stop>
          <li v-for="item in item.staff" :key="item.u_id" class="staff_li" @click.stop="selectStaff(item)">
            <span>{{item.u_truename}}</span><samp>{{item.u_tel}}</samp>
          </li>
        </ul>
      </li>
      <loading v-if="!contactsDept.length"></loading>
    </ul>
    <x-dialog v-model="showToast" class="dialog" :hide-on-blur="true" v-show="showToast">
      <div style="padding:15px;">
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
  </div>
</template>
<script>
  import {
    getContactBookByDepartment
  } from '@/api/get'
  import Bscroll from 'better-scroll'
  import {
    XDialog,
    XTable
  } from 'vux'
  import Loading from '@/base/loading'
  export default {
    data() {
      return {
        contactsDept: [],
        showToast: false,
        showStaff: {}
      }
    },
    methods: {
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
      showTwo(e) {
        let display = '';
        if (e.currentTarget.children[1].style.display === 'block') {
          display = 'none'
        } else {
          display = 'block'
        }
        this._categoryHide();
        e.currentTarget.children[1].style.display = display
      },
      showStaffTwo(e) {
        let display = e.currentTarget.children[1].style.display ? e.currentTarget.children[1].style.display === 'block' ?
          'none' : 'block' : 'block'
        this._categoryHide(true);
        e.currentTarget.children[1].style.display = display
      },
      _categoryHide(flag = false) {
        if (!flag) {
          this.$refs.categoryTwo.forEach(item => {
            item.style.display = 'none'
          });

          this.$refs.staffOne.forEach(item => {
            item.style.display = 'none'
          });
        }
        this.$refs.staffTwo.forEach(item => {
          item.style.display = 'none'
        });
      },
      _getContactBookByDepartment() {
        getContactBookByDepartment().then((res) => {
          console.log(res);
          console.log(res.data);
          this.contactsDept = res.data;
        })

        this.scroll = new Bscroll(this.$refs.wrapper, {
          probeType: 1,
          click: true
        })
      }
    },
    mounted() {
      this._getContactBookByDepartment();
    },
    components: {
      XDialog,
      XTable,
      Loading
    }
  }

</script>
<style lang="less" scoped>
  @import '../../static/styles/reset.less';
  #dept {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #FFF;
    z-index: 3;
    ul {
      height: auto;
      width: 100%;
      li {
        width: 100%;
        height: auto;
        line-height: 30px;
        &:last-child:after {
          display: none;
        }
        .staff_li {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
        h5,
        h3 {
          line-height: 35px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          text-indent: 1em;
          color: #000;
          font-weight: normal;
          font-size: 14px;
        }
        h3 {
          font-size: 16px;
          line-height: 40px;
          background-color: #fff;
        }
        h5 {
          background-color: #eeeeee;
          padding-left: 5px; border-bottom:1px solid #fff;
          color: #000;
          text-indent: 1.5em;
         &:last-child{
          border-bottom:none;
         }
        }
        .staff_one { background:#eee;
          li {
            list-style-type: none;
            font-size: 14px;
            color: #666;
            text-indent: 1em; padding-left:15px;
            width: 100%;
            margin: 0 auto; border-top:1px solid #eaeaea;
            background-color: #FFF;
            span{
              line-height: 25px;
            }
            samp{ color:#fbc700; margin-right:36px;}
          }
        }
        .category_two {
          width: 100%;
          height: auto;
          margin: 0 auto;
          list-style-type: none;
          -webkit-padding-start: 0;
          .staff_two {
            width: 100%; background:#eee; box-shadow:-4px -4px 5px #ddd;
            margin: 0 auto;
            li {
              list-style-type: none;
              font-size: 14px;
              color: #666;
              text-indent: 1.5em;
              background-color: #FFF; border-bottom:1px solid #eaeaea;
               padding-left:18px;
              &:last-child{ border-bottom:none;}
              samp{ color:#fbc700; margin-right:44px;}
            }
          }
        }
      }
    }
  }

  .staff_one,
  .category_two,
  .staff_two {
    display: none;
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
        width: 65%;
        text-align: left;
        font-size:15px;
        a {
          color: @default_active;
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
  }
  .vux-button-group>a.vux-button-group-current {
    background-color: @default_active;
    &::after{
      display: none;
      border-color: transparent;
    }
  }

  .vux-button-group>a.vux-button-tab-item-last:after,
  .vux-button-group>a.vux-button-tab-item-first:after {
    border-color: transparent;
    box-shadow: 0 0 0 1px @default_active inset;
  }
</style>

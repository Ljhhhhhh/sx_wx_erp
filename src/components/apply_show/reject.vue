<template>
  <div id="reject">
    <group>
      <popup-radio
        v-if="newReject.namesArray.rejectStaff.length"
        title="驳回到："
        :options="newReject.namesArray.rejectStaff"
        v-model="rejectMsg"
        @on-hide="selectedRejectStaff"
      >
        <p slot="popup-header" class="vux-1px-b popup-radio_slot">请选择驳回到</p>
      </popup-radio>
      <x-textarea
        title="意见："
        placeholder="请填写驳回/通过意见"
        v-model="suggestin"
        :max="200">
      </x-textarea>
      <cell
        title="消息通知给："
        @click.native="showInformItem"
        is-link
        :value="selectedInformStaffNames"
      ></cell>
      <div v-transfer-dom>
        <popup v-model="showPopup" class="checker-popup">
          <div style="padding:10px 10px 40px 10px;">
            <p style="padding: 0px 5px 5px 2px;color:#888; margin-bottom:10px; font-size:15px;">请选择需要通知给谁：</p>
            <checker
              type="checkbox"
              v-model="selectedInformStaffIds"
              default-item-class="demo4-item"
              selected-item-class="demo4-item-selected">
              <checker-item
                :value="key"
                @on-item-click="selectedInformStaff(val)"
                :key="key"
                v-for="(key,val) in newReject.valueArray.informStaff"
              >{{val}}
              </checker-item>
            </checker>
          </div>
        </popup>
      </div>
    </group>
    <flexbox id="reject_btns">
      <flexbox-item>
        <x-button @click.native="rejectBtn" type="default">驳回</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button @click.native="passBtn" type="primary">通过</x-button>
      </flexbox-item>
    </flexbox>
    <toast v-model="toastShow" :type="toastType" :time='1000'>{{rejectWarn}}</toast>
  </div>
</template>

<script>
  import {
    Group,
    XTextarea,
    PopupRadio,
    Cell,
    Flexbox,
    FlexboxItem,
    XButton,
    Checker, CheckerItem,
    Popup, TransferDom,
    Toast
  } from 'vux'
  import {checkPass} from '@/api/post';
  import {checkReject} from '@/api/put';
  import {mapGetters,mapMutations} from 'vuex';
  import {
    getBacklog
  } from '@/api/get'
  export default {
    name: "applyReject",
    directives: {
      TransferDom
    },
    props: {
      reject: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        showPopup: false,
        rejectMsg: '请驳回到',
        selectedRejectStaffId: '',
        selectedInformStaffNames: '请选择',
        selectedInformStaffIds: [],
        select_time: '',
        suggestin: '',
        toastShow: false,
        toastType: 'warn',
        rejectWarn: ''
      }
    },
    methods: {
      rejectBtn() {
        //驳回
        this.rejectWarn = '';
        console.log(this.selectedRejectStaffId);
        if (!this.selectedRejectStaffId) {
          this.rejectWarn = '请选择驳回到谁';
          this.toastType = 'warn';
          this.toastShow = true;
          return;
        }
        if (!this.suggestin) {
          this.rejectWarn = '请填写意见';
          this.toastType = 'warn';
          this.toastShow = true;
          return;
        }
        const query = this.$route.query;
        let params = {};
        let id = query.id;
        params = {
          op: query.op,
          opinion: this.suggestin,
          state: this.selectedRejectStaffId
        };
        checkReject(id, params).then(res => {
          if (res.data === 'success') {
            this.rejectWarn = '驳回成功';
            this.toastType = 'success';
            this.toastShow = true;
            this._setWorkTotal();
            this.select_time = setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        })
      },
      passBtn() {
        let idStr = '';
        const informStaff = this.newReject.valueArray.informStaff;
        this.selectedInformStaffNames.split(' ').forEach(name => {
          if (informStaff[name]) {
            idStr += ',' + informStaff[name];
          }
        });
        this.selectedInformStaffIds = idStr.split(',').splice(1);
        // let u_name = this.userinfo.u_truename;
        let applyName = this.reject.applyName;
        let applyItem = this.reject.applyItem;
        let content = `您有一条来自${applyName}的${applyItem}申请`;
        let extra = {
          "uid": this.selectedInformStaffIds,
          "content": content,
          "name":this.selectedInformStaffNames.split(' ').join(',')
        };
        const query = this.$route.query;
        const params = {
          op: query.op,
          id: query.id,
          opinion: this.suggestin,
          extra:JSON.stringify(extra)
        }
        checkPass(params).then(res => {
          if (res.data === 'success') {
            this.rejectWarn = '操作成功';
            this.toastType = 'success';
            this.toastShow = true;
            this._setWorkTotal();
            this.select_time = setTimeout(() => {
              this.$router.back();
            }, 1000);
          }
        })
        //通过
      },
      _setWorkTotal() {
        getBacklog().then(res => {
          let total = 0;
          res.data.forEach(item => {
            total += parseInt(item.count);
          });
          this.setWorkTotal(total);
        });
      },
      selectedInformStaff(val) {
        this.select_time = setTimeout(() => {
          if (this.selectedInformStaffNames.includes('请选择')) {
            this.selectedInformStaffNames = '';
          }
          if (this.selectedInformStaffNames.includes(val)) {
            let selectedInformStaffNamesArr = this.selectedInformStaffNames.split(' ');
            selectedInformStaffNamesArr.forEach((item, index) => {
              if (item === val) {
                selectedInformStaffNamesArr.splice(index, 1);
              }
            });
            if (selectedInformStaffNamesArr.length === 1 && selectedInformStaffNamesArr[0] === '') {
              this.selectedInformStaffNames = '请选择'
            } else {
              this.selectedInformStaffNames = selectedInformStaffNamesArr.join(' ');
            }
          } else {
            this.selectedInformStaffNames = `${this.selectedInformStaffNames} ${val}`;
          }
          ;
          this.selectedInformStaffNames = this.selectedInformStaffNames.replace(/^\s+|\s+$/g, "");
        }, 0)
      },
      showInformItem() {
        this.showPopup = !this.showPopup;
      },
      selectedRejectStaff() {
        this.selectedRejectStaffId = this.newReject.valueArray.rejectStaff[this.rejectMsg];
        console.log(this.selectedRejectStaffId);
      },
      ...mapMutations({
        'setWorkTotal': 'SET_WORKTOTAL'
      })
    },
    computed: {
      newReject() {
        let NJ = {
          namesArray: {
            rejectStaff: [],
            informStaff: []
          },
          valueArray: {
            rejectStaff: {},
            informStaff: {}
          }
        }
        if (this.reject && this.reject.rejectStaff) {
          for (let i = 0, Len = this.reject.rejectStaff.length; i < Len; i++) {
            let val = this.reject.rejectStaff[i]['val'];
            let name = this.reject.rejectStaff[i]['name'];
            NJ.namesArray.rejectStaff.push(name);
            NJ.valueArray.rejectStaff[name] = val;
          }
          console.log(NJ.valueArray.rejectStaff);
        }
        if (this.reject && this.reject.informStaff) {
          for (let i = 0, Len = this.reject.informStaff.length; i < Len; i++) {
            let val = this.reject.informStaff[i]['val'];
            let name = this.reject.informStaff[i]['name'];
            NJ.namesArray.informStaff.push(name);
            NJ.valueArray.informStaff[name] = val;
          }
          console.log(NJ.valueArray.informStaff);
        }
        return NJ;
      },
      ...mapGetters([
        'userinfo'
      ])
    },
    beforeDestroy() {
      clearTimeout(this.select_time);
    },
    components: {
      Group,
      XTextarea,
      PopupRadio,
      Cell,
      XButton,
      Flexbox,
      FlexboxItem,
      Checker, CheckerItem,
      Popup,
      Toast
    }
  }
</script>

<style scoped lang="less">
  @import '../../../static/styles/vux_reset.less';

  .popup-radio_slot {
    text-align: center;
    padding: 8px 0;
    color: #fbc700;
  }

  .vux-flexbox {
    box-sizing: border-box;
    padding: 5px 10px;
  }
  #reject_btns{
    background-color: #FFF;
    position: fixed;
    bottom: 0;
  }
  .demo5-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }

  .demo5-item-selected {
    border-color: #ff4a00;
  }

  .demo4-item {
    background-color: #ddd;
    color: #222;
    font-size: 14px;
    padding: 5px 10px;
    margin-right: 10px;
    line-height: 18px;
    border-radius: 15px;
    margin-bottom: 10px;
  }

  .demo4-item-selected {
    background-color: #fbc700;
    color: #fff;
  }

  .demo4-item-disabled {
    color: #999;
  }
</style>

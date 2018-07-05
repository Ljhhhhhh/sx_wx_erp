<template>
  <div class="apply-info_list">
    <div>
      <p v-for="(val,key) in dataInfo" :key="key">
        <span>{{key}}：</span>
        <strong>{{val}}</strong>
      </p>
    </div>
    <template v-if="detailInfoArr.length">
      <div v-for="(items,index) in detailInfoArr" :key="index" class="item">
        <div v-for="(val,key,index) in items" :key="index">
          <p class="item_title">{{key}}</p>
          <p class="item_content">{{val}}</p>
        </div>
      </div>
    </template>
    <template v-if="tableShow">
      <div
        v-for="(objs,objName,index) in tableDatas"
        :key="index">
        <div v-for="(item,index) in objs" :key="index" class="item">
          <p class="item_title">{{objName}} <template v-if="objs.length>1">{{index+1}}</template></p>
          <p class="item_content" v-for="(val,key) in item" :key="key"><span>{{key}}:</span>{{val}}</p>
        </div>
      </div>
    </template>
    <div v-if="picsShow" class="vux-1px-t">
      <p>附件</p>
      <span v-for="(item,index) of pics" :key="index" class="pics">
        <img class="previewer-demo-img" v-lazy="item.src" @touchstart="previewShow(index)">
      </span>
      <div v-transfer-dom>
        <previewer :list="pics" ref="previewer" :options="options"></previewer>
      </div>
    </div>
  </div>
</template>

<script>
  import {setNotSureData} from '@/api/navbars'
  import {IMG_ADS} from "@/api/config";
  import {Previewer, TransferDom} from 'vux'
  export default {
    name: "applyInfo",
    directives: {
      TransferDom
    },
    props: {
      info: {
        type: Object,
        required: true,
        default: {}
      }
    },
    data() {
      return {
        dataInfo: {},
        detailInfoArr: [],
        tableDatas: [],
        tableShow: false,
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    methods: {
      previewShow(index) {
        this.$refs.previewer.show(index);
      },
      initComp() {
        setNotSureData(this.info.data, this.info.op).then(res => {
          this.dataInfo = res.notSureData;
          this.tableDatas=res.otherDatas;
          console.log('navbar.js return:',res);
          this.tableShow=this.tableDatas?true: false;
          Object.keys(this.tableDatas).forEach(item=>{
            if(typeof this.tableDatas[item] === 'string') {
              let ex={};
              ex[item]=this.tableDatas[item];
              this.detailInfoArr.push(ex);
              delete this.tableDatas[item];
            }
          })
        })
      }
    },
    computed: {
      pics() {
        if (this.info.data && this.info.op) {
          let p = [];
          if (this.info.data[`${this.info.op}_pics`]) {
            this.info.data[`${this.info.op}_pics`].forEach(item => {
              p.push({'src':IMG_ADS + item})
            });
          }
          if (this.info.data['pics']) {
            if(Array.isArray(this.info.data['pics'])){
              this.info.data['pics'].forEach(item => {
                p.push({'src':IMG_ADS + item})
              })
            }else{
              p.push(IMG_ADS+this.info.data['pics']);
            }
          }
          if(this.info.data['wr_adjunct']) {
            this.info.data['wr_adjunct'].forEach(item => {
              p.push({'src':IMG_ADS + item})
            })
          }
          if(this.info.data['picsx']) {
            this.info.data['picsx'].forEach(item => {
              p.push({'src':IMG_ADS + item})
            })
          }
          if(this.info.data['de_accessory']) {
            this.info.data['de_accessory'].forEach(item => {
              p.push({'src':IMG_ADS + item})
            })
          }
          return p;
        }
      },
      // picsObj() {
      //   let obj = [];
      //   this.pics.forEach(item => {
      //     obj.push({'src':item});
      //   });
      //   return obj;
      // },
      picsShow() {
        return this.pics && this.pics.length > 0 ? true : false;
      },
    },
    components: {
      Previewer
    },
    watch: {
      info() {
        this.initComp();
      }
    }
  }
</script>

<style lang="less" scoped>
  .apply-info_list {
    padding-top: 5px;
    div:last-child {
      &.vux-1px-b::after {
        display: none;
      }
    }
    p {
      line-height: 30px;
      font-size: 14px;
      padding: 0 15px;
      span {
        display: inline-block;
        width: auto;
        text-align-last: justify;
        margin-right: 0.2em;
        color: #1B1B1B;
      }
      strong {
        color: #666;
        font-weight: 300;
      }
    }
    span.pics {
      display: inline-block;
      padding: 3px 7px;
      border: 1px solid #F5F5F5;
      margin-left: 10px;
      img {
        width: 50px;
        height: auto;
      }
    }
  }
  .item{
    .item_title{
      background-color: #F5F5F5;
      box-shadow: 0 0 5px #F5F5F5;
      font-weight: bold;
    }
    .item_content{
     // text-indent: 0.5em;
      color: #666;
    }
  }
  img[lazy=loading], img[lazy=error] {
    background: url("../../../static/images/icons/picarr_icon.png");
    background-size: 100%;
  }
</style>

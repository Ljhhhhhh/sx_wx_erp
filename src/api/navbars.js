import moment from 'moment';
import _ from 'loadsh';
import {getCreateApply} from '@/api/get';

export const navbar_json = {
  "jb": {
    "c_name": "加班",
    "data": {
      "jb_hours": {
        "title": "加班时长",
        "unit": '小时'
      },
      "jb_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "jb_startdate": {
        "title": "加班时间",
        "_formatUnixTime": true
      },
      "jb_enddate": {
        "title": "结束时间",
        "_formatUnixTime": true
      },
      "jb_timelimit": {
        "title": "有效期",
        "unit": "天"
      },
      "jb_detail": {
        "title": "加班事由"
      }
    }
  },
  "wq": {
    "c_name": "外出签卡",
    "data": {
      "wq_totalhour": {
        "title": "补卡时长",
        "unit": '小时'
      },
      "wq_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "wq_startdate": {
        "title": "加班时间",
        "_formatUnixTime": true
      },
      "wq_enddate": {
        "title": "结束时间",
        "_formatUnixTime": true
      },
      "wq_detail": {
        "title": "补卡事由"
      }
    }
  },
  "bk": {
    "c_name": "补卡",
    "data": {
      "bk_applydate": {
        "title": "补卡时间",
        "_formatUnixTime": true
      },
      "bk_type": {
        "title": "补卡类型",
      },
      "bk_detail": {
        "title": "补卡事由",
      }
    }
  },
  "cc": {
    "c_name": "出差",
    "data": {
      "cc_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "cc_dourn": {
        "title": "目的地",
      },
      "cc_estimcost": {
        "title": "预算经费",
      },
      "cc_datestart": {
        "title": "出发时间",
        "_formatUnixTime": true
      },
      "cc_dateend": {
        "title": "结束时间",
        "_formatUnixTime": true
      },
      "cc_alldate": {
        "title": "共计",
        "unit": "天"
      },
      "cc_peerpe": {
        "title": "出差人员"
      },
      "cc_reasons": {
        "title": "出差事由"
      }
    }
  },
  "rf": {
    "c_name": "销假单",
    "data": {
      "rf_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "rf_startdate": {
        "title": "销假时间",
        "_formatUnixTime": true
      },
      "rf_enddate": {
        "title": "结束日期",
        "_formatUnixTime": true
      },
      "rf_detail": {
        "title": "销假理由"
      }
    },
    "calcData": {
      "data": {
        "dayhours": {
          "title": "销假时长",
          "field": {
            "rf_dates": {
              "unit": '天'
            },
            "rf_hours": {
              "unit": "小时"
            }
          }
        }
      },
      "otherData": {
        "dayhours": {
          "title": "共计时长",
          "field": {
            "qj_days": {
              "unit": '天'
            },
            "qj_hours": {
              "unit": "小时"
            }
          }
        }
      }
    },
    "otherData": {
      "detail": {
        "c_name": "相关详情",
        "data": {
          "qj_startdate": {
            "title": "请假时间",
            "_formatUnixTime": true
          },
          "qj_enddate": {
            "title": "结束时间",
            "_formatUnixTime": true
          },
          "qj_days": {
            "title": "共计时长",
            "unit": "天",
            "withOther": "qj_hours"
          },
          "qj_hours": {
            "title": "",
            "unit": "小时"
          },
          "qj_category": {
            "title": "类型",
          },
          "qj_detail": {
            "title": "请假说明"
          },
          "cc_applydate": {
            "title": "申请时间",
            "_formatUnixTime": true
          },
          "cc_alldate": {
            "title": "共计时长",
            "unit": '天'
          },
          "cc_datestart": {
            "title": "出发时间",
            "_formatUnixTime": true
          },
          "cc_dateend": {
            "title": "结束时间",
            "_formatUnixTime": true
          },
          "cc_dourn": {
            "title": "目的地"
          },
          "cc_reasons": {
            "title": "出差事由"
          }
        }
      }
    }
  },
  "qj": {
    "c_name": "请假",
    "data": {
      "qj_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "qj_startdate": {
        "title": "请假时间",
        "_formatUnixTime": true
      },
      "qj_enddate": {
        "title": "结束时间",
        "_formatUnixTime": true
      },
      "qj_category": {
        "title": "类型",
      },
      "qj_touname": {
        "title": "委托人"
      },
      "qj_detail": {
        "title": "请假事由"
      },
      "qj_jobnumber": {
        "title": "抵扣单号"
      }
    },
    "calcData": {
      "data": {
        "dayhours": {
          "title": "请假时长",
          "field": {
            "qj_days": {
              "unit": '天'
            },
            "qj_hours": {
              "unit": "小时"
            }
          }
        }
      }
    }
  },
  "jk": {
    "c_name": "借款申请",
    "data": {
      "jk_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "jk_applymoney": {
        "title": "借款金额",
      },
      "jk_applycapital": {
        "title": "金额大写"
      },
      "jk_applyreturntime": {
        "title": "预计归还日期",
        "_formatUnixTime": true
      },
      "yk_currency": {
        "title": "币种",
        "bindOther": "yk_currency"
      },
      "yk_transway": {
        "title": "付款方式",
        "bindOther": "yk_transway"
      },
      "yk_payee": {
        "title": "收款人"
      },
      "jk_detail": {
        "title": "借款原因"
      }
    }
  },
  "yk": {
    "c_name": "日常立项",
    "data": {
      "yk_applydate": {
        "title": '申请时间',
        "_formatUnixTime": true
      },
      "yk_currency": {
        "title": "币种",
        "bindOther": 'yk_currency'
      },
      "yk_total": {
        "title": "总金额"
      },
      "yk_sitename": {
        "title": "美团站点"
      },
      "yk_detail": {
        "title": '详情说明'
      },
    },
    "otherData": {
      "detail": {
        "c_name": "日常立项",
        "data": {
          "ykdet_proname": {
            "title": "项目名称"
          },
          "ykdet_unitprice": {
            "title": "单价"
          },
          "ykdet_count": {
            "title": "数量"
          },
          "ykdet_price": {
            "title": "金额"
          },
          "ykdet_comment": {
            "title": "备注"
          }
        }
      }
    }
  },
  "bx": {
    "c_name": "行政报销",
    "data": {
      "bx_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "bx_currency": {
        "title": "币种",
        "bindOther": 'bx_currency'
      },
      "sktype": {
        "title": "付款方式",
        "bindOther": "sktype"
      },
      "bx_skr": {
        "title": "收款人"
      },
      "sktype_company": {
        "title": "报销公司"
      },
      "bx_bills": {
        "title": "单据",
        "bindOther": "bx_bills"
      },
      "bx_total": {
        "title": "总金额"
      },
      "bx_detail": {
        "title": "详细说明"
      }
    },
    "otherData": {
      "detail": {
        "c_name": "报销明细",
        "data": {
          "bxdet_number": {
            "title": "报销单号"
          },
          "bxdet_proname": {
            "title": "项目"
          },
          "bxdet_price": {
            "title": "金额"
          },
          "bxdet_comment": {
            "title": "备注"
          }
        }
      },
      "cc": {
        "c_name": "出差凭证",
        "data": {
          "cc_number": {
            "title": "出差编号"
          },
          "cc_estimcost": {
            "title": "预算经费"
          },
          "cc_dourn": {
            "title": "目的地"
          },
          "cc_alldate": {
            "title": "总天数"
          },
          "cc_reasons": {
            "title": "出差事由"
          }
        }
      },
      "jk": {
        "c_name": "借款凭证",
        "data": {
          "jk_number": {
            "title": "单据编号"
          },
          "yk_currency": {
            "title": "币种"
          },
          "jk_applymoney": {
            "title": "金额"
          },
          "jk_detail": {
            "title": "说明"
          }
        }
      }
    }
  },
  "sg": {
    "c_name": "申购",
    "data": {
      "sg_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "sg_name": {
        "title": "资产名称"
      },
      "sg_type": {
        "title": "规格型号"
      },
      "sg_num": {
        "title": "申请数量"
      },
      "sg_use_place": {
        "title": "使用地点"
      },
      "sg_money": {
        "title": "估价"
      },
      "sg_detail": {
        "title": "购置理由"
      }
    }
  },
  "ly": {
    "c_name": "领用",
    "data": {
      "ly_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "ly_detail": {
        "title": "详细说明"
      }
    },
    "otherData": {
      "detail": {
        "c_name": "物品明细",
        "data": {
          "ly_name": {
            "title": "物品名称"
          },
          "pm": {
            "title": "规格型号",
            "children": "spec"
          },
          "ly_num": {
            "title": "数量",
            "withOther": "ly_mnumber"
          },
          "ly_mnumber": {
            "title": "",
            "unit": ""
          },
          "ly_type": {
            "title": "库存",
            "withOther": "ly_mnumber"
          },
          "ly_customer": {
            "title": "客户"
          }
        }
      }
    }
  },
  "wx": {
    "c_name": "维修",
    "data": {
      "wx_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "wx_goodsname": {
        "title": "设备名称"
      },
      "wx_detail": {
        "title": "故障描述"
      },
      "sg_num": {
        "title": "申请数量"
      },
      "sg_use_place": {
        "title": "使用地点"
      },
      "sg_money": {
        "title": "估价"
      },
      "sg_detail": {
        "title": "购置理由"
      }
    }
  },
  "bf": {
    "c_name": "报废",
    "data": {
      "bf_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "bf_assetName": {
        "title": "资产名称"
      },
      "bf_buyTime": {
        "title": "采购时间",
        "_formatUnixTime": true
      },
      "bf_model": {
        "title": "规格型号"
      },
      "bf_count": {
        "title": "申请数量"
      },
      "bf_useTime": {
        "title": "使用年限"
      },
      "bf_detail": {
        "title": "报废原因"
      }
    }
  },
  "yc": {
    "c_name": "用车",
    "data": {
      "yc_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "yc_startdate": {
        "title": "用车时间",
        "_formatUnixTime": true
      },
      "yc_staddr": {
        "title": "出发地"
      },
      "yc_endaddr": {
        "title": "目的地"
      },
      "yc_detail": {
        "title": "用车理由"
      },
      "yc_cartype": {
        "title": "用车类型",
        "bindOther": "cartype"
      },
      "yc_carnature": {
        "title": "车辆性质",
        "bindOther": "carnature"
      },
      "yc_carnumber": {
        "title": "车牌号"
      },
      "yc_drivername": {
        "title": "驾驶员"
      },
      "yc_startkilo": {
        "title": "起点公里数"
      },
      "yc_endkilo": {
        "title": "终点公里数"
      }
    }
  },
  "gz": {
    "c_name": "盖章",
    "data": {
      "gz_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "gz_stamptype": {
        "title": "印章种类",
      },
      "gz_remark": {
        "title": "盖章公司"
      },
      "gz_detail": {
        "title": "盖章原因"
      },
      "endTime": {
        "title": "合同结束"
      }
    }
  },
  "mpsq": {
    "c_name": "名片申请",
    "data": {
      "mpsq_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "mpsq_center": {
        "title": "所属公司",
      },
      "mpsq_tel": {
        "title": "固定电话"
      },
      "phone": {
        "title": "手机号码"
      },
      "mpsq_qq": {
        "title": "QQ"
      },
      "mpsq_mail": {
        "title": "Email"
      },
      "mpsq_detail": {
        "title": "申请理由"
      }
    }
  },
  "wr": {
    "c_name": "工作总结",
    "data": {
      "wr_applydate": {
        "title": "发布时间",
        "_formatUnixTime": true
      },
      "wr_title": {
        "title": "标题",
      },
      "wr_content": {
        "title": "详情"
      }
    }
  },
  "lf": {
    "c_name": "文件借用",
    "data": {
      "lf_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "lf_loandatestate": {
        "title": "借用时间",
        "_formatUnixTime": true
      },
      "lf_loandateend": {
        "title": "归还时间",
        "_formatUnixTime": true
      },
      "lf_delaydate": {
        "title": "延期至",
        "_formatUnixTime": true
      },
      "lf_detail": {
        "title": "延期原因"
      },
      "lf_oridetail": {
        "title": "用途"
      }
    },
    "otherData": {
      "arr": {
        "c_name": "文件",
        "data": {
          "fd_deptName": {
            "title": "借用公司"
          },
          "fm_name": {
            "title": "文件名称"
          },
          "fm_type": {
            "title": "文件类型"
          }
        }
      }
    }
  },
  "qs": {
    "c_name": "请示",
    "data": {
      "qs_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "qs_title": {
        "title": "标题",
      },
      "qs_keyword": {
        "title": "详情"
      },
      "qs_person_name": {
        "title": "请示对象"
      },
      "qs_detail": {
        "title": "请示内容"
      }
    }
  },
  "if": {
    "c_name": "内部文件",
    "data": {
      "if_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "if_ex_title": {
        "title": "文件标题",
      },
      "if_ex_no": {
        "title": "来文编号"
      },
      "if_ex_dept": {
        "title": "来文部门"
      },
      "if_approvename": {
        "title": "审阅人员"
      },
      "qs_detail": {
        "title": "请示内容"
      }
    }
  },
  "hr": {
    "c_name": "人力需求",
    "data": {
      "hr_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "hr_applypost": {
        "title": "申请岗位"
      },
      "hr_applyno": {
        "title": "需求人数",
      },
      "hr_urgencylev": {
        "title": "紧急程度"
      },
      "hr_arriveDate": {
        "title": "到岗日期",
        "_formatUnixTime": true
      },
      "hr_workplace": {
        "title": "工作地点"
      },
      "hr_remark": {
        "title": "申请原因"
      },
      "hr_sex": {
        "title": "性别",
      },
      "hr_age": {
        "title": "年龄"
      },
      "hr_marrystate": {
        "title": "婚否"
      },
      "hr_eduhis": {
        "title": "学历"
      },
      "hr_major": {
        "title": "专业"
      },
      "hr_foreign": {
        "title": "外语"
      },
      "hr_channel": {
        "title": "应聘渠道"
      },
      "hr_worktime": {
        "title": "工作年数",
      },
      "hr_workskill": {
        "title": "工作技能"
      },
      "hr_protocolsal": {
        "title": "拟定薪资"
      },
      "hr_workduties": {
        "title": "工作内容"
      },
      "hr_workreq": {
        "title": "岗位要求"
      },
      "hr_detail": {
        "title": "备注"
      }
    }
  },
  "zz": {
    "c_name": "转正",
    "data": {
      "zz_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "zz_entrydate": {
        "title": "入职时间",
        "_formatUnixTime": true
      },
      "zz_salary": {
        "title": "试用薪资",
      },

    },
    "otherData": {
      "zz_feeling": {
        "c_name": "试用期间对岗位和公司的认知"
      },
      "zz_self_introduce": {
        "c_name": "自我评价"
      }
    }
  },
  "sy": {
    "c_name": "转试用",
    "data": {
      "sy_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "sy_entry_date": {
        "title": "入职时间",
        "_formatUnixTime": true
      },
      "sy_money": {
        "title": "实习薪资",
      },

    },
    "otherData": {
      "sy_company_perceive": {
        "c_name": "实习期间对岗位和公司的认知"
      },
      "sy_self_assessment": {
        "c_name": "自我评价"
      }
    }
  },
  "lz": {
    "c_name": "离职申请",
    "data": {
      "lz_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "lz_leave_date": {
        "title": "申请岗位",
        "_formatUnixTime": true
      },
      "lz_telphone": {
        "title": "联系电话",
      },
      "lz_jiaojie_name": {
        "title": "工作交接人"
      },
      "lz_salary_property": {
        "title": "结算方式",
        "bindOther": "lz_xzjs",
      },
      "lz_salary_bankid": {
        "title": "接收卡号"
      },
      "lz_salary_money": {
        "title": "现金结算"
      },
      "lz_detail": {
        "title": "离职原因"
      },
      "lz_jiaojie": {
        "title": "工作交接"
      },
    }
  },
  "ss": {
    "c_name": "社保申请",
    "data": {
      "ss_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "ss_roase": {
        "title": "申请理由"
      }
    },
    "otherData": {
      "user": {
        "c_name": "职员信息",
        "data":{
          "u_etime": {
            "title": "入职时间",
            "_formatUnixTime": true
          },
          "u_ltime": {
            "title": "转正时间",
            "_formatUnixTime": true
          },
          "u_position": {
            "title": "职位"
          },
          "zhichen": {
            "title": "职称"
          }
        }
      }
    }
  },
  "fc": {
    "c_name": "邮费补贴",
    "data": {
      "fc_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "u_position": {
        "title": "职位",
      },
      "u_zhicheng_level": {
        "title": "职称",
      },
      "fc_effecttime": {
        "title": "补助时间",
        "_formatUnixTime": true
      },
      "fc_reasons": {
        "title": "申请理由"
      }
    }
  },
  "pu": {
    "c_name": "公积金申请",
    "data": {
      "pu_applydate": {
        "title": "申请时间",
        "_formatUnixTime": true
      },
      "pu_etime": {
        "title": "入职时间",
        "_formatUnixTime": true
      },
      "pu_ptime": {
        "title": "转正时间",
        "_formatUnixTime": true
      },
      "pu_position": {
        "title": "职位"
      },
      "pu_zhicheng": {
        "title": "职称"
      },
      "pu_reason": {
        "title": "申请理由"
      }
    }
  },
  "bg": {
    "c_name": "提单发放",
    "data": {
      "bg_number": {
        "title": "客户编号",
      },
      "bg_client_name": {
        "title": "客户名",
      },
      "bg_bill_number": {
        "title": "提单号",
      },
      "bg_sail_time": {
        "title": "开航日期",
        "_formatUnixTime": true
      },
      "bg_arrival_time": {
        "title": "到港日期",
        "_formatUnixTime": true
      },
      "bg_container_number": {
        "title": "柜号/货运业务号"
      },
      "bg_cutoff_time": {
        "title": "统计截至日期",
        "_formatUnixTime": true
      },
      "bg_yet_container_number": {
        "title": "已出柜柜号",
        "_formatUnixTime": true
      },
      "bg_expire_AR": {
        "title": "未到期应收款"
      },
      "bg_nexpire_AR": {
        "title": "已到期应收款(含运费佣金等)"
      },
      "bg_detail": {
        'title': '近期安排货款说明'
      }
    }
  },
  "wl": {
    "c_name": "资金往来",
    "data": {
      "wl_name": {
        "title": "客户名称",
      },
      "wl_outname": {
        "title": "付款单位名称",
        "_formatUnixTime": true
      },
      "wl_outcode": {
        "title": "付款账号",
        "_formatUnixTime": true
      },
      "wl_outbank": {
        "title": "付款开户行"
      },
      "wl_money": {
        "title": "金额",
      },
      "wl_inname": {
        'title': '收款单位名称'
      },
      "wl_incode":{
        "title": '收款账号'
      },
      'wl_inbank': {
        "title": "收款开户行"
      },
      "wl_cur": {
        "title": "汇率",
      },
      "wl_currency": {
        "title": "汇率转人民币金额"
      },
      "wl_returndate": {
        "title": "归还日期",
        "_formatUnixTime": true
      },
      "wl_reason": {
        "title": "借款原因"
      }
    }
  },
  "de": {
    "c_name": "外来文件审批",
    "data": {
      "de_ex_date": {
        "title": "来文日期",
        "_formatUnixTime": true
      },
      "de_ex_no": {
        "title": "来文编号",
      },
      "de_ex_re_no": {
        "title":"来文文号"
      },
      "de_ex_office": {
        "title":"机关"
      },
      "de_ex_title": {
        "title": "标题",
      },
      "de_detail": {
        "title": "详情",
      },
    }
  },
  "nt": {
    "c_name": "公告",
    "data": {
      "nt_detail": {
        "title": "公告标题"
      },
      "content": {
        "title": "公告详情",
      }
    }
  },
  "fd": {
    "c_name": "放单",
    "data": {
      "fd_applydate": {
        "title": "申请日期",
        "_formatUnixTime": true
      },
      "fd_detail": {
        "title": "备注说明",
      }
    },
    "otherData": {
      "Bookingnote": {
        "c_name": "提单详情",
        "data": {
          "bnote_billnum": {
            "title": "提单号码"
          },
          "bnote_operator": {
            "title": "操作员",
          },
          "bnote_operatorid": {
            "title": "操作员id"
          },
          "bnote_cus": {
            "title": "客户名",
          },
          "bnote_num": {
            "title": "外运编号",
          },
          "bnote_fsailingdate": {
            "title": "开航日期",
            "_formatUnixTime": true
          },
          "bnote_fportdate": {
            "title": "到港日期",
            "_formatUnixTime": true
          },
          "bnote_service": {
            "title": "负责人"
          }
        }
      }
    }
  },
  "yw": {
    "c_name": "业务报销",
    "data": {
      "yw_applydate": {
        "title": "申请日期",
        "_formatUnixTime": true
      },
      "yw_bills": {
        "title": "单据",
        "bindOther": "bx_bills"
      },
      "dj_count": {
        "title": "单据张数",
      },
      "cus_name": {
        "title": "客户名称",
      },
      "	money_type": {
        "title":"币种",
        "bindOther": "money_type"
      },
      "rec_comp_name": {
        "title":"收款单位"
      },
      "bank_name": {
        "title": "开户行",
      },
      "bank_account": {
        "title": "收款账号",
      },
      "amount": {
        "title": "收款金额",
      },
      "contract_num": {
        "title": "合同号",
      },
      "apply_company": {
        "title":"报销公司",
      },
      "use": {
        "title":"用途"
      },
    },
    "otherData": {
      "lx": {
        "c_name": "报销详情",
        "data": {
          "yk_number": {
            "title": "单号",
          },
          "yk_currency": {
            "title": "币种"
          },
          "yk_total": {
            "title": "金额"
          },
          "yk_detail": {
            "title": "说明",
          }
        }
      }
    }
  },
  "kq": {
    "c_name": "考勤确认",
    "data": {},
    "otherData": {
      "Kquser": {
        "c_name": "基本信息",
        "data": {
          "u_truename": {
            "title": "姓名"
          },
          "u_name": {
            "title": "工号",
          },
          "u_dept": {
            "title": "所属部门"
          },
          "u_center": {
            "title": "所属公司",
          }
        }
      },
      "AttStatistics": {
        "c_name": "考勤信息",
        "data": {
          "month": {
            "title": "考勤月份"
          },
          "should_att": {
            "title": "应出勤",
          },
          "leave": {
            "title": "事假"
          },
          "sickleave": {
            "title": "病假",
          },
          "absenteeism": {
            "title": "旷工",
          },
          "late_num": {
            "title": "迟到次数"
          },
          "late_times": {
            "title": "迟到时间"
          },
          "absent": {
            "title": "实际缺勤"
          },
          "fact_att": {
            "title": "实际出勤"
          },
          "leavedetail": {
            "title": "请假备注"
          },
          "unclock": {
            "title": "未打卡备注"
          },
          "deadline": {
            "title": "截止日期"
          }
        }
      }
    }
  },
  "mt": {
    "c_name": "会议管理",
    "data": {

    },
    "otherData": {
      "mt_details": {
        "c_name": "会议详情",
        "data": {
          "mt_titl": {
            "title": "会议标题",
          },
          "mt_compere": {
            "title": "主持人",
          },
          "mt_cfid": {
            "title": "会议室",
          },
          "mt_people_num": {
            "title": "会议人数"
          },
          "mt_date": {
            "title": "会议时间",
            "_formatUnixTime": true
          },
          "mt_enddate": {
            "title": "会议结束时间",
            "_formatUnixTime": true
          },
          "mt_score": {
            "title": "会议分值"
          },
          "mt_member": {
            "title": "会议人员"
          },
        }
      }
    }
  },
};

export function setNotSureData(data, op) {
  console.log('Api Result:', data);
  return getMoreInfo(op).then(res => {
    let moreInfo = res;
    console.log('bindMoreInfo:', moreInfo);
    const notSureData = {};
    const fields = navbar_json[op].data;
    let calcField = {};
    if (navbar_json[op].calcData && navbar_json[op].calcData['data']) {
      calcField = navbar_json[op].calcData['data']
    }
    //一般数据
    for (let item in fields) {
      if (!data[item]) {
        continue;
      }
      let val = data[item];
      if (fields[item]['_formatUnixTime']) {
        val = _formatUnixTime(val);
      }
      if (fields[item]['unit']) {
        val = `${val}${fields[item]['unit']}`;
      }
      notSureData[fields[item].title] = val;
      //如果需要转变为绑定的额外数据
      if (fields[item]['bindOther']) {
        moreInfo[fields[item]['bindOther']].forEach(g => {
          if (val == g.val) {
            notSureData[fields[item].title] = g.name;
          }
        });
      }
    }
    //需要计算后展示的数据
    if (calcField) {
      if (calcField['dayhours']) {
        notSureData[calcField['dayhours'].title] = _DayHourCalc(data, calcField['dayhours']['field']);
      }
    }
    //当前详情绑定的其他详情
    let otherItem = navbar_json[op].otherData ? Object.keys(navbar_json[op].otherData) : [];
    let otherDatas = {}, otherFields = [];
    otherItem.forEach(item => {
      otherFields[item] = navbar_json[op].otherData ? navbar_json[op].otherData[item].data : {};
      let itemName = navbar_json[op].otherData ? navbar_json[op].otherData[item].c_name : '';
      otherDatas[itemName] = [];
      if (Array.isArray(data[item])) {
        data[item].forEach((v => {
          detailInfoDeal(otherFields[item], v, otherDatas[itemName]);
        }))
      } else if (typeof data[item] === 'object') {
        detailInfoDeal(otherFields[item], data[item], otherDatas[itemName]);
      } else if (typeof data[item] === 'string') {
        otherDatas[itemName]=data[item];
      }
    });
    return {notSureData, otherDatas}
  })
}

/**
 * 其他详情数据的处理
 * @param otherFields
 * @param otherData
 * @param notSureDetail
 */
function detailInfoDeal(otherFields, otherData, notSureDetail) {
  let NewObj = {};
  let Len = notSureDetail.length;
  for (let item in otherFields) {
    if (!otherData[item]) {
      continue;
    }
    let otherVal = otherData[item];
    if (otherFields[item]['_formatUnixTime']) {
      otherVal = _formatUnixTime(otherVal);
    }
    if (otherFields[item]['unit']) {
      otherVal = `${otherVal}${otherFields[item]['unit']}`
    }
    if (otherFields[item]['withOther']) {
      let withOhter = otherData[otherFields[item]['withOther']];
      if (otherFields[otherFields[item]['withOther']]['unit']) {
        withOhter = `${withOhter}${otherFields[otherFields[item]['withOther']]['unit']}`;
      }
      otherVal = otherVal + withOhter;
    }
    if (otherFields[item]['children']) {
      let children = otherFields[item]['children'];
      if (otherData[item][children]) {
        otherVal = otherData[item][children];
      } else {
        continue;
      }
    }
    if (otherFields[item].title) {
      NewObj[otherFields[item].title] = otherVal;
    }
    notSureDetail[Len] = NewObj;
  }
}

/**
 * 时间格式化
 * @param time
 * @returns {*}
 * @private
 */
function _formatUnixTime(time) {
  if ('Invalid date' === moment.unix(time).format('YYYY-MM-DD HH:mm:ss')) {
    return time;
  } else {
    return moment.unix(time).format('YYYY-MM-DD HH:mm:ss');
  }
}

/**
 * 天数+小时数的合计
 * @param data
 * @param field
 * @returns {string}
 * @private
 */
function _DayHourCalc(data, field) {
  let res = '';
  for (let item in field) {
    if (!data[item] || '0' === data[item]) {
      continue;
    }
    if (field[item]['unit']) {
      res += `${data[item]}${field[item]['unit']}`
    } else {
      res += `${data[item]}`
    }
  }
  return res;
}

/**
 * 额外信息的获取
 * @param op
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
function getMoreInfo(op) {
  return getCreateApply(op).then(res => {
    return Promise.resolve(res);
  })
}

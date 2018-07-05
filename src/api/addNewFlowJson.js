import moment from 'moment';
import {getCreateApply} from '@/api/get';

const DataFields = {
  jb: {
    title: '加班单',
    data: {
      jb_startdate: {
        title: '开始时间',
        type: 'timestamp'
      },
      jb_enddate: {
        title: '结束时间',
        type: 'timestamp'
      },
      jb_detail: {
        title: '加班理由',
        type: 'textarea'
      }
    },
    fromData: {
      jb_hours: {
        title: '加班时长',
        from: ['jb_startdate','jb_enddate'],
        fun: 'totalTime'
      }
    }
  }
}

const getFields = (op) => {
  getMoreInfo(op).then(res=>{

  });
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

export default getFields;

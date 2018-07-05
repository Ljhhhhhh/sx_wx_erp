import myAxios from './axios.config'

/**
 * 获取公告列表
 * @param {*} page //当前页
 * @param {*} pagesize //每页显示条数
 */
export function getNews(page = 1, pageSize = 5, readtype = 2) {
  return myAxios.get('/indexnotices', {
    params: {
      page,
      pageSize,
      readtype
    }
  }).then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 获取公告详情
 * @param {*} 消息id
 */
export function getNoticeDetail(id) {
  return myAxios.get(`/indexnotices/${id}`).then(res => {
    return Promise.resolve(res);
  })
}

/**
 * 获取用户自定义菜单
 */
export function getUserMenu() {
  return myAxios.get('/homemodules').then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 获取待办
 */
export function getBacklog(prefix = '') {
  let params={};
  if(prefix){
    params={
      prefix
    }
  }
    return myAxios.get('/waittodos',{
      params
    }).then((res) => {
      return Promise.resolve(res);
    })
}

/**
 * 获取已办
 */
export function getDoneWork(op='') {
  let params={},url='/undotoeds';
  if(op){
    url+='/create';
    params={
      op
    }
  }
  console.log(params);
  return myAxios.get(url,{
    params
  }).then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 获取联系方式
 * @param {根据姓名查找联系方式} name
 */
export function getContactBook(name = '') {
  let params = {};
  if (name) {
    params = {
      name
    }
  }
  return myAxios.get('/addressbooks', {
    params
  }).then((res) => {
    return Promise.resolve(res);
  })
}

export function getContactBookByDepartment() {
  return myAxios.get('/Addressbookdepts').then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 获取消息
 * @param {*} page
 */
export function getMessages(page = 1) {
  return myAxios.get('/taskinfo', {
    params: {
      page
    }
  }).then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 获取navbars
 */
export function getNavbars() {
  return myAxios.get('/navbars').then(res => {
    return Promise.resolve(res);
  })
}

/**
 * 获取所有可用快捷方式
 * @returns {Promise<any>}
 */
export function getAllShortcut() {
  return myAxios.get('/commonmenus').then(res => {
    return Promise.resolve(res);
  })
}

/**
 * 通用申请列表
 * @param op
 */
export function getApplyList(op, page = 1, pageSize = 10) {
  return myAxios.get(`/applylists/${op}`, {
    params: {
      page,
      pageSize
    }
  }).then(res => {
    return Promise.resolve(res);
  })
}

/**
 * 申请详情
 * @param op
 * @param id
 * @returns {Promise<any>}
 */
export function getApplyDetail(op,id) {
  return myAxios.get(`/details/${op}/${id}`).then(res=>{
    return Promise.resolve(res);
  })
}

/**
 * 获取额外数据
 * @param op
 * @returns {Promise<any>}
 */
export function getCreateApply(op) {
  return myAxios.get(`/createapplys/${op}`).then(res=>{
    return Promise.resolve(res);
  })
}

/**
 * 获取工资条
 * @param id
 * @returns {Promise<any>}
 */
export function getSalarys(id='') {
  let url='/salarys';
  if(id){
    url+='/'+id;
  }
  return myAxios.get(url).then(res=>{
    return Promise.resolve(res);
  })
}

/**
 * 获取会议详情
 * @param id
 * @returns {Promise<any>}
 */
export function getMeetingDetail(uid, id) {
  return myAxios.get(`/meetings/${id}?uid=${uid}`).then(res => {
    return Promise.resolve(res);
  })
}

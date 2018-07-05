import myAxios from './axios.config'

/**
 * 更新公告状态
 */
export function updateNoticeStatus(id) {
  return myAxios.put(`/indexnotices/${id}`).then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 点击消息已读
 */
export function hasReadMsg(id) {
  return myAxios.put('/taskinfo/' + id).then((res) => {
    return Promise.resolve(res);
  })
}

/**
 * 设置用户定义的快捷方式
 * @constructor
 */
export function SetUserShortcut(userId,shortcurIds) {
  return myAxios.put(`/commonmenus/${userId}`,{
    moduleids:shortcurIds
  }).then(res=>{
    return Promise.resolve(res);
  })
}

/**
 * 取回
 * @param op
 * @param id
 * @returns {Promise<any>}
 */
export function takeback(op,id) {
  return myAxios.put(`/takebacks/${id}`,{
    op
  }).then(res=>{
    return Promise.resolve((res));
  })
}

/**
 * 待办驳回
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export function checkReject(id,data) {
  const params = {name:name}=data;
  return myAxios.put(`/undotos/${id}`,params).then(res=>{
    return Promise.resolve(res);
  })
}

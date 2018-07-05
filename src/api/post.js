import myAxios from './axios.config'

/**
 * 登录
 */
export function getUserInfo(username,password){
    return myAxios.post('/index/login/login',{
      username,
      password,
      clientType:2
  }).then((res)=>{
      return Promise.resolve(res);
  })
}

/**
 * 审核通过
 * @param data
 */
export function checkPass(data) {
  const params={name:name}=data;
  return myAxios.post('/details',params).then(res=>{
    return Promise.resolve(res);
  })
}

/**
 * 会议签到
 * @param data
 */
export function checkMeetings (data) {
  return myAxios.post('/meetings',data).then(res => {
    return Promise.resolve(res);
  })
}

/**
 * 打卡
 * @param data
 */
export function checkPunch(data, token) {
  return myAxios.post('/dakas?token='+ token, data).then(res => {
    return Promise.resolve(res);
  })
}
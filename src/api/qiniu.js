import request from '@/utils/request'

//获取信息列表
export function postinsurancelist(data) {
  return request({
    url: '/insurance/pagelist', // 
    method: 'post',
    data
  })
}

//添加保单
export function postinsuranceadd(data) {
  return request({
    url: '/insurance/add', // 
    method: 'post',
    data
  })
}


export function deleteinsurancelist(id) {
  return request({
    url: `/insurance/delete/${id}`, // 
    method: 'delete',
  })
}


export function putinsurancelist(data) {
  return request({
    url: '/insurance/edit', // 
    method: 'put',
    data
  })
}


// export function putinsurancelist(data) {
//   return request({
//     url: '/insurance/uploadexcl', // 
//     method: 'put',
//     data
//   })
// }
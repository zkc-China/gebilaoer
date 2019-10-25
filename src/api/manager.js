import request from '@/utils/request'

// 获取工作人员列表
export function postmanagerlist(data) {
  return request({
    url: '/manager/postlist',
    method: 'post',
    data
  })
}

// 添加用户
export function postmanagerAdd(data) {
  return request({
    url: '/manager/add',
    method: 'post',
    data
  })
}

// 删除用户
export function postmanagerDelete(data) {
  return request({
    url: '/manager/delete',
    method: 'post',
    data
  })
}

// 修改用户信息
export function postmanagerChange(data) {
  return request({
    url: '/manager/change',
    method: 'post',
    data
  })
}


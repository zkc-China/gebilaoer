import request from '@/utils/request'

// 添加用户
export function postmanagerlist(data) {
  return request({
    url: '/person/postlist',
    method: 'post',
    data
  })
}

// 添加用户
export function postmanagerAdd(data) {
  return request({
    url: '/person/add',
    method: 'post',
    data
  })
}

// 删除用户
export function postmanagerDelete(data) {
  return request({
    url: '/person/delete',
    method: 'post',
    data
  })
}

// 修改用户信息
export function postmanagerChange(data) {
  return request({
    url: '/person/change',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getmanagerinfo(id) {
  return request({
    url: '/person/info',
    method: 'get',
    params: { id }
  })
}

// 获取用户所有记录
export function getmanagerlist(name) {
  return request({
    url: '/person/name',
    method: 'get',
    params: { name }
  })
}


import request from '@/utils/request'

export function getvisualinfo(id) {
  return request({
    url: '/visual/info',
    method: 'get',
    params:{id}
  })
}

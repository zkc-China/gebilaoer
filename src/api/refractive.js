import request from '@/utils/request'

export function getrefracitiveinfo(id) {
  return request({
    url: '/refractive/info',//refractive
    method: 'get',
    params:{id}
  })
}

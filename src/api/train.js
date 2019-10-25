import request from '@/utils/request'

export function getraininfo(id) {
  return request({
    url: '/train/info',
    method: 'get',
    params:{id}
  })
}

import http from '@/utils/request'

export function demo(params) {
  return http({url: '/demo', method: 'post', data: params})
}

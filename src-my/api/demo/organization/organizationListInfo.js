import request from '@/plugin/axios'

export function organizationListInfoData (data) {
   return request({
    url: '/demo/organization',
    // url: 'http://localhost:3000/users',
    method: 'get',
    data
  })
}
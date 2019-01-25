import request from '@/plugin/axios'

export function ShowTablesInfoData (data) {
   return request({
    url: '/demo/page4',
    // url: 'http://localhost:3000/users',
    method: 'get',
    data
  })
}
import request from '@/plugin/axios'

export function ShowTablesInfoData (data) {
   return request({
    url: '/demo/page4',
    method: 'get',
    data
  })
}
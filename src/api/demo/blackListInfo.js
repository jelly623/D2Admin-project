import request from '@/plugin/axios'

export function FindBlackList () {
   return request({
    url: 'http://localhost:3000/users',
    method: 'get'
  })
}
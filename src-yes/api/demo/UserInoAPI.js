import request from '@/plugin/axios'

export function FindUserList () {
   return request({
    url: 'http://jsonplaceholder.typicode.com/users',
    method: 'get'
  })
}

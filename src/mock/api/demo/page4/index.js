import Mock from 'mockjs'

const tablesInfo = [
    {
        id: 1,
        name: '王小虎',
        telephone: '111',
        description: 'wangxiaohu@aisino.com',
        time: '2018-12-21',
        person: '陈伟霆', 
        forbidEdit: false,
        showEditButton: true,
        forbidRemove: false,
        showRemoveButton: true                     
        },
        {
        id: 2,
        name: '吴伟',
        telephone: '222',
        description: 'wuwei@aisino.com',
        time: '2018-12-21',
        person: '陈伟霆', 
        forbidEdit: false,
        showEditButton: true,
        forbidRemove: false,
        showRemoveButton: true      
        },
        {
        id: 3,
        name: '王艳',
        telephone: '333',
        description: 'wangyan@aisino.com',
        time: '2018-12-21',
        person: '陈伟霆',  
        forbidEdit: false,
        showEditButton: true,
        forbidRemove: false,
        showRemoveButton: true     
        },
        {
        id: 4,  
        name: '雷梦',
        telephone: '444',
        description: 'leimeng@aisino.com',
        time: '2018-12-21',
        person: '陈伟霆', 
        forbidEdit: false,
        showEditButton: true,
        forbidRemove: false,
        showRemoveButton: true      
        },
        {
        id: 5,  
        name: '雷梦',
        telephone: '444',
        description: 'leimeng@aisino.com',
        time: '2018-12-21',
        person: '刘伟霆', 
        forbidEdit: false,
        showEditButton: true,
        forbidRemove: false,
        showRemoveButton: true      
        }    
]

Mock.mock('/api/demo/page4', 'get', ({ url, type, body }) => {
    const bodyObj = JSON.parse(body)
      return {
        code: 0,
        msg: '登录成功',
        data: tablesInfo
      }
  })
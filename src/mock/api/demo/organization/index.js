import Mock from 'mockjs'

const  eventCategoryTree = 
            [
                {    
                        id: 1,
                        icon:'el-icon-success',
                        label: '航天信息股份有限公司',
                        type:'公司',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'航天信息股份有限公司',
                        addAble: true,  //根据后台给的是否可添加节点，也可以根据当前的node节点自行判断
                        delAble: false,  //根据后台给的是否可删除节点，也可以根据当前的node节点自行判断
                        parentId: '0',             
                        children: [{
                        id: 4,
                        label: '总部',
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        children: [{
                            id: 10,
                            label: '总部呼叫中心',
                            type:'部门',
                            callcenter:'是',
                            code:'37,38,39,40',
                            desc:'总部呼叫中心',                    
                            addAble: true,
                            delAble: true,
                            parentId: '4',
                            },
                            {
                            id: 11,
                            label: '总部财务软件',
                            type:'部门',
                            callcenter:'否',
                            code:'37,38,39,40',
                            desc:'总部财务软件',                   
                            addAble: true,
                            delAble: true,
                            parentId: '4',
                            },
                            {
                            id: 12,
                            label: '总部防伪税控',
                            type:'部门',
                            callcenter:'否',
                            code:'37,38,39,40',
                            desc:'总部防伪税控', 
                            addAble: true,
                            delAble: true,
                            parentId: '4',
                            },]
                        },{
                        id: 5,
                        label: '金税产业本部',
                        type:'部门',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'金税产业本部',                   
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        }, {
                        id: 6,
                        label: '北爱',
                        type:'部门',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'北爱',                   
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        },{
                        id: 7,
                        label: '技术研究院',
                        type:'部门',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'技术研究院',                   
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        },{
                        id: 8,
                        label: '大象慧云',
                        type:'部门',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'大象慧云',                  
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        },{
                        id: 9,
                        label: '金税',
                        type:'部门',
                        callcenter:'否',
                        code:'37,38,39,40',
                        desc:'金税',                   
                        addAble: true,
                        delAble: true,
                        parentId: '1',
                        },]
                    }]

Mock.mock('/api/demo/organization', 'get', ({ url, type, body }) => {
    const bodyObj = JSON.parse(body)
      return {
        code: 0,
        msg: '登录成功',
        data: eventCategoryTree
      }
  })                
// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '演示页面',
    icon: 'folder-o',
    children: [
      { path: '/demo/page1', title: '页面 1' },
      { path: '/demo/page2', title: '页面 2' },
      { path: '/demo/page3', title: '页面 3' },      
      { path: '/demo/page4', title: '页面 4' },
      { path: '/demo/scheduling', title: '定时调度' },
      { path: '/demo/blacklist', title: '黑名单管理' },
      { path: '/demo/organization', title: '机构管理' },
      { path: '/demo/test', title: '测试' },

    ]
  },
  {
    title: 'Task',
    icon: 'folder-o',
    children: [
      { path: '/task/scheduling', title: '定时调度' },
      { path: '/task/page1', title: '页面 1' },
      { path: '/task/page2', title: '页面 2' }, 
    ]
  }  
]

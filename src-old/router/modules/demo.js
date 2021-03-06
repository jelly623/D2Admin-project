import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/demo',
  name: 'demo',
  meta,
  redirect: { name: 'demo-page1' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'page1', name: `${pre}page1`, component: () => import('@/pages/demo/page1'), meta: { meta, title: '页面 1' } },
    { path: 'page2', name: `${pre}page2`, component: () => import('@/pages/demo/page2'), meta: { meta, title: '页面 2' } },
    { path: 'page3', name: `${pre}page3`, component: () => import('@/pages/demo/page3'), meta: { meta, title: '页面 3' } },
    { path: 'blacklist', name: `${pre}blacklist`, component: () => import('@/pages/demo/blacklist'), meta: { meta, title: '黑名单管理' } },
    { path: 'organization', name: `${pre}organization`, component: () => import('@/pages/demo/organization'), meta: { meta, title: '机构管理' } },
    { path: 'test', name: `${pre}organization`, component: () => import('@/pages/demo/test'), meta: { meta, title: '测试' } },
    { path: 'page4', name: `${pre}page4`, component: () => import('@/pages/demo/page4'), meta: { meta, title: '页面 4' } },
    { path: 'scheduling', name: `${pre}scheduling`, component: () => import('@/pages/demo/scheduling'), meta: { meta, title: '定时调度' } },

  ])('demo-')
}

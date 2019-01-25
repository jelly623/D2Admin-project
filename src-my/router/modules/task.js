import layoutHeaderAside from '@/layout/header-aside'

const meta = { requiresAuth: true }

export default {
  path: '/task',
  name: 'task',
  meta,
  redirect: { name: 'task-scheduling' },
  component: layoutHeaderAside,
  children: (pre => [
    { path: 'scheduling', name: `${pre}scheduling`, component: () => import('@/pages/task/scheduling'), meta: { meta, title: '定时调度' } },
    { path: 'page1', name: `${pre}page1`, component: () => import('@/pages/task/page1'), meta: { meta, title: '页面 1' } },
    { path: 'page2', name: `${pre}page2`, component: () => import('@/pages/task/page2'), meta: { meta, title: '页面 2' } },

  ])('task-')
}

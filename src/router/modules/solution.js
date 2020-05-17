/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const soulutionRouter = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'News',
  children: [
    {
      path: '/Page/edit',
      component: () => import('@/views/Page/edit'),
      name: 'PageDesigner',
      meta: { title: '微页面设计' }
    }
    // {
    //   path: '/goods/brand/list',
    //   component: () => import('@/views/goods/brand/list'),
    //   name: 'brandList',
    //   meta: { title: 'brandList' }
    // },
    // {
    //   path: 'attachment/list',
    //   component: () => import('@/views/attachment/list'),
    //   name: 'attachmentList',
    //   meta: { title: 'attachmentList' }
    // },
    // {
    //   path: '/goods/category/list',
    //   component: () => import('@/views/goods/category/list'),
    //   name: 'categoryList',
    //   meta: { title: 'categoryList' }
    // }
    // /* {
    //   path: 'news/list',
    //   component: () => import('@/views/news/list'),
    //   name: 'NewsList',
    //   meta: { title: 'newsList' }
    // },
    // {
    //   path: '/news/edit',
    //   component: () => import('@/views/news/edit'),
    //   name: 'NewsEdit',
    //   meta: { title: '新闻详情' },
    //   hidden: true
    // },
    // // {
    // //   path: 'goods/list',
    // //   component: () => import('@/views/goods/list'),
    // //   name: 'GoodsList',
    // //   meta: { title: 'goodsList' }
    // // },
    // {
    //   path: '/goods/edit',
    //   component: () => import('@/views/goods/edit'),
    //   name: 'GoodsEdit',
    //   meta: { title: '产品添加' },
    //   hidden: true
    // },
    // {
    //   path: 'order/list',
    //   component: () => import('@/views/order/list'),
    //   name: 'OrderList',
    //   meta: { title: 'orderList' }
    // },
    // {
    //   path: 'fareTemplate/list',
    //   component: () => import('@/views/fareTemplate/list'),
    //   name: 'freightList',
    //   meta: { title: 'fareTemplate' }
    // },
    // {
    //   path: '/fareTemplate/edit',
    //   component: () => import('@/views/fareTemplate/edit'),
    //   name: 'FreightEdit',
    //   meta: { title: '运费模板添加' },
    //   hidden: true
    // },*/
  ]
}
export default soulutionRouter

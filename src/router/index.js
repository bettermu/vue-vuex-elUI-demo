import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Login from '@/components/login'
import Regin from '@/components/regin'
import Products from '@/components/page/products'
import ProductList from '@/components/page/product/productlist'
import ProductContent from '@/components/page/product/productcontent'
import FAQ from '@/components/page/FAQ'
import Manager from '@/components/page/manager'
import My from '@/components/page/manager/my'
import Send from '@/components/page/manager/send'
import MyHistory from '@/components/page/manager/history'
import Page404 from '@/components/404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      hidden:true,
      component: Home
    },
    {
      path: '/login',
      name: '',
      hidden: true,    //是否渲染该路由入口  默认false为渲染  true则为隐藏
      component: Login
    },
    {
      path: '/regin',
      name: '',
      hidden: true,
      component: Regin
    },
    {
      path: '/products',
      name: '商品',
      class:'el-icon-goods',  //小图标配置
      component: Products,
      redirect:'/product/all',
      children:[
        {
          path:'/product/:class',
          component:ProductList
        }
      ]
    },
    //商品详情
    {
      path:'/product/:class/:productname',
      hidden:true,
      component:ProductContent
    },
    {
      path: '/FAQ',
      name: '使用文档',
      class:'el-icon-tickets',
      component: FAQ
    },
    {
      path: '/manager',
      name: '我的工作台',
      redirect: '/manager/my',
      component: Manager,
      hasChild: true,
      children: [
        { path: '/manager/my', name: '我的信息', component: My },
        { path: '/manager/send', name: '发货管理', component: Send },
        { path: '/manager/history', name: '发货记录', component: MyHistory }
      ]
    },
    {
      path: '*',
      hidden: true,
      component: Page404
    }
  ]
})

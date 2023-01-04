import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首頁', icon: 'home'}
    }]
  }
]

export const asyncRouterMap = [

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/sales',
    name: 'dashboard',
    meta: {title: '統計', icon: 'chart'},
    children: [
      {
        path: 'sales',
        name: 'sales',
        component: () => import('@/views/dashboard/sales/index'),
        meta: {title: '銷售', icon: 'machine'}
      },
      {
        path: 'event',
        name: 'event',
        component: () => import('@/views/dashboard/event/index'),
        meta: {title: '事件', icon: 'chart'},
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('@/views/dashboard/inventory/index'),
        meta: {title: '存貨', icon: 'chart'},
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/organization',
    name: 'oms',
    meta: {title: '組織', icon: 'org'},
    children: [
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/oms/company/index'),
        meta: {title: '公司列表', icon: 'org'}
      },
      {
        path: 'addCompany',
        name: 'addCompany',
        component: () => import('@/views/oms/company/add'),
        meta: {title: '新增公司'},
        hidden: true
      },
      {
        path: 'updateCompany',
        name: 'updateCompany',
        component: () => import('@/views/oms/company/update'),
        meta: {title: '修改公司'},
        hidden: true
      },
      {
        path: 'organization',
        name: 'organization',
        component: () => import('@/views/oms/organization/index'),
        meta: {title: '組織列表', icon: 'org'}
      },
      {
        path: 'addOrganization',
        name: 'addOrganization',
        component: () => import('@/views/oms/organization/add'),
        meta: {title: '新增組織'},
        hidden: true
      },
      {
        path: 'updateOrganization',
        name: 'updateOrganization',
        component: () => import('@/views/oms/organization/update'),
        meta: {title: '修改組織'},
        hidden: true
      }
    ]
  },
  {
    path: '/dms',
    component: Layout,
    redirect: '/dms/device',
    name: 'dms',
    meta: {title: '設備', icon: 'machine'},
    children: [
      {
        path: 'device',
        name: 'device',
        component: () => import('@/views/dms/device/index'),
        meta: {title: '設備列表', icon: 'device-list'}
      },
      {
        path: 'deviceCate',
        name: 'deviceCate',
        component: () => import('@/views/dms/deviceCate/index'),
        meta: {title: '設備類型', icon: 'device-cate'}
      },
      {
        path: 'addDevice',
        name: 'addDevice',
        component: () => import('@/views/dms/device/add'),
        meta: {title: '新增設備'},
        hidden: true
      },
      {
        path: 'updateDevice',
        name: 'updateDevice',
        component: () => import('@/views/dms/device/update'),
        meta: {title: '修改設備'},
        hidden: true
      }

    ]
  },
  {
    path: '/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '權限', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户列表', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色列表', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配選單'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配資源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '選單列表', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '新增選單'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改選單'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '資源列表', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '資源分類'},
        hidden: true
      }
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/operate',
    name: 'pms',
    meta: {title: '個人', icon: 'ums'},
    children: [
      {
        path: 'operate',
        name: 'operate',
        component: () => import('@/views/pms/operate/index'),
        meta: {title: '歷史列表', icon: 'ums-admin'}
      },
      {
        path: 'pwd',
        name: 'pwd',
        component: () => import('@/views/pms/pwd/index'),
        meta: {title: '變更密碼', icon: 'ums-admin'}
      },
    ]
  },

  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可開
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})


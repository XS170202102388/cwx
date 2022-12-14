import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import StudentList from '@/views/studentList.vue'
import Cart from '@/views/cart/Cart.vue'
import Cartopen from '@/views/cart/Cartopen.vue'
import User from '@/views/user1/User.vue'
import Role from '@/views/role/Role.vue'
import Menu from '@/views/menu/Menu.vue'
import Tenant from '@/views/tenant/Tenant.vue'


Vue.use(Router)
// let StudentList = () => import('../views/studentList.vue')
// let Home = () => import('../views/Home.vue')


const router = new Router({
  mode:'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      component: Home
    },
    {
      path: '/studentList',
      component: StudentList
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/cart/cartopen',
      component: Cartopen
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/role',
      component: Role
    },
    {
      path: '/menu',
      component: Menu
    },
    {
      path: '/tenant',
      component: Tenant
    }
  ]
})
// // /*
// //  * @Author      : YaleXin
// //  * @Email       : me@yalexin.top
// //  * @LastEditors : YaleXin
// //  */
// // import Vue from 'vue'
// // import VueRouter from 'vue-router'
// // Vue.use(VueRouter)
// // let Home = () => import('../views/Home.vue')
// // // let Category = () => import('../views/Category.vue')
// // // let Tag = () => import('../views/Tag.vue')
// // // let Link = () => import('../views/Link.vue')
// // // let Talk = () => import('../views/Talk.vue')
// // // let Article = () => import('../views/Article.vue')
// // // let Search = () => import('../views/Search.vue')
// // // let Admin = () => import('../views/Admin.vue')
// // // let Archive = () => import('../views/Archive.vue')

// // // 后台相关组件
// // // let AdminLogin = () => import('../views/admin/Login.vue')
// // // let AdminIndex = () => import('../views/admin/Index.vue')  // 展示所有博客
// // // let AdminBlog = () => import('../views/admin/Article.vue')  // 修改谋篇博客
// // // let AdminCategory = () => import('../views/admin/Category.vue')
// // // let AdminTag = () => import('../views/admin/Tag.vue')
// // // let AdminComment = () => import('../views/admin/Comment.vue')
// // // let AdminUser = () => import('../views/admin/User.vue')

// // // 后台路由
// // const adminRoute = [
// //   {
// //     path: '',
// //     redirect: 'index',
// //   },
// //   {
// //     path: 'index',
// //     component: AdminIndex
// //   },
// //   {
// //     path: 'login',
// //     component: AdminLogin
// //   },
// //   {
// //     path: 'category',
// //     component: AdminCategory
// //   },
// //   {
// //     path: 'tag',
// //     component: AdminTag
// //   },
// //   {
// //     path: 'comment',
// //     component: AdminComment
// //   },
// //   {
// //     path: 'user',
// //     component: AdminUser
// //   },
// //   {
// //     path: 'blog/:id',
// //     component: AdminBlog
// //   }
// // ];
// // const routes = [
// //   {
// //     path: '',
// //     redirect: '/home',
// //   },
// //   {
// //     path: '/home',
// //     component: Home,
// //   },
// //   // {
// //   //   path: '/category/:id',
// //   //   component: Category,
// //   // },
// //   // {
// //   //   path: '/tag/:id',
// //   //   component: Tag,
// //   // },
// //   // {
// //   //   path: '/link',
// //   //   component: Link,
// //   // },
// //   // {
// //   //   path: '/talk',
// //   //   component: Talk,
// //   // },
// //   // {
// //   //   path: '/blog/:id',
// //   //   component: Article,
// //   // },
// //   // {
// //   //   path: '/search',
// //   //   component: Search,
// //   // },
// //   // {
// //   //   path: '/admin',
// //   //   component: Admin,
// //   //   children: adminRoute
// //   // },
  
// //   // {
// //   //   path: '/archive',
// //   //   component: Archive,
// //   // },
// // ]

// // const router = new VueRouter({
// //   routes,
// //   mode: 'hash',
// //   // base: process.env.BASE_URL,
// // })

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import ShowMessage from "@/views/news/showmessage.vue";
import StaffInfo from "@/views/staff/info.vue"; // 引入 StaffInfo 组件

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/index' // 将根路径重定向到 /index
    },
    {
        path: '/index',
        name: 'index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/login.vue')
    },
    {
        path: "/news/showMessage",
        name: "showMessage",
        component: ShowMessage,
    },
    {
        path: '/staff/login',
        name: 'Staff',
        component: () => import('@/views/staff/staff.vue')
    },
    {
        path: '/staff',
        name: 'StaffMain',
        component: () => import('../views/staff/staffMain.vue'),
        redirect: '/staff/info', // 默认重定向到 StaffInfo
        children: [
            {
                path: 'info',
                name: 'StaffInfo',
                component: StaffInfo // 直接使用引入的组件
            },
            {
                path: 'iTunes',
                name: 'StaffITunes',
                component: () => import('../views/staff/iTunes.vue')
            },
            {
                path: 'log',
                name: 'Log',
                component: () => import('../views/log/log.vue')
            },
            {
                path: 'staffList',
                name: 'StaffList',
                component: () => import('../views/staff/staffList.vue')
            },
            {
                path: 'pstate',
                name: 'pstate',
                component: () => import('../views/staff/pstate.vue')
            },
            {
                path: 'bumen',
                name: 'bumen',
                component: () => import('../views/staff/bumen.vue')
            },
            {
                path: 'bState',
                name: 'bState',
                component: () => import('../views/staff/bState.vue')
            },
            {
                path: 'ChaK',
                name: 'ChaK',
                component: () => import('../views/staff/ChaK.vue')
            },
            {
                path: 'kState',
                name: 'kState',
                component: () => import('../views/staff/kState.vue')
            },
            {
                path: 'pricing',
                name: 'pricing',
                component: () => import('../views/staff/pricing.vue')
            },
            {
                path: 'YK',
                name: 'YK',
                component: () => import('../views/staff/YK.vue')
            },
            {
                path: 'CMessage',
                name: 'CMessage',
                component: () => import('../views/staff/CMessage.vue')
            },
            {
                path: 'addJournal',
                name: 'addJournal',
                component: () => import('../views/staff/addJournalism.vue')
            },
            {
                path: 'dictManagement',
                name: 'dictManagement',
                component: () => import('../views/staff/DictManagement.vue')
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router

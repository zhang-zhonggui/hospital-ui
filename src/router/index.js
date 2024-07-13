import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import ShowMessage from "@/views/news/showmessage.vue";

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
        redirect: '/staff/info',
        children: [

            {
                path: 'info',
                name: 'StaffInfo',
                component: () => import('../views/staff/info.vue')
            },
        ]
    },

    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/login.vue')
    }
]
const router = new VueRouter({
    mode: 'history', // 使用 history 模式
    routes
})

export default router

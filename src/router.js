import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

import Register from '@/pages/Register.vue'
import Login from '@/pages/Login.vue'
import Homepage from '@/pages/Home.vue'
import TemplateD from '@/components/directory/TemplateDirectory.vue'
import IndexDirectory from '@/components/directory/index.vue'
import ShowDirectory from '@/components/directory/Show.vue'


const routes = [
    {
        path:'/' , name:'home',component:Homepage, meta: {
            requiresAuth: true
          }
    },
    {
      path:'/register' , name:'register',component:Register
  },
    {
        path:'/login' , name:'login',component:Login
    },
  {
    path: '/directory', name: 'directory', component: TemplateD, meta: {
      requiresAuth: true
    }, children: [
      {
        path: '', name: 'directory', component: IndexDirectory },
        {
          path: ':name/:id', name: 'showDirectory', component: ShowDirectory,
        },

    
    ]    
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {

    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  // const isAuthenticated = localStorage.getItem('access_token')
  const isLogin = localStorage.getItem('isLogin')
  
  if (requiresAuth && !isLogin) {
    if (isLogin === 'false') {
      next({ name: 'login' })
      }
      next({ name: 'login' })
    } else {
      next()
    }
  })


  


export default router
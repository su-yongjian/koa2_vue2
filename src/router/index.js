import axios from 'axios'
import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test'
import home from '@/components/home/home'
import Register from '@/components/pages/Register'
// import baseUrl from '@/serviceAPI.comfig.js'
//不是基于Vue的插件，如果想绑定到Vue上面
Vue.prototype.$axios = axios
// axios.defaults.baseURL = "http://39.108.135.214:8899/"
//在跨域的时候，允许访问服务器带上cookies
// axios.defaults.withCredentials = true
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/index.vue'

const routes = [
  { path: '/', component: Home },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})

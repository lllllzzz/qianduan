// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ResumeEditor from '../views/ResumeEditor.vue'
import ResumeShow from '../views/ResumeShow.vue'

const routes = [
  {
    path: '/',
    name: 'ResumeEditor',
    component: ResumeEditor
  },
  {
    path: '/resume',
    name: 'ResumeShow',
    component: ResumeShow
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

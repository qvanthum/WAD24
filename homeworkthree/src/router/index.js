import { createRouter, createWebHashHistory } from 'vue-router';
import postsComponent from '../components/postsComponent.vue';
import signupComponent from '@/components/signupComponent.vue';


const routes = [
  {
    path: '/', component: postsComponent
  },
  
  {
    path: '/signup', component: signupComponent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

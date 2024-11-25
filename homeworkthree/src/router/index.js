import { createRouter, createWebHashHistory } from 'vue-router';
import postsComponent from '../components/postsComponent.vue';


const routes = [
  {
    path: '/', component: postsComponent
  },
  /*
  {
    path: '/signup', component: signupComponent
  }*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router';
import postsComponent from '../components/postsComponent.vue';
import signupComponent from '../components/signupComponent.vue';
import loginComponent from '@/components/loginComponent.vue';
import auth from "../auth";


const routes = [
  
  {
    path: '/', component: postsComponent,
    beforeEnter: async(to, from, next) => {
      let authResult = await auth.authenticated();
      if (!authResult) {
          next('/login')
      } else {
          next();
      }
  }
  },
  
  {
    path: '/signup', component: signupComponent
  },
  {
    path: '/login', component: loginComponent,
    
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

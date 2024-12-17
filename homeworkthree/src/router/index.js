import { createRouter, createWebHashHistory } from 'vue-router';
import postsComponent from '../components/postsComponent.vue';
import signupComponent from '../components/signupComponent.vue';
import loginComponent from '@/components/loginComponent.vue';
import contactComponent from '../components/contactComponent.vue';
import addPostComponent from '@/components/addPostComponent.vue';
import auth from "../auth";

const checkAuth = async (_to, _from, next) => {
  let authResult = await auth.authenticated();
  if (!authResult) {
      next('/login')
  } else {
      next();
  }
};

const routes = [
  {
    path: '/', component: postsComponent,
    beforeEnter: checkAuth,
  },
  {
    path: '/addPost', component: addPostComponent,
    beforeEnter: checkAuth,
  },
  {
    path: '/signup', component: signupComponent
  },
  {
    path: '/login', component: loginComponent
  },
  {
    path: '/contacts', component: contactComponent
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

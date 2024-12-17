import { createRouter, createWebHashHistory } from 'vue-router';
import postsComponent from '../components/postsComponent.vue';
import signupComponent from '../components/signupComponent.vue';
import loginComponent from '@/components/loginComponent.vue';
import contactComponent from '../components/contactComponent.vue';
import addPostComponent from '@/components/addPostComponent.vue';
import postView from '@/views/PostView.vue';
import auth from "../auth";
import store from '../store/index'

async function checkAuth() {
  const authResult = await auth.authenticated()
  return authResult
}

const ensurePostsLoaded = async () => {
  if (!store.state.posts || store.state.posts.length === 0) {
    try {
      const response = await fetch('http://localhost:3000/post/list', { credentials: 'include' });
      const data = await response.json();
      store.commit('setPosts', data);
    } catch (e) {
      console.error(e);
    }
  }
}

const routes = [
  {
    path: '/', component: postsComponent,
    beforeEnter: async (to, from, next) => {
      const authResult = await checkAuth()
      if (!authResult) {
        return next('/login')
      }

      await ensurePostsLoaded()

      next();
    }
  },
  {
    path: '/addPost', component: addPostComponent,
    beforeEnter: checkAuth,
  },
  {
    path: '/post/:id',
    component: postView,
    props: true,
    beforeEnter: async (to, from, next) => {
      const authResult = await checkAuth()
      if (!authResult) {
        return next('/login')
      }

      await ensurePostsLoaded()

      next();
    }
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

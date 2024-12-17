import { createStore } from 'vuex';

const store = createStore({
  state: {
    posts: [],
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.likes++;
      }
    },
    deletePosts(state) {
      state.posts = [];
    },
    updatePost(state, postId, text) {
      const index = state.posts.findIndex(p => p.id === postId);
      if (index !== -1) {
        state.posts[index].postText = text;
      }
    },
    deletePost(state, postId) {
      state.posts = state.posts.filter(p => p.id !== postId);
    },
    resetLikes(state) {
      state.posts.forEach((post) => (post.likes = 0));
    },
    setPosts(state, posts) {
      state.posts = posts;
    }
  },
  actions: {
    incrementLikes({ commit }, postId) {
      commit("incrementLikes", postId);
    },
    resetLikes({ commit }) {
      commit("resetLikes");
    },
  },
  getters: {
    posts: (state) => state.posts,
  },
});

export default store;

import { createStore } from 'vuex';

const store = createStore({
  state: {
    posts: [
      {
        "postId": "1-1",
        "userId": 1,
        "authorName": "Alice Johnson",
        "profilePicPath": "/images/profilePicture1.jpg",
        "picturePath": "/images/moon.jpg",
        "postDate": "November 1, 2024",
        "postText": "This is an amazing post! You are cool!",
        "likes": 120
    },
    {
        "postId": "1-2",
        "userId": 1,
        "authorName": "Alice Johnson",
        "profilePicPath": "/images/profilePicture1.jpg",
        "picturePath": "/images/tartu2022.jpg",
        "postDate": "October 25, 2024",
        "postText": "This is an amazing post content. It could be a description of the image or any other text content related to the post.",
        "likes": 95
    },
    {
        "postId": "1-3",
        "userId": 1,
        "authorName": "Alice Johnson",
        "profilePicPath": "/images/profilePicture1.jpg",
        "postDate": "October 22, 2024",
        "postText": "Really awesome book review :)",
        "likes": 78
    },
    {
        "postId": "2-1",
        "userId": 2,
        "authorName": "Bob Smith",
        "profilePicPath": "/images/profilePicture2.jpg",
        "postDate": "October 12, 2024",
        "postText": "Whoa this is another post without image! Amazing",
        "likes": 60
    },
    {
        "postId": "2-2",
        "userId": 2,
        "authorName": "Bob Smith",
        "profilePicPath": "/images/profilePicture2.jpg",
        "picturePath": "/images/man.jpg",
        "postDate": "September 22, 2024",
        "postText": "Hi! How are you!",
        "likes": 150
    },
    {
        "postId": "2-3",
        "userId": 2,
        "authorName": "Bob Smith",
        "profilePicPath": "/images/profilePicture2.jpg",
        "picturePath": "/images/cat.jpg",
        "postDate": "September 21, 2024",
        "postText": "Look how cute my cat is!",
        "likes": 200
    },
    {
        "postId": "3-1",
        "userId": 3,
        "authorName": "Charlie Brown",
        "profilePicPath": "/images/profilePicture3.jpg",
        "picturePath": "/images/rocket.jpg",
        "postDate": "September 3, 2024",
        "postText": "So cool!",
        "likes": 85
    },
    {
        "postId": "3-2",
        "userId": 3,
        "authorName": "Charlie Brown",
        "profilePicPath": "/images/profilePicture3.jpg",
        "postDate": "September 1, 2024",
        "postText": "Wow I can post without a picture.",
        "likes": 50
    },
    {
        "postId": "3-3",
        "userId": 3,
        "authorName": "Charlie Brown",
        "profilePicPath": "/images/profilePicture3.jpg",
        "picturePath": "/images/sky.jpg",
        "postDate": "August, 2024",
        "postText": "Look at the stars!",
        "likes": 120
    },
    {
        "postId": "3-4",
        "userId": 3,
        "authorName": "Charlie Brown",
        "profilePicPath": "/images/profilePicture3.jpg",
        "postDate": "August 7, 2024",
        "postText": "First post, so excited :D",
        "likes": 90
    }
    ],
  },
  mutations: {
    incrementLikes(state, postId) {
      const post = state.posts.find((p) => p.postId === postId);
      if (post) {
        post.likes++;
      }
    },
    resetLikes(state) {
      state.posts.forEach((post) => (post.likes = 0));
    },
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

<template>
    <div class="middle">
        <div class="posts" ref="postsDiv">
        <postComponent
            v-for="(post, index) in posts"
            :key="index"
            :post="post"
            @increment="incrementLikes(post.postId)"
        />
        <button @click="resetAllLikes" class="reset-button">Reset Likes</button>
        </div>
    </div>
  </template>
  
  <script>
  import postComponent from "../components/postComponent.vue";
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: "PostsComponent",
    components: {
      postComponent,
    },
    computed: {
      ...mapGetters(["posts"]),
    },
    methods: {
      ...mapActions(["resetLikes", "incrementLikes"]),
      resetAllLikes() {
        this.resetLikes();
      },
    },
  };
  </script>
  
  <style scoped>
  .middle {
  display: flex;
  justify-content: center; /* Center the content horizontally */
  flex-grow: 1;            /* Let the middle container grow to fill the remaining space */
  margin: 20px;
  order: 2;
}

  .posts {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .reset-button {
    width: 100px;
    padding: 10px;
    background-color: crimson;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }

  .reset-button:hover {
    opacity: 0.8;
  }
  @media(max-width: 800px) {
    .posts {
        width: 100%;
    }
  }
  </style>
  
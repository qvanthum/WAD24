<template>
  <div class="middle">
    <div class="posts" ref="postsDiv">
      <button @click="Logout" class="action-button">Log out</button>
      <postComponent v-for="(post, index) in posts" :key="index" :post="post"
        @increment="incrementLikes(post.postId)" />
      <div class="action-button-group">
        <button @click="addPost" class="action-button">Add Post</button>
        <button @click="deleteAllPosts" class="action-button">Delete All</button>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../auth";
import postComponent from "../components/postComponent.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostsComponent",
  components: {
    postComponent,
  },
  data: function () {
    return {
      posts: [],
      authResult: auth.authenticated()
    }
  },
  computed: {
    ...mapGetters(["posts"]),
  },
  methods: {
    ...mapActions(["resetLikes", "incrementLikes"]),
    deleteAllPosts() {
      this.deletePosts();
    },

    addPost() {
      this.$router.push("/addPost")
    },

    Logout() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include', //  Don't forget to specify this if you need cookies
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log('jwt removed');
          //console.log('jwt removed:' + auth.authenticated());
          this.$router.push("/login");
          location.assign("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error logout");
        });
    },
  },
  mounted() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then(data => this.posts = data)
      .catch(err => console.log(err.message))
  }
};
</script>

<style scoped>
.middle {
  display: flex;
  justify-content: center;
  flex-grow: 1;
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

.action-button-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.action-button {
  width: 100px;
  padding: 10px;
  background-color: crimson;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
}

.action-button:hover {
  opacity: 0.8;
}

@media(max-width: 800px) {
  .posts {
    width: 100%;
  }
}
</style>
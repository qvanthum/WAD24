<template>
    <div class="middle">
        <!-- <postComponent v-if="post" :post="post" @increment="incrementLikes" />
        <p v-else>Post not found</p> -->
        <form @submit.prevent="">
            <div>
                <p>A Post</p>
            </div>
            <div class="form-body">
                <label for="body">Body</label>
                <textarea name="body" id="" :placeholder="post.postText"></textarea>
            </div>
            <div class="action-button-group">
                <button class="action-button">Update</button>
                <button class="action-button">Delete</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "postView",
    components: {},
    computed: {
        ...mapState(["posts"]),
        ...mapGetters(["posts"]),
        post() {
            return this.posts.find((p) => p.id === this.$route.params.id);
        },
    },
    methods: {
        incrementLikes() {
            this.$store.commit("incrementLikes", this.post.id);
        },
    },
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

form {
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.form-body {
    display: flex;
    justify-content: space-between;
    gap: 80px;
}

.action-button-group {
    display: flex;
    justify-content: space-around;
    gap: 35px;
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

</style>
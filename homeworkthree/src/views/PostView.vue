<template>
    <div class="middle">
        <postComponent v-if="post" :post="post" @increment="incrementLikes" />
        <p v-else>Post not found</p>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import postComponent from "@/components/postComponent.vue";

export default {
    name: "postView",
    components: {
        postComponent,
    },
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
</style>
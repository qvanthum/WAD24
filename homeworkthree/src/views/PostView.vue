<template>
    <div class="middle">
        <form @submit.prevent="updatePost">
            <div>
                <p>A Post</p>
            </div>
            <div class="form-body">
                <label for="body">Body</label>
                <textarea name="body" :placeholder="post.postText"></textarea>
            </div>
            <div class="action-button-group">
                <button type="submit" class="action-button">Update</button>
                <button type="button" class="action-button" @click="deletePost">Delete</button>
            </div>
        </form>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
    name: "postView",
    computed: {
        ...mapState(["posts"]),
        ...mapGetters(["posts"]),
        post() {
            return this.posts.find((p) => p.id === this.$route.params.id);
        },
    },
    methods: {
        async updatePost() {
            const updatedBody = this.$el.querySelector('textarea[name="body"]').value;
            await fetch(`http://localhost:3000/post/${this.$route.params.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: updatedBody })
            });

            this.$store.commit('updatePost', this.$route.params.id, updatedBody);
        },

        async deletePost() {
            await fetch(`http://localhost:3000/post/${this.$route.params.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            // this.$store.commit('deletePost', this.$route.params.id);
            this.$router.push('/');
        }
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
<template>
  <div class="post">
    <div class="post-header">
      <img class="profile-img" width="50" height="50" :src="post.profilePicPath" alt="Profile Picture" />
      <span class="post-date">{{ post.postDate }}</span>
    </div>
    <div class="post-image">
        <img
        v-if="post.picturePath"
        :src="post.picturePath"
        alt="Post Image"
        class="post-image"
      />
    </div>
    <p>{{ post.authorName }}</p>
    <div class="post-text">
      <p>{{ post.postText }}</p>
    </div>

    <div class="like-button">
      <button @click="increment">Like</button>
      <span class="like-count">{{ post.likes }} Likes</span>
    </div>
    
    <div class="divider" />
  </div>
</template>

<script>
export default {
  name: "postComponent",
  props: {
    post: {
      type: Object,
      required: true,
    },
    
  },
  methods: {
    increment() {
      this.$emit("increment");
    },
  },
};
</script>

<style scoped>

.post {
    width: 100%;
    max-width: 500px;
    margin: 20px auto;
    border-radius: 10px;
    padding: 10px;
    background-color: #bfbfbf;
}

.post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.post-date {
    font-size: 0.9rem;
    color: #666;
}

.post-image img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
}

.post-text {
    margin-bottom: 10px;
}

.post-text p {
    font-size: 1rem;
    color: #333;
}

.like-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.like-button button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-right: 10px;
}

.like-button button:hover {
    background-color: #0056b3;
}

.like-count {
    font-size: 1.2rem;
    text-align: right;
}

</style>
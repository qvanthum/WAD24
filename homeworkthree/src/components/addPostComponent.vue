<template>
  <div class="middle">
    <form>
      <h1>Add post</h1>
      <div class="post-field">
        <p>Body</p>
        <input type="text" class="textbox" placeholder="Body" required v-model="post_text"> <br>
      </div>
      <button @click="SubmitPost" class="button">Add</button>
    </form>

  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
export default {
  name: 'AddPost',
  data: function () {
    return {
      user_id: '',
      post_text: '',
    };
  },
  methods: {
    getUserIdFromToken() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const decoded = jwtDecode(token);
        return decoded.user_id;
      }
      return null;
    },
    SubmitPost() {
      if (!this.post_text.trim()) {
        console.error("Post content is empty!");
        alert("Post body cannot be empty.");
        return;
      }

      fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          text: this.post_text.trim(),
        }),
      })
        .then(() => {
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
    }
  }

}
</script>
<style>
* {
  font-family: Arial;
  box-sizing: border-box;
  font-size: large;
}

.middle {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin: 20px;
  order: 2;
}

form {
  padding: 20px;
  border-radius: 20px;
  background-color: #d8d8d8;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;


}

.post-field {
  display: flex;
  align-items: center;
  justify-content: center;
}

.post-field>p {
  margin: 5px 20px 5px 18px;
}

.textbox {
  margin: 5px 20px 5px 20px;
  width: 50%;
}

.button {
  background-color: rgb(7, 85, 137);
  margin: 10px;
  padding: 3px 10px;
  color: whitesmoke;
}

p {
  display: flex;
  flex-wrap: wrap;
}

.button {
  display: flex;
  justify-content: center;
}
</style>

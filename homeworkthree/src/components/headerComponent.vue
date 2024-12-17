<template>
  <header>
    <div class="title-container">
      <p id="title-text">Like your favourite post!</p>
    </div>
    <div class="nav-container">
      <nav>
        <router-link to="/" class="buttons">Home</router-link>
        <router-link to="/signup" class="buttons">Sign Up</router-link>
        <router-link to="/contacts" class="buttons">Contacts</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'headerComponent',
}
</script>

<style scoped>
#title-text {
  font-size: 40px;
  text-align: center;
  margin: 0;
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #bfbfbf;
  height: 150px;
  margin: 20px 40px;
  padding: 10px;
  border-radius: 25px;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.nav-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
}

.buttons {
  margin: 0 10px;
  padding: 10px;
  font-size: 20px;
  color: white;
  background-color: gray;
  border-radius: 25px;
  text-decoration: none;
}

.buttons:hover {
  background-color: darkgray;
  cursor: pointer;
}
</style>

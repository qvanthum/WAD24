<template>
  <div>
    <headerComponent/>
    <sidebarLeft/>
    <sidebarRight/>
    <footerComponent/>
  </div>
</template>

<script>
import headerComponent from './components/headerComponent.vue';
import sidebarLeft from './components/sidebarLeft.vue';
import sidebarRight from './components/sidebarRight.vue';
import footerComponent from './components/footerComponent.vue';

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

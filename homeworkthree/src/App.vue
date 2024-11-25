<template>
  <div class="app-container">
    <sidebarLeft/>
    <sidebarRight/>
    <router-view/>
  </div>
</template>


<script>
import sidebarLeft from './components/sidebarLeft.vue';
import sidebarRight from './components/sidebarRight.vue';
export default {
  name: 'App',
  components: {
    sidebarLeft,
    sidebarRight,
}
}

</script>

<style>
.app-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 100vh;
  padding: 20px;
}
</style>

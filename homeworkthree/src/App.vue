<template>
  <headerComponent/>
  <div class="app-container">
    <sidebarLeft/>
    <sidebarRight/>
    <router-view/>
  </div>
  <footerComponent/>
</template>


<script>
import headerComponent from './components/headerComponent.vue'
import sidebarLeft from './components/sidebarLeft.vue';
import sidebarRight from './components/sidebarRight.vue';
import footerComponent from './components/footerComponent.vue';
export default {
  name: 'App',
  components: {
    headerComponent,
    sidebarLeft,
    sidebarRight,
    footerComponent,
}
}

</script>

<style>

.app-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 500px;
  padding: 20px;
}
</style>

<template>
  <footer>
    <div class="footer-container">
      <p id="footer-text">Like your favourite post!</p>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'footerComponent',
}
</script>
<style scoped>
#footer-text {
  font-size: 40px;
  text-align: center;
  margin: 0;
}

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #BFBFBF;
  height: 150px;
  margin: 20px 40px;
  padding: 10px;
  border-radius: 25px;
}

.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
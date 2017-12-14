<template>
  <div class="wrapper">
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'topNav',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App with openlayers4'
    }
  }
}
</script>
<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
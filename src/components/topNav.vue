<template>
  <div class="wrapper">
    <h1>{{ msg }}</h1>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  height: 100px;
}
</style>

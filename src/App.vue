<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.ol-attribution {
  display: none;
}
.ol-zoom {
  top: unset;
  bottom: .5em;
}
</style>

<template>
  <olMap :x="110" :y="32" :xyChange="whenChange"></olMap>
</template>
<script>
import map from './map'
import Vue from 'vue'

Vue.use(map)

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    whenChange (item) {
      console.log(item)
    }
  }
}
</script>


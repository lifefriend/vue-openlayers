<template>
  <div class="wrapper">
    <div>
      <topNav></topNav>
    </div>
    <div id="map"></div>
  </div>
</template>

<script>
import ol from 'openlayers'
import topNav from '@/components/topNav'
export default {
  name: 'ol2d',
  components: { topNav },
  data () {
    return {
      olmap: null
    }
  },
  mounted () {
    this.$nextTick(function () {
      initMap()
    })
  }
}
let myMap
function initMap () {
  myMap = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      center: [0, 0],
      zoom: 2
    })
  })
  console.log(myMap)
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width: 100%; 
  height: 100%;
  overflow: hidden;
}
</style>

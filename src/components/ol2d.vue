<template>
  <div class="wrapper">
    <div class="nav-wrapper">
        <topNav @add-data-event="addDataEvent" ref="topNav"></topNav>
    </div>
    <div class="map-wrapper">
        <div id="map"></div>
    </div>
  </div>
</template>

<script>
import ol from 'openlayers'
import topNav from '@/components/topNav'

let myMap, self
export default {
  name: 'ol2d',
  components: { topNav },
  data () {
    return {
      olmap: null
    }
  },
  mounted () {
    self = self || this
    this.$nextTick(function () {
      initMap()
    })
  },
  methods: {
    addDataEvent (dataInput) {
      console.log(dataInput)
    }
  }
}
function initMap () {
  myMap = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map',
    view: new ol.View({
      center: [114.316200103, 30.5810841269],
      projection: 'EPSG:4326',
      zoom: 8
    })
  })
  myMap.on('singleclick', function (evt) {
    let coordinate = evt.coordinate
    let x = coordinate[0]
    let y = coordinate[1]
    console.log('x:', x, 'y:', y)
    // 调用子组件
    let child = self.$refs.topNav
    child.addData4father(1)
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
}
.nav-wrapper{
    flex:0 0 60px;
}
.map-wrapper{
    flex: 1;
    overflow: hidden;
}
</style>

<template>
  <el-container class="main-wrapper">
    <el-header class="header-wrapper">
      <topNav @add-data-event="addDataEvent" ref="topNav"></topNav>
    </el-header>
    <el-main class="map-wrapper">
      <div id="map"></div>
    </el-main>
    <el-aside class="aside-wrapper" v-show="asideShow">
      aside
    </el-aside>
  </el-container>
</template>

<script>
import ol from 'openlayers'
import topNav from '@/components/topNav'
import { mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters([
      'asideShow'
    ])
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
    // 操作侧边栏
    self.$store.commit('asideToggle')
    // 调用子组件
    let child = self.$refs.topNav
    child.addData4father(1)
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-wrapper{
  width: 100vw;
  height: 100vh;
}
.header-wrapper,.map-wrapper{
  margin: 0;
  padding: 0;
}
.header-wrapper{
  position: fixed;
  z-index: 1;
  width: 100%;
}
#map{
  width: 100%;
  height: 100%;
}
.aside-wrapper{
  position: absolute;
  top:0;
  right: 0;
  z-index: 2;
  width: 150px;
  height: 100vh;
  background: #830000;
}
</style>

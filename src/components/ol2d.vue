<template>
  <el-container class="main-wrapper">
    <el-header class="header-wrapper">
      <topNav @add-data-event="addDataEvent" ref="topNav"></topNav>
    </el-header>
    <el-main class="map-wrapper">
      <div id="map"></div>
    </el-main>
    <transition name="slide">
      <el-aside class="aside-wrapper" v-show="asideShow">
        <asideNav></asideNav>
      </el-aside>
    </transition>   
  </el-container>
</template>

<script>
import ol from 'openlayers'
import topNav from '@/components/topNav'
import asideNav from '@/components/asideNav'
import { mapGetters } from 'vuex'

let myMap, self
export default {
  name: 'ol2d',
  components: { topNav, asideNav },
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
    // 调用子组件
    let child = self.$refs.topNav
    child.addData4father(1)
    // 关闭侧边栏
    if (self.$store.state.asideShow) {
      self.$store.commit('asideToggle')
    }
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import "../assets/less/theme.less";
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
  background: @asideColor;
}
/*定义元素最终移动到的位置，以及移动到此位置需要的时间*/
.slide-enter-active {
  transition: all .5s ease;
  transform:translate3d(0,0,0);
}
  
/*定义元素从什么位置离开，以及离开岛指定位置所需的时间*/
.slide-leave-active{
  transition: all .5s ease;
  transform:translate3d(0,0,0);
}
  
/*定义元素从100%的位置移入到0，过渡结束后再从0回到100%的位置*/
.slide-enter,.slide-leave-to{
  transform:translate3d(100%,0,0);
} 
</style>

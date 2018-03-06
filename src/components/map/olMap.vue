<template>
  <el-container class="main-wrapper">
    <el-header class="header-wrapper">
      <el-input placeholder="请输入内容" v-model="inpuTxt" v-on:input="change" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="doSearch()"></el-button>
      </el-input>
      <div class="search-div">
        <ul class="searchResult">
				 <li v-for="suggestTxt in suggestResults" @click="doSuggest(suggestTxt.name)">{{suggestTxt.name}}<span>{{suggestTxt.address}}</span></li>
			 </ul>
      </div>
      <div class="search-div" v-show="searchPanel">
			 <span class="close-ico" @click="closeSearchPanel()"><img src="./assets/message_close.png"></span> 
			 <ul class="searchResult">
				 <li v-for="searchTxt in searchResults" @click="addPointIco(searchTxt)">{{searchTxt.name}}<span>{{searchTxt.address}}</span></li>
			 </ul>
		 </div>
    </el-header>
    <el-main class="map-wrapper">
      <div id="map"></div>
    </el-main>       
  </el-container>
</template>

<script>
import 'openlayers/css/ol.css'
import 'element-ui/lib/theme-chalk/index.css'
import ol from 'openlayers'
import Axios from 'axios'

let myMap, markerLyr, self, timeInteval
export default {
  name: 'olMap',
  props: {
    x: {
      type: Number,
      default: 114.316200103
    },
    y: {
      type: Number,
      default: 30.5810841269
    },
    xyChange: {
      type: Function
    }
  },
  data () {
    return {
      olmap: null,
      inpuTxt: '',
      searchPanel: false,
      searchResults: [],
      suggestTxt: '',
      suggestResults: [],
      picUrl: require('./assets/IncidentPoint.png')
    }
  },
  methods: {
    doSearch () {
      search(this.inpuTxt)
    },
    doSuggest (txt) {
      this.inpuTxt = txt
      this.suggestResults = []
      search(txt)
    },
    addPointIco (obj) {
      var xys = obj.lonlat.split(' ')
      // console.log(xys)
      drawPoint(xys[0], xys[1])
    },
    closeSearchPanel () {
      this.searchPanel = false
    },
    change () {
      timeInteval && clearTimeout(timeInteval)
      timeInteval = setTimeout(() => {
        suggest(self.inpuTxt)
      }, 200)
    }
  },
  mounted () {
    self = self || this
    this.$nextTick(function () {
      initMap()
    })
  }
}
function suggest (txt) {
  let url = 'http://map.tianditu.com/data/suggest'
  let postString =
    'postStr={"yingjiType":1,"sourceType":0,"keyWord":"{0}","level":12,"mapBound":"{1}","queryType":"4","count":"10","start":"0"}'
  let searchExtent = '110.58838,29.25286,118.09204,31.98012'
  postString = postString.replace('{0}', txt)
  postString = postString.replace('{1}', searchExtent)
  Axios.get(url + '?' + postString)
  .then(function (response) {
    resolveSuggestResult(response.data)
  })
  .catch(function (error) {
    console.log(error)
  })
}
function resolveSuggestResult (obj) {
  // console.log(obj)
  self.suggestResults = obj.suggests || []
}
function search (txt) {
  self.searchPanel = false
  let url = 'http://map.tianditu.com/query.shtml'
  let postString =
    'postStr={"keyWord":"{0}","level":"12","mapBound":"{1}","queryType":"1","count":"10","start":"0"}&type=query'
  let searchExtent = '110.58838,29.25286,118.09204,31.98012'
  postString = postString.replace('{0}', txt)
  postString = postString.replace('{1}', searchExtent)
  Axios.get(url + '?' + postString)
    .then(function (response) {
      resolveResult(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
}
function resolveResult (json) {
  var noResult = true
  if (json.area) {
    // console.log(json.area.lonlat)
    noResult = false
    var xys = json.area.lonlat.split(',')
    drawPoint(xys[0], xys[1])
  }
  if (json.pois) {
    noResult = false
    if (json.pois.length === 1) {
      self.addPointIco(json.pois[0])
    } else {
      self.searchResults = json.pois
      self.searchPanel = true
    }
  }
  if (noResult) {
    alert('没有搜索结果请重试')
  }
}
function drawPoint (x, y) {
  x = parseFloat(x)
  y = parseFloat(y)
  var point = new ol.geom.Point([x, y])
  var eventFeature = new ol.Feature(point)
  eventFeature.set(
    'style',
    createPointStyle(self.picUrl, undefined)
  )
  markerLyr.getSource().clear()
  markerLyr.getSource().addFeature(eventFeature)
  myMap.getView().setCenter([x, y])
  notify(x, y)
}
function createPointStyle (src, img) {
  return new ol.style.Style({
    image: new ol.style.Icon(
      ({
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        anchor: [16, 38],
        src: src,
        img: img,
        imgSize: img ? [img.width, img.height] : undefined
      })
    )
  })
}
function initMap () {
  myMap = new ol.Map({
    layers: [
      new ol.layer.Tile({
        title: '天地图路网',
        source: new ol.source.XYZ({
          url: 'http://t4.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}'
        })
      }),
      new ol.layer.Tile({
        title: '天地图文字标注',
        source: new ol.source.XYZ({
          url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}'
        })
      })
    ],
    target: 'map',
    view: new ol.View({
      center: [self.x, self.y],
      projection: 'EPSG:4326',
      zoom: 8
    })
  })
  var vectorSource = new ol.source.Vector({projection: 'EPSG:4326', features: []})
  markerLyr = new ol.layer.Vector({
    id: 'markerLayer',
    style: function (feature) {
      return feature.get('style')
    },
    source: vectorSource
  })
  markerLyr.set('id', 'markerLayer')
  myMap.addLayer(markerLyr)
  myMap.on('singleclick', function (evt) {
    let coordinate = evt.coordinate
    let x = coordinate[0]
    let y = coordinate[1]
    // console.log('x:', x, 'y:', y)
    notify(x, y)
  })
  drawPoint(self.x, self.y)
}
function notify (x, y) {
  // 广播坐标 x,y
  self.xyChange({x, y})
}
</script>

<style lang="less">
@asideColor: #fff;
.main-wrapper {
  width: 100vw;
  height: 100vh;
}
.header-wrapper,
.map-wrapper {
  margin: 0;
  padding: 0;
}
.header-wrapper {
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
#map .ol-attribution {
  display: none;
}
#map .ol-zoom {
  display: none
}
.search-div{
  position: relative;
  background-color: white;
  margin-top: -15px;
}
.search-div>span>img{
	display: block;
}
.searchResult{
	padding: 0;
	max-height: 280px;
	overflow-y: auto;
}
.searchResult>li{
	cursor: pointer;
	padding: 2px 10px;
	font-size: 15px;
	list-style-type:none;
}
.searchResult>li:hover{
	background-color: #F5F5F5;
}
.searchResult>li>span{
	color: #ccc;
	font-size: 13px;
}
.close-ico{
  position: absolute;
  right: 5px;
	cursor: pointer;
	z-index: 3;
}
</style>

<template>
  <div class="wrapper">
    <div class="btn-primary">
      <el-button type="primary"  @click="addDataItem()">{{ buttonName }}</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'topNav',
  data () {
    return {
      msg: 'HelloWorld'
    }
  },
  methods: {
    addDataItem () {
      let self = this
      // 操作侧边栏
      self.$store.commit('asideToggle')
      // 派遣事件到父组件
      self.$emit('add-data-event', 'button1')
    },
    addData4father (data) {
      console.log(data)
    }
  },
  computed: {
    ...mapGetters([
      'buttonName'
    ])
  }
}
</script>
<style scoped>
.wrapper{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding:8px;
}
.btn-primary{
  width: 100%;
}
</style>
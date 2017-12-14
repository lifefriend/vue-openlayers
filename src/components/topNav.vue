<template>
  <div class="wrapper">
    <button @click="addDataItem()">{{ button1 }}</button>
  </div>
</template>

<script>
export default {
  name: 'topNav',
  data () {
    return {
      button1: '按钮1'
    }
  },
  methods: {
    addDataItem () {
      let self = this
      // 派遣事件到父组件
      self.$emit('add-data-event', 'button1')
    },
    addData4father (data) {
      console.log(data)
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
<template>
  <div class="wrapper">
      {{msg}}
  </div>
</template>
<script>
export default {
  name: 'asideNav',
  data () {
    return {
      msg: 'HelloWorld'
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
}
</style>
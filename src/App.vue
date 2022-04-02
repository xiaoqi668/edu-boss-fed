<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<script>
//引入接口请求工具（axios）
// import request from '@/utils/request'
// request({
//   methods: 'GET',
//   url:'/front/ad/getAdList'
// }).then(res => {
//   console.log(res)
// })

export default {
  name:'App'
}
</script>

<style lang="scss" scoped>
// 引入全局样式
</style>

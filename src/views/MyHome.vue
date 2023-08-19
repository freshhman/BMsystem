<template>
  <div class="home-container">
    <div class="left">
      <Left></Left>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Left from '@/components/home/MyLeft.vue'
export default {
  components: {
    Left
  }
}
</script>

<style lang="less" scoped>
.home-container{
  width: 99.9%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  height: auto;
  .left{
    position: fixed;
    width: 250px;
    height: 100vh;
    background-color: #304156;
  }
  .right{
    flex:1;
    margin-left: 250px;
    height: auto;
    padding: 10px;
  }
}
</style>

<template>
  <div class="homepage">
    <h1>欢迎光临</h1>
  </div>
</template>

<script>
export default {
  methods: {
    a () {
      console.log(this.$token)
    }
  },
  created () {
    this.a()
  }

}
</script>

<style lang="less" scoped>
.homepage{
  width: 100%;
  height: 100vh;
  background-image: url('http://localhost:3000/image/bgi.jpg');
  background-repeat: no-repeat;
  background-size: cover; /* 按比例缩放图片，以填充整个元素 */
  background-position: center; /* 图片在元素中的位置 */
  position: relative;
  h1{
    position: absolute;
    top: 40%;
    left: 45%;
    transform: translate(-50%,-50%);
  }
}

</style>

<template>
  <div class="mytag-container">
    <i class="el-icon-close" @click="close"></i>
    <h2>新增分类</h2>
    <el-input v-model="info.tag"></el-input>
    <el-button type="success" @click="submit">提交</el-button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      info: {
        category: '',
        update_time: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('closecategory', false)
    },
    async submit () {
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getUTCMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const category = this.info.tag
      try {
        await this.$http.post('/api/category', { category: category, update_time: formattedTime })
        this.$emit('closecategory', false)
        window.location.reload()
      } catch (e) {
        console.log(e.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mytag-container{
  width: 400px;
  height: 250px;
  background-color: #433334;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  text-align: center;
  i{
    cursor: pointer;
    position: absolute;
    right: 2%;
    top: 2%;
  }
  .el-input{
    margin-top: 30px;
  }
  .el-button{
    margin-top: 35px;
    width: 60%;
  }
}

</style>

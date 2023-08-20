<template>
  <div class="mytag-container">
    <i class="el-icon-close" @click="close"></i>
    <h2>新增标签</h2>
    <el-input v-model="info.tag"></el-input>
    <el-button type="success" @click="submit">提交</el-button>
  </div>

</template>

<script>
export default {
  data () {
    return {
      info: {
        tag: '',
        update_time: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('closetag', false)
    },
    async submit () {
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getUTCMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const tag = this.info.tag
      try {
        await this.$http.post('/api/tags', { tag: tag, update_time: formattedTime })
        this.$emit('closetag', false)
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

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
      } catch (error) {
        console.error('Error creating article', error)
        if (error.response) {
          console.log('Response data:', error.response.data)
          console.log('Status code:', error.response.status)
          if (error.response.status === 403) {
            alert('你没有权限进行该操作')
          }
        } else if (error.request) {
          console.log('Request made but no response was received')
        } else {
          console.log('Error setting up the request:', error.message)
        }
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

<template>
  <div class="changetag-container">
    <i class="el-icon-close" @click="close"></i>
    <h2>修改标签</h2>
    <el-input v-model="info.category"></el-input>
    <el-button type="success" @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        id: null,
        category: null,
        update_time: null
      }
    }
  },
  props: {
    clickitem: {
      type: Object
    }
  },
  methods: {
    close () {
      this.$emit('closechange', false)
    },
    async submit () {
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getUTCMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const category = this.info.category
      const categoryid = this.info.id

      await this.$http.patch(`/api/category/${categoryid}`, { category: category, update_time: formattedTime })
      window.location.reload()
      this.$emit('closechange', false)
    }
  },
  watch: {
    clickitem: {
      handler (newVal) {
        // 更新 item 数据
        this.info = { ...newVal }
      },
      immediate: true // 在初始化时触发监听
    }
  }
}
</script>

<style lang="less" scoped>
.changetag-container{
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

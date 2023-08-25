<template>
  <div class="addset">
    <i class="el-icon-close" @click="closeadd"></i>
    <br><br>
    <el-form :model="info" label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="标签">
        <el-input v-model="info.mark"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="内容">
        <el-input v-model="info.content"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        title: '',
        mark: '',
        content: ''
      }
    }
  },
  methods: {
    closeadd () {
      this.$emit('closeadd', false)
    },
    async onSubmit () {
      await this.$http.post('/api/settings', { title: this.info.title, mark: this.info.mark, content: this.info.content })
      this.$emit('closeadd', false)
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.addset{
  width: 600px;
  height: 400px;
  border-radius: 10px;
  background-color: #1d9e82;
  position: relative;
  padding: 20px;
  text-align: center;
  i{
    cursor: pointer;
    position: absolute;
    right: 2%;
    top: 2%;
  }
  .el-button{
    width: 80%;
  }
}
</style>

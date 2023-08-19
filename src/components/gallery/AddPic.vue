<template>
  <div class="addpic-container">
    <i class="el-icon-close" @click="close"></i>
    <el-form ref="form" :model="form" label-width="40px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <input type="file" ref="photoInput" name="image" accept="image/*">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitpic">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showstatu: false,
      form: {
        title: '',
        description: '',
        time: '',
        view: '',
        status: 1,
        update_time: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', false)
    },
    async onSubmitpic () {
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getUTCMonth() + 1}-${currentTime.getDate()} ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('description', this.form.description)
      formData.append('time', formattedTime)
      formData.append('view', this.$refs.photoInput.files[0])
      formData.append('status', this.form.status)
      formData.append('update_time', formattedTime)

      try {
        const response = await this.$http.post('/api/gallery', formData)
        console.log('Article created successfully', response.data)
        window.location.reload()
      } catch (error) {
        console.error('Error creating article', error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.addpic-container{
  position: relative;
  width: 450px;
  height: 300px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 4px 4px 4px 4px rgba(0,0,0,.5);
  i{
    cursor: pointer;
    position: absolute;
    right: 2%;
    transition: all .5s;
  }
  i:hover{
    transform: scale(1.5) rotate(365deg);
  }
  .el-form-item{
    margin-top: 30px;
    text-align: center;
  }
  .el-button{
    width: 300px;
  }
}
</style>

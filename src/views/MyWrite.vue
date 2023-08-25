<template>
  <div class="write-container">
    <el-form ref="uploadForm" label-width="80px">
      <el-form-item label="标题:">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.category" placeholder="请选择活动区域">
          <el-option label="游戏" value="游戏"></el-option>
          <el-option label="音乐" value="音乐"></el-option>
          <el-option label="电影" value="电影"></el-option>
          <el-option label="体育" value="体育"></el-option>
          <el-option label="放松" value="放松"></el-option>
          <el-option label="美景" value="美景"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="封面">
        <input type="file" ref="photoInput" name="image" accept="image/*">
      </el-form-item>
      <el-form-item label="概述:">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="内容文字:">
        <el-input v-model="form.text" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="标签:">
        <el-input v-model="form.tag" type="text"></el-input>
      </el-form-item>
      <el-button type="success" class="submitForm" @click="submitForm">发布</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        category: '',
        amount: 0,
        pic: null,
        status: 1,
        create_time: '',
        update_time: '',
        text: '',
        description: '',
        tag: ''
      },
      selectedFile: null
    }
  },
  methods: {
    async submitForm () {
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDay() + 13}  ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('category', this.form.category)
      formData.append('amount', this.form.amount)
      formData.append('image', this.$refs.photoInput.files[0])
      formData.append('status', 1)
      formData.append('create_time', formattedTime)
      formData.append('update_time', formattedTime)
      formData.append('text', this.form.text)
      formData.append('description', this.form.description)
      formData.append('tag', this.form.tag)

      try {
        const response = await this.$http.post('/api/article', formData)
        console.log(response)
        // console.log(response.data.status)
        // console.log('Article created successfully', response.data)
        this.$router.push('/home/article')
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
.el-input {
  min-width: 250px;
}
.el-form-item__content {
  /* 建议不设置宽度，让 Element UI 默认样式生效 */
}
.el-form {
  width: 50%;
  margin: 100px auto;
  text-align: center;
}
.submitForm {
  width: 500px;
}
.el-textarea__inner{
  height: 400px;
}
.write-container{
  padding: 20px;
}
</style>

<template>
  <div class="update-gallery">
    <i class="el-icon-close" @click="closeupdate"></i>
    <div>
    <el-form ref="uploadForm" label-width="50px">
      <el-form-item label="标题:">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="概述:">
        <el-input v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <input type="file" ref="photoInput" name="image" accept="image/*">
      </el-form-item>
      <el-button type="success" class="submitForm" @click="update">发布</el-button>
    </el-form>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item: {
        description: null,
        id: null,
        status: null,
        time: '',
        title: null,
        update_time: null,
        view: null
      }
    }
  },
  props: {
    clickitem: {
      type: Object
    },
    time: {
      type: String
    }
  },
  methods: {
    closeupdate () {
      this.$emit('close', false)
    },
    update () {
      const galleryid = this.item.id
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDay() + 13}  ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`

      const formData = new FormData()
      formData.append('title', this.item.title)
      formData.append('description', this.item.description)
      formData.append('time', this.item.time)
      formData.append('view', this.$refs.photoInput.files[0])
      formData.append('status', 1)
      formData.append('update_time', formattedTime)

      this.$http.patch(`/api/gallery/${galleryid}`, formData)
        .then(response => {
          console.log('Response:', response.data)
          this.$emit('close', false)
          window.location.reload()
        })
        .catch(error => {
          console.error('Error:', error)
          // 处理错误
        })
    }
  },
  watch: {
    clickitem: {
      handler (newVal) {
        // 更新 item 数据
        this.item = { ...newVal }
      },
      immediate: true // 在初始化时触发监听
    }
  }
}
</script>

<style lang="less" scoped>
.update-gallery{
  border-radius: 10px;
  box-shadow: 4px 4px 4px 4px rgba(0,0,0,.5);
  position: relative;
  padding: 20px;
  width: 500px;
  height: 300px;
  background-color: #fff;
  i{
    cursor: pointer;
    position: absolute;
    right: 2%;
    transition: all .5s;
  }
  i:hover{
    transform: scale(1.5) rotate(365deg);
  }
  .el-form{
    text-align: center;
  }
  .el-input{
    width: 400px;
  }
  .el-button{
    width: 400px;
  }
  .el-form-item{
    margin-top: 20px;
  }
}
</style>

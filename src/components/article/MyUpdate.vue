<template>
  <div class="update-container">
    <i class="el-icon-close" @click="close"></i>
    <div>
    <el-form ref="uploadForm" label-width="80px">
      <el-form-item label="标题:">
        <el-input v-model="item.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="item.category" placeholder="请选择活动区域">
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
        <el-input v-model="item.description"></el-input>
      </el-form-item>
      <el-form-item label="内容文字:">
        <el-input v-model="item.text" type="textarea"></el-input>
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
        amount: null,
        category: null,
        create_time: null,
        description: null,
        id: null,
        pic: null,
        status: null,
        text: null,
        title: null,
        update_time: null
      }
    }
  },
  methods: {
    close () {
      this.$emit('close', !this.changestatu)
    },
    update () {
      const articleid = this.item.id
      const currentTime = new Date()
      const formattedTime = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDay() + 13}  ${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
      // 创建一个对象接收上传的数据
      const formData = new FormData()
      formData.append('title', this.item.title)
      formData.append('category', this.item.category)
      formData.append('amount', this.item.amount)
      formData.append('pic', this.$refs.photoInput.files[0])
      formData.append('status', this.item.status)
      formData.append('create_time', this.item.create_time)
      formData.append('update_time', formattedTime)
      formData.append('text', this.item.text)
      formData.append('description', this.item.description)

      this.$http.patch(`/api/article/${articleid}`, formData)
        .then(response => {
          console.log('Response:', response.data)
          this.$emit('close', !this.changestatu)
        })
        .catch(error => {
          console.error('Error:', error)
          // 处理错误
        })
    }
  },
  props: {
    arr: {
      type: Object
    },
    changestatu: {
      type: Boolean
    }
  },
  mounted () {
    this.item.amount = this.arr.amount
  },
  watch: {
    arr: {
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
.update-container{
  padding: 50px;
  border-radius: 10px;
  width: 800px;
  height: 750px;
  background-color: #fff;
  box-shadow: 10px 10px 10px 10px #8d8888;
  position: relative;
  .el-icon-close{
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transition: all .5s;
  }
  .el-icon-close:hover{
    transform:rotate(365deg) scale(1.4);
  }
}
.el-textarea__inner{
  height: 400px;
}
.el-form{
  text-align: center;
}
.el-button{
  width: 600px;
}
</style>

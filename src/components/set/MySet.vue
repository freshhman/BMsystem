<template>
  <div class="set-container">
    <i class="el-icon-close" @click="close"></i>
    <br><br>
    <el-form :model="info" label-width="50px">
      <el-form-item label="标题">
        <el-input v-model="info.title"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="info.mark"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="info.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    clickitem: {
      type: Object
    }
  },
  data () {
    return {
      info: {
        id: null,
        title: null,
        mark: null,
        content: null
      }
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
  },
  methods: {
    close () {
      this.$emit('closesetting', false)
    },
    async onSubmit () {
      const setid = this.info.id
      await this.$http.patch(`/api/settings/${setid}`, { title: this.info.title, mark: this.info.mark, content: this.info.content })
      this.$emit('closesetting', false)
      window.location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
.set-container{
  width: 500px;
  height: 300px;
  background-color: #199c86;
  border-radius: 10px;
  position: relative;
  padding: 20px;
  i{
    position: absolute;
    right: 4%;
    top: 4%;
    cursor: pointer;
  }
  .el-form-item__label{
    text-align: center;
  }
  .el-button{
    width: 80%;
  }
  .el-form{
    text-align: center;
  }
}
</style>

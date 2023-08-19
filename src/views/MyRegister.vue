<template>
  <div>
    <el-form label-width="100px" @submit.prevent="submitForm">
      <el-form-item label="昵称">
        <el-input v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="info.pass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="info.surepass" type="password"></el-input>
      </el-form-item>
      <el-form-item label="email">
        <el-input v-model="info.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        username: '',
        password: '',
        surepass: '',
        pic: null,
        email: ''
      },
      admininfo: [],
      dialogImageUrl: '',
      dialogVisible: false,
      alluser: [],
      exist: false
    }
  },
  methods: {
    handleFileChange (event) {
      this.info.pic = event.target.files[0]
    },
    resetForm (info) {
      this.info.username = ''
      this.info.pass = ''
      this.info.surepass = ''
      this.info.email = ''
      this.info.pic = ''
    },
    async submitForm () {
      for (let i = 0; i < this.alluser.length; i++) {
        if (this.alluser[i].username.indexOf(this.info.username) !== -1) {
          this.exist = true
          break
        } else {
          this.exist = false
        }
      }
      if (this.exist) {
        alert('用户已存在')
      } else {
        try {
          const res = await this.$http.post('/api/admin', {
            username: this.info.username,
            password: this.info.pass,
            pic: this.info.pic,
            email: this.info.email
          })
          console.log(res.data)
          this.info = {
            username: '',
            password: '',
            surepass: '',
            pic: '',
            email: ''
          }
          this.$router.push('/login')
        } catch (error) {
          console.error(error)
        }
      }
    },
    async getinfo () {
      const { data: res } = await this.$http.get('/api/admin')
      this.alluser = res.data
      console.log(res)
    }
  },
  created () {
    this.getinfo()
  }

}
</script>

<style lang="less" scoped>
.el-form{
  text-align: center;
  margin: 50px auto;
  width: 600px;
  height: auto;
  padding: 10px;
  border:1px solid #000;
}
</style>

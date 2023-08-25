<template>
  <div>
    <el-form label-width="50px">
      <el-form-item label="账号:">
        <el-input type="text" v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input type="password" v-model="info.pass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
      <p @click="register">注册</p>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      info: {
        username: '',
        pass: ''
      },
      // user: [],
      istrue: false
    }
  },
  methods: {
    async login () {
      console.log(this.info.username, this.info.pass)
      try {
        const response = await this.$http.post('/api/login', { username: this.info.username, password: this.info.pass })

        const token = response.data.token
        const tokenWithBearer = `Bearer ${token}`
        console.log(tokenWithBearer) // 可以在控制台输出带有 Bearer 前缀的 token 进行验证
        console.log(response.data, 'dsdsdsdsdsd')
        localStorage.setItem('token', tokenWithBearer)
        // this.$store.dispatch('login', this.info.username)
        this.$router.push('/home')
      } catch (error) {
        this.errorMessage = 'Invalid username or password'
        console.error('Login error', error)
      }
    },
    register () {
      this.$router.push('/register')
    }
  },
  created () {
    // this.getalluser()
  }
}
</script>

<style lang="less" scoped>
.el-form{
  // text-align: center;
  border-radius: 10px;
  margin: 300px auto;
  width: 400px;
  border: 1px solid #000;
  padding: 30px;
  .el-button{
    width: 80%;
    margin-left: 10px;
  }
  p{
    text-align: right;
    cursor: pointer;
    color: #b6aeae;
  }
}
</style>

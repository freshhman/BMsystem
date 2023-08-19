<template>
  <div class="left-container">
    <ul>
      <router-link to="/home/homepage"><li>首页</li></router-link>
      <router-link to="/home/article"><li>博文管理</li></router-link>
      <router-link to="/home/poem"><li>一言</li></router-link>
      <router-link to="/home/write"><li>写作系统</li></router-link>
      <router-link to="/home/tags"><li>标签</li></router-link>
      <router-link to="/home/category"><li>分类</li></router-link>
      <router-link to="/home/comment"><li>评论管理</li></router-link>
      <router-link to="/home/gallery"><li>相册管理</li></router-link>
      <router-link to="/home/admin"><li>角色管理</li></router-link>
      <router-link to="/home/setting"><li>基础设置</li></router-link>
    </ul>
    <p @click="logout"><i class="el-icon-switch-button"></i>&nbsp;&nbsp;退出登录</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>

 ul{
  list-style: none;
  padding: 0;
  margin: 0;
  li{
    cursor: pointer;
    text-align: center;
    width: 100%;
    height: 60px;
    line-height: 50px;
    transition: all .5s;

  }
  li:hover{
    background-color: #171e28;
  }
}
a{
      width: 100%;
      text-decoration: none;
      color: #a49b9b;
    }
p{
  color: #a49b9b;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 10%;
  .el-icon-switch-button{
    transition: all .5s;
  }

}
p:hover .el-icon-switch-button{
  transform: scale(1.5);
}

</style>

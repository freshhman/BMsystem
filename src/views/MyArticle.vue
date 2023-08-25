<template>
  <div class="article-container">
    <el-form>
      <el-form-item label="">
        <el-input v-model="search" placeholder="输入你想查询的内容"></el-input>
        <el-button type="primary" @click="searcharticle">查询</el-button>
        <el-button type="primary" @click="towrite">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="article"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类">
    </el-table-column>
    <el-table-column
      prop="amount"
      label="点击数量">
    </el-table-column>
    <el-table-column label="封面">
      <template slot-scope="scope">
        <img :src="getImageSrc(scope.row.pic)" style="max-width: 100px; max-height: 100px;">
      </template>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-switch
        v-model="scope.row.status"
        @change="changestatus(scope.row)"
        active-color="#13ce66"
        inactive-color="#ff4949">
        </el-switch>
      </template>

    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="更新时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="deleteitem(scope.row)">删除</el-button>
        <el-button @click="changeitem(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="up" v-show="changestatu">
    <update :arr="clickitem" :changestatu="changestatu" @close="getclose"></update>
  </div>
  </div>
</template>

<script>
import update from '@/components/article/MyUpdate.vue'
export default {
  components: {
    update
  },
  data () {
    return {
      article: [],
      search: '',
      clickitem: {},
      changestatu: false
    }
  },
  methods: {
    async getarticle () {
      try {
        const response = await this.$http.get('/api/article')
        this.article = response.data.data
        for (let i = 0; i < this.article.length; i++) {
          if (this.article[i].status === 1) {
            this.article[i].status = true
          } else {
            this.article[i].status = false
          }
        }
        console.log(this.article)
      } catch (error) {
        console.error(error)
      }
    },
    towrite () {
      this.$router.push('/home/write')
    },
    getImageSrc (pic) {
      return `http://localhost:3000/image/${pic}`
    },
    changeitem (info) {
      console.log(info)
      this.clickitem = info
      this.changestatu = !this.changestatu
    },
    async deleteitem (info) {
      console.log(info)
      const articleid = info.article_id
      console.log(articleid)
      try {
        const response = await this.$http.delete(`/api/article/${articleid}`)
        console.log(response)
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
    },
    getclose (i) {
      this.$on('close', this.changestatu = i)
      window.location.reload()
    },
    async searcharticle () {
      const name = this.search
      const res = await this.$http.get(`/api/article/search/${name}`)
      this.article = res.data.data[0]
      console.log(this.article)
      for (let i = 0; i < this.article.length; i++) {
        if (this.article[i].status === 1) {
          this.article[i].status = true
        } else {
          this.article[i].status = false
        }
      }
    },
    async changestatus (info) {
      console.log(info)
      const id = info.id
      const status = info.status ? 1 : 0
      console.log(status)
      await this.$http.post(`/api/article/status/${id}`, { status })
    }
  },
  mounted () {
    this.getarticle()
  },
  watch: {
    search (newsearch) {
      if (newsearch === '') {
        this.getarticle()
      }
    }
  }

}
</script>

<style lang="less" scoped>
.el-input{
  width: 250px;
}
.el-input{
  margin-right: 10px;
}
.el-table-column{
  width: auto;
}
.article-container{
  position: relative;
  padding: 20px;
  .up{
    position: absolute;
    top: 10%;
    left: 20%;
    z-index: 999;
  }
}
</style>

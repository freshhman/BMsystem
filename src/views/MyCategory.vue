<template>
  <div class="tag-container">
    <el-form>
      <el-form-item>
        <el-input v-model="search" placeholder="输入你想查询的内容"></el-input>
        <el-button type="primary" @click="searchitem">查询</el-button>
        <el-button type="primary" @click="addatag">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tags"
    border
    style="width: 100%">
    <el-table-column
      prop="category"
      label="标签名">
    </el-table-column>
    <el-table-column
      prop="update_time"
      label="更新时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="deleteitem(scope.row)">删除</el-button>
        <el-button @click="content(scope.row)">查看所属文章</el-button>
        <el-button @click="changeitem(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="addtag" v-show="showadd">
    <add-category @closecategory="close"></add-category>
  </div>
  <div class="changetag" v-show="showchange">
    <change-category @closechange="closechange" :clickitem="clickitem"></change-category>
  </div>
  <div class="tagatc" v-show="articlesshow">
    <category-article @closearticle="closearticle" :articles="articles"></category-article>
  </div>
  </div>
</template>

<script>
import AddCategory from '@/components/category/MyAddcategory.vue'
import ChangeCategory from '@/components/category/ChangeCategory.vue'
import CategoryArticle from '@/components/category/CategoryArticle.vue'
export default {
  data () {
    return {
      tags: [],
      search: '',
      showadd: false,
      clickitem: {},
      showchange: false,
      articlesshow: false,
      articles: []
    }
  },
  components: {
    AddCategory,
    ChangeCategory,
    CategoryArticle
  },
  methods: {
    addatag () {
      this.showadd = true
    },
    close (i) {
      this.showadd = i
      console.log(i)
    },
    closechange (i) {
      this.showchange = i
    },
    async searchitem () {
      const name = this.search
      try {
        const response = await this.$http.get(`/api/category/search/${name}`)
        console.log(response.data.data) // Access the data property
        this.tags = response.data.data[0]
      } catch (error) {
        console.error('Error searching:', error)
      }
    },
    deleteitem (info) {
      const articleid = info.id
      this.$http.delete(`/api/category/${articleid}`)
      window.location.reload()
    },
    async content (info) {
      // console.log(info)
      this.articlesshow = true
      const name = info.category
      const res = await this.$http.get(`/api/article/searchcategory/${name}`)
      // console.log(res.data.data[0])
      this.articles = res.data.data[0]
      console.log(this.articles)
      for (let i = 0; i < this.articles.length; i++) {
        if (this.articles[i].status === 1) {
          this.articles[i].status = '已发布'
        } else {
          this.articles[i].status = '未发布'
        }
      }
    },
    changeitem (info) {
      console.log(info)
      this.clickitem = info
      this.showchange = true
    },
    async gettags () {
      const { data: res } = await this.$http.get('/api/category')
      console.log(res.data)
      this.tags = res.data
    },
    closearticle (i) {
      this.articlesshow = i
    }
  },
  created () {
    this.gettags()
  },
  watch: {
    search (newsearch) {
      if (newsearch === '') {
        this.gettags()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-input{
  width: 250px;
  margin-right: 10px;
}
.tag-container{
  position: relative;
  padding: 20px;
}
.addtag{
  z-index: 999;
  position: fixed;
  left: 40%;
  top: 30%;
}
.changetag{
  z-index: 999;
  position: fixed;
  left: 40%;
  top: 30%;
}
.tagatc{
  z-index: 999;
  position: fixed;
  left: 30%;
  top: 20%;
}
</style>

<template>
  <div class="comment-container">
    <el-table
    :data="allcomment"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="文章标题">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名字">
    </el-table-column>
    <el-table-column
      prop="email"
      label="用户邮箱">
    </el-table-column>
    <el-table-column
      prop="comment_text"
      label="评论内容">
    </el-table-column>
    <el-table-column
      prop="time"
      label="发布时间">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="deleteitem(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allcomment: []
    }
  },
  methods: {
    async getcomments () {
      const { data: article } = await this.$http.get('/api/article')
      const articles = article.data
      // console.log(articles)
      const { data: admin } = await this.$http.get('/api/admin')
      const admins = admin.data
      // console.log(admins)
      const { data: comment } = await this.$http.get('/api/comments')
      const comments = comment.data
      // console.log(comments)
      for (let i = 0; i < comments.length; i++) {
        const arctid = comments[i].article_id
        // console.log(arctid)
        const art = articles.find(item => item.article_id === arctid)
        // console.log(art.title)
        const userid = comments[i].user_id
        const alladmin = admins.find(item => item.user_id === userid)
        // console.log(alladmin.username, alladmin.email)
        const all = new FormData()
        all.append('id', comments[i].comment_id)
        all.append('title', art.title)
        all.append('username', alladmin.username)
        all.append('email', alladmin.email)
        all.append('comment_text', comments[i].comment_text)
        all.append('time', comments[i].time)
        const commentobj = {
          id: comments[i].comment_id,
          title: '',
          username: '',
          email: '',
          comment_text: '',
          time: ''

        }
        for (const entry of all.entries()) {
          const [key, value] = entry

          if (key === 'title') {
            commentobj.title = value
          } else if (key === 'username') {
            commentobj.username = value
          } else if (key === 'email') {
            commentobj.email = value
          } else if (key === 'comment_text') {
            commentobj.comment_text = value
          } else if (key === 'time') {
            commentobj.time = value
          } else if (key === 'id') {
            commentobj.id = value
          }
        }
        // console.log(commentobj)
        this.allcomment.push(commentobj)
      }
    },
    deleteitem (info) {
      console.log(info)
      const commentid = info.id
      this.$http.delete(`/api/comments/${commentid}`)
      window.location.reload()
    }
  },
  created () {
    this.getcomments()
  }
}
</script>

<style lang="less" scoped>
.comment-container{
  padding: 20px;
}
</style>

<template>
  <div>
    <el-table
    :data="poem"
    border
    class="centered-form"
    style="width: 100%">
    <el-table-column
      fixed
      prop="quote"
      label="内容">
    </el-table-column>
    <el-table-column
      fixed
      prop="create_time"
      label="创建时间">
    </el-table-column>
    <el-table-column
      fixed
      prop="category"
      label="分类">
    </el-table-column>
    <el-table-column
      fixed
      prop="region"
      label="来源">
    </el-table-column>
    <el-table-column label="操作">
      <el-button type="warning">删除</el-button>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      poem: []
    }
  },
  methods: {
    async getpoem () {
      const { data: res } = await this.$http.get('/api/poem')
      this.poem = res.data
    }
  },
  created () {
    this.getpoem()
  }
}
</script>

<style lang="less" scoped>
.centered-form,.el-form-item__label {
  text-align: center;
}
</style>

<template>
  <div>
    <el-form>
      <el-form-item label="">
        <el-input v-model="search" placeholder="输入你想查询的内容"></el-input>
        <el-button type="primary" @click="searchitem">查询</el-button>
        <el-button type="primary" @click="addpic">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tags"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: {}
    }
  }
}
</script>

<style lang="less" scoped>
.el-input{
  width: 250px;
  margin-right: 10px;
}
</style>

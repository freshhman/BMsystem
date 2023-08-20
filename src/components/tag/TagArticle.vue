<template>
  <div class="tagarticle-container">
    <i class="el-icon-close" @click="closearticle"></i>
    <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="category"
        label="分类"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status"
        label="发布状态">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="更新时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    articles: {
      type: Array
    }
  },
  methods: {
    closearticle () {
      this.$emit('closearticle', false)
    }
  }
}
</script>

<style lang="less" scoped>
.tagarticle-container{
  padding: 30px;
  width: 800px;
  height: auto;
  border-radius: 10px;
  position: relative;
  background-color: #fff;
  box-shadow: 4px 4px 4px 4px rgba(0,0,0,.5);
  i{
    cursor: pointer;
    position: absolute;
    top: 5%;
    right: 1%;
    transition: all .5s;
  }
  i:hover{
    transform: scale(1.5) rotate(365deg);
  }
}
</style>

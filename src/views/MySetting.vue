<template>
  <div class="setting-container">
    <el-form>
      <el-form-item label="">
        <el-button type="primary" @click="addsetting">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="setting"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="mark"
      label="标识">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button @click="changeitem(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="showset" v-show="showchange">
    <my-set :clickitem="clickitem" @closesetting="close"></my-set>
  </div>
  <div class="add" v-show="showadd">
    <add-set @closeadd="closeadd"></add-set>
  </div>
  </div>
</template>

<script>
import MySet from '@/components/set/MySet.vue'
import AddSet from '@/components/set/AddSet.vue'
export default {
  data () {
    return {
      setting: [],
      showchange: false,
      clickitem: {},
      showadd: false
    }
  },
  methods: {
    async getsetting () {
      const { data: res } = await this.$http.get('/api/settings')
      this.setting = res.data
    },
    changeitem (info) {
      console.log(info)
      this.showchange = true
      this.clickitem = info
    },
    close (i) {
      this.showchange = i
    },
    addsetting () {
      this.showadd = true
    },
    closeadd (i) {
      this.showadd = i
    }
  },
  created () {
    this.getsetting()
  },
  components: {
    MySet,
    AddSet
  }
}
</script>

<style lang="less" scoped>
.setting-container{
  padding: 20px;
}
</style>

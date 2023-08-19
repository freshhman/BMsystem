<template>
    <div class="gallery-container">
    <el-form>
      <el-form-item label="">
        <el-input v-model="search" placeholder="输入你想查询的内容"></el-input>
        <el-button type="primary" @click="searchitem">查询</el-button>
        <el-button type="primary" @click="addpic">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="gallery"
    border
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述">
    </el-table-column>
    <el-table-column
      prop="time"
      label="时间">
    </el-table-column>
    <el-table-column label="浏览">
      <template slot-scope="scope">
        <img :src="getImageSrc(scope.row.view)" style="max-width: 100px; max-height: 100px;">
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
  <div class="addpic" v-show="showadd">
    <add-pic @close="closeadd"></add-pic>
  </div>
  <div class="update" v-show="changeinfo">
    <update-gallery @close="closeupdate" :changeinfo="changeinfo" :clickitem="clickitem" :time="clickitem.time"></update-gallery>
  </div>
  </div>
</template>

<script>
import AddPic from '@/components/gallery/AddPic.vue'
import UpdateGallery from '@/components/gallery/UpdateGallery.vue'
export default {
  data () {
    return {
      gallery: [],
      search: '',
      showadd: false,
      clickitem: {},
      changeinfo: false
    }
  },
  components: {
    AddPic,
    UpdateGallery
  },
  methods: {
    async getgallery () {
      const { data: res } = await this.$http.get('/api/gallery')
      this.gallery = res.data
      for (let i = 0; i < this.gallery.length; i++) {
        if (this.gallery[i].status === 1) {
          this.gallery[i].status = true
        } else {
          this.gallery[i].status = false
        }
      }
    },
    addpic () {
      this.showadd = true
    },
    deleteitem (info) {
      const articleid = info.id
      this.$http.delete(`/api/gallery/${articleid}`)
      window.location.reload()
    },
    changeitem (info) {
      console.log(info)
      this.clickitem = info
      this.changeinfo = true
    },
    closeadd (i) {
      this.showadd = i
    },
    getImageSrc (pic) {
      return `http://localhost:3000/image/${pic}`
    },
    closeupdate (i) {
      this.changeinfo = i
    },
    async searchitem () {
      const name = this.search
      try {
        const response = await this.$http.get(`/api/gallery/search/${name}`)
        console.log(response.data.data) // Access the data property
        this.gallery = response.data.data[0]
        for (let i = 0; i < this.gallery.length; i++) {
          if (this.gallery[i].status === 1) {
            this.gallery[i].status = true
          } else {
            this.gallery[i].status = false
          }
        }
        console.log(this.gallery)
      } catch (error) {
        console.error('Error searching:', error)
      }
    },
    async changestatus (info) {
      console.log(info)
      const id = info.id
      const status = info.status ? 1 : 0
      console.log(status)
      await this.$http.post(`/api/gallery/status/${id}`, { status })
    }
  },
  created () {
    this.getgallery()
  },
  watch: {
    search (newsearch) {
      if (newsearch === '') {
        this.getgallery()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.gallery-container{
  position: relative;
}
.el-input{
  width: 250px;
  margin-right: 10px;
}
.addpic{
  z-index: 999;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
}
.update{
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

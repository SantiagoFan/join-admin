<template>
  <div class="app-container">
    <!--动作组-->
    <div class="action-container" style="display:inline-block;">
      <!-- <router-link :to="'/banner/edit'"><el-button size="mini" class="action-item" type="primary" icon="el-icon-edit">添加</el-button></router-link> -->
      <AttachmentList v-model="imagesFile" :limit="3" />
    </div>
    <div>
      <table class="el-table banner-list">
        <tr v-for="item in imagesFile" :key="item">
          <td>
            <el-image
              style="width: 320px; height: 160px"
              :src="item"
              fit="cover"
            >
            </el-image>
          </td>
          <td>
            <el-input placeholder="请输入包含https://的链接"></el-input>
          </td>
          <td>
            <el-button type="primary" plain @click="saveBanner(item)">保存</el-button>
            <el-button type="danger" plain @click="delBanner(item)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import api from '@/api/banner' // 和数据交互相关写在api 方便复用
import AttachmentList from '@/components/attachment/AttachmentList'
export default {
  name: 'GoodsList',
  components: { AttachmentList },
  data() {
    return {
      imagesFile: [], // 图片上传列表
      gather: []
    }
  },
  created() {
    this.loadData() // 页面加载创建时加载数据
  },
  methods: {
    loadData() {
      api.Query({}).then(res => {
        this.gather = res.data.items
        res.data.items.map(v => {
          return this.imagesFile.push(v.imgUrl)
        })
      })
    },
    saveBanner(data) {
      console.info(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods_item{
  .p-img{
    float: left;
    width: 90px;
    height: 90px;
    margin: 0 15px;
    img{
      max-width: 90px;
      max-height: 90px;
    }
  }
  .p-info{
   font-size: 13px;
   color: #555;
   margin-left: 100px;
   .p-sub{
     color: #ff6600;
     font-weight: bold;
   }
  }
}
</style>

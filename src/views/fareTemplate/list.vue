<template>
  <div class="app-container">

    <!--动作组-->
    <div class="action-container">
      <router-link :to="'/fareTemplate/edit'"><el-button size="mini" class="action-item" type="primary" icon="el-icon-edit">新建运费模板</el-button></router-link>
    </div>
    <!--折叠-->
    <el-collapse class="fare-container">
      <el-collapse-item v-for="(item,index) in list" :key="item.id">
        <template slot="title">
          <div style="width:200px;padding-left:20px;">{{ index+1 }}.{{ item.title }}</div>
          <div class="actions">
            <el-button type="text" size="mini" @click.stop>查看商品（已被10个商品使用）</el-button>
            <el-button type="text" size="mini">复制模板</el-button>
            <router-link :to="'/fareTemplate/edit?id='+item.id"><el-button type="text" size="mini">修改</el-button></router-link>
            <el-button type="text" size="mini" @click="handleDelete(item)" @click.stop>删除</el-button>
          </div>
        </template>
        <el-table
          :data="item.details"
          style="width: 100%"
        >
          <el-table-column prop="description" label="可配送区域"></el-table-column>
          <el-table-column prop="firstQuantity" :label="item.mode==0?'首件(个)':'首重(kg)'" width="150"></el-table-column>
          <el-table-column prop="firstPrice" label="运费(元)" width="150"></el-table-column>
          <el-table-column prop="nextQuantity" :label="item.mode==0?'续件(个)':'续重(kg)'" width="150"></el-table-column>
          <el-table-column prop="nextPrice" label="续费(元)" width="150"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData" />
  </div>
</template>

<script>
import api from '@/api/fareTemplate'
import Pagination from '@/components/Pagination'
import commonList from '@/utils/commonList'

export default {
  name: 'FreightList',
  components: { Pagination },
  // 列绑定格式化器
  filters: {
  },
  mixins: [commonList],
  data() {
    return {
      api
    }
  },
  created() {
    this.loadData() // 页面加载创建时加载数据
  },
  methods: {
    handleDelete(item) {
      this.$confirm('确定要删除运费模板吗?').then(() => {
        this.api.Delete({ ids: [item.id] }).then(res => {
          this.$notify({ title: '删除成功', type: 'success' })
          this.loadData()
        })
      })
    }
  }
}
</script>
<style lang="scss">
.actions{
  font-size: 12px;
}
.fare-container{
  .el-collapse-item{
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
    .el-collapse-item__header{
      background-color: #f8f8f8;
      border-bottom: 1px solid #eee;
    }
    .el-collapse-item__content{
      padding-bottom: 0px;
    }
    .el-collapse-item__wrap{
      border-bottom-width: 0px;
    }
  }
  thead .cell{
    font-size: 12px;
    font-weight: normal;
  }
}

</style>

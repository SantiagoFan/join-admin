<template>
  <div class="app-container">
    <el-tabs v-model="listQuery.isSaleable" type="card" @tab-click="SearchData">
      <el-tab-pane label="在售中" name="1" />
      <el-tab-pane label="已售罄" name="3" />
      <el-tab-pane label="仓库中" name="0" />
    </el-tabs>

    <!--查询过滤-->
    <div class="filter-container" style="display:inline-block;float:right;">
      <el-input v-model="listQuery.name" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="SearchData" />
      <el-cascader v-model="listQuery.category" :props="props" style="width:200px;" filterable clearable :options="categoryOptions" :show-all-levels="false" placeholder="请选择产品分类" :change-on-select="false" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="SearchData">
        搜索
      </el-button>
    </div>
    <!--动作组-->
    <div class="action-container" style="display:inline-block;float:left;">
      <router-link :to="'/goods/edit'"><el-button size="mini" class="action-item" type="primary" icon="el-icon-edit">添加</el-button></router-link>
      <el-button-group>
        <el-button size="mini" class="action-item" icon="el-icon-edit" @click="HandleCreate(1)">批量上架</el-button>
        <el-button size="mini" class="action-item" icon="el-icon-edit" @click="HandleCreate(0)">批量下架</el-button>
        <el-button size="mini" class="action-item" icon="el-icon-delete" @click="BatchDelete">删除</el-button>
      </el-button-group>
    </div>
    <!--表开始-->
    <el-table ref="singleTable" v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column type="selection" />
      <!--列开始-->
      <!-- <el-table-column align="center" :label="('table.id')" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="商品名称" class-name="goods_item">
        <template slot-scope="{row}">
          <div class="p-img">
            <img :src="row.imgDefault+'!size=s'">
          </div>
          <div class="p-info">
            <router-link :to="'/goods/edit?id='+row.id"><span>{{ row.name }}</span></router-link>
            <div class="p-sub">￥{{ row.price }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存数量" prop="stockNum" sortable="custom" width="100" />
      <el-table-column align="center" label="添加时间" prop="createTime" sortable="custom" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <!--行编辑按钮-->
      <el-table-column label="操作" align="center" width="230" prop="" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <router-link :to="'/goods/edit?id='+row.id">
            <el-button type="primary" plain size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="RowDelete(row)">删除</el-button>
        </template>
      </el-table-column>
      <!--列结束-->
    </el-table>
    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData" />

  </div>
</template>

<script>
import api from '@/api/goods' // 和数据交互相关写在api 方便复用
import category from '@/api/goodsCategory'
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import commonList from '@/utils/commonList'

export default {
  name: 'GoodsList',
  components: { Pagination },
  // 列绑定格式化器
  filters: {
  },
  mixins: [commonList],
  data() {
    return {
      api,
      // 额外过滤条件
      listQuery: {
        isSaleable: '1',
        type: undefined,
        name: undefined,
        category: null
      },
      rules: {
      },
      categoryOptions: [],
      props:
      {
        label: 'name',
        value: 'id'
      }
    }
  },
  created() {
    this.categoryLoadData()
    this.loadData() // 页面加载创建时加载数据
  },
  methods: {
    categoryLoadData() {
      category.get().then(res => {
        this.categoryOptions = res.data
      })
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

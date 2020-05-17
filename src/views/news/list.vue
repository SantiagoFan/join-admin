<template>
  <div class="app-container">
    <!--查询过滤-->
    <div class="filter-container">
      <el-input v-model="listQuery.search" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="SearchData" />
      <!-- <el-select v-model="listQuery.importance" placeholder="table.importance" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="table.type'" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="SearchData">
        搜索
      </el-button>
    </div>
    <!--动作组-->
    <div class="action-container">
      <el-button-group>
        <!-- @click="HandleCreate" -->
        <el-button class="action-item" type="primary" icon="el-icon-edit"><router-link :to="'/news/edit'">添加</router-link></el-button>
        <el-button class="action-item" icon="el-icon-delete" @click="BatchDelete">删除</el-button>
        <!-- <el-button :loading="downloadLoading" class="action-item" icon="el-icon-download" @click="ExportData">
          {{'table.export') }}
        </el-button> -->
      </el-button-group>
      <!--显示隐藏列-->
      <!-- <el-checkbox v-model="showState" class="filter-item" style="margin-left:15px;">
        显示价格
      </el-checkbox> -->
    </div>
    <!--表开始-->
    <el-table ref="singleTable" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange">
      <el-table-column type="selection" />
      <el-table-column align="center" label="#" width="50">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="title" label="标题" style="text-align:center;" show-overflow-tooltip>
        <template slot-scope="{row}">
          <router-link :to="'/news/edit/?id='+row.id" class="link-type">
            <span>{{ row.title }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="description" label="描述" show-overflow-tooltip />
      <el-table-column align="center" prop="sortNumber" label="排序" sortable />
      <el-table-column align="center" prop="createTime" label="时间">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="" label="操作">
        <template slot-scope="scopes">
          <router-link :to="'/news/edit?id='+scopes.row.id">
            <el-button type="primary" plain size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="RowDelete(scopes.row)">删除</el-button>
        </template>
      </el-table-column>
      <!--列结束-->
    </el-table>
    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData" />

    <!--弹窗编辑/新增窗体-->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="类型" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="请选择类型">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="时间" prop="creatTime">
          <el-date-picker v-model="temp.creatTime" type="datetime" placeholder="请选择添加时间" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="temp.content" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="ConfirmData">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/news' // 和数据交互相关写在api 方便复用
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import commonList from '@/utils/commonList'

// 自定义数据
const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

export default {
  name: 'NewsList',
  components: { Pagination },
  // 列绑定格式化器
  filters: {
  },
  mixins: [commonList],
  data() {
    return {
      // api接口方法
      api,
      // 导出数据表头和字段 无导出功能可以不用
      ExportFields: ['timestamp', 'title', 'type', 'importance', 'status'],
      // 额外过滤条件
      listQuery: {
        importance: undefined,
        type: undefined,
        title: undefined
      },
      // 编辑对象样本
      temp: {
        id: null
      },
      showState: true, // 显示隐藏列标记
      // 自定义数据
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      rules: {
      }
    }
  },
  created() {
    this.loadData() // 页面加载创建时加载数据
  }
}
</script>

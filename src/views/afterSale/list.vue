<template>
  <div class="app-container">
    <el-tabs v-model="listQuery.state" type="card" @tab-click="SearchData">
      <el-tab-pane label="已发起" name="0" />
      <el-tab-pane label="已同意" name="1" />
      <el-tab-pane label="已拒绝" name="2" />
    </el-tabs>

    <!--查询过滤-->
    <div class="filter-container" style="display:inline-block;float:right;">
      <el-input
        v-model="listQuery.search"
        :placeholder="'产品名称或者订单号'"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="SearchData"
      />
      <el-select
        v-model="listQuery.type"
        placeholder="请选择售后服务类别"
        :change-on-select="false"
        value=""
        class="filter-item"
        clearable
        @clear="typeClear"
      >
        <el-option v-for="item in typeOptions" :key="item.value" :value="item.value" :label="item.label" />
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="SearchData">
        搜索
      </el-button>
    </div>
    <!--表开始-->
    <el-table
      ref="singleTable"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <!-- 售后信息 -->
          <ul class="info el-row">
            <li class="el-col el-col-12">
              <label class="info-label">售后状态:</label>
              <div class="info-content">{{ row.state === 0 ? '已发起' :( row.state === 1 ? '已同意' : '已拒绝' ) }}</div>
            </li>
            <li class="el-col el-col-12">
              <label class="info-label">售后类别:</label>
              <div class="info-content">{{ row.type === 0 ? '换货维修' :( row.type === 1 ? '退款（无需退货）' : '退款退货' ) }}</div>
            </li>
            <li class="el-col el-col-12"><label class="info-label">售后原因:</label><div class="info-content">{{ row.reason }}</div></li>
            <li class="el-col el-col-12"><label class="info-label">售后说明:</label><div class="info-content">{{ row.description }}</div></li>
            <li class="el-col el-col-12"><label class="info-label">退款金额:</label><div class="info-content">{{ row.refundAmount }}</div></li>
            <li><label class="info-label">创建时间:</label><div class="info-content">{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</div></li>
            <li>
              <label class="info-label">附件:</label>
              <div class="info-content attachment-container">
                <el-image
                  v-for="(i,index) in row.attachment.split(',')"
                  :key="index"
                  style="width: 150px; height: 150px;"
                  :src="i+'!size=s'"
                />
              </div>
            </li>
            <li v-if="row.state === 2"><label class="info-label">拒绝原因:</label><div class="info-content">{{ row.refusedReason }}</div></li>
          </ul>
          <!--/ 售后信息 -->
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="订单号" prop="sn" />
      <el-table-column
        width="100px"
        align="center"
        label="售后状态"
        prop="state"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ mapState(scope.row.state) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        align="center"
        label="售后服务类别"
        prop="type"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ mapType(scope.row.type) }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="创建时间"
        prop="createTime"
        sortable="custom"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="售后原因" />
      <!--行编辑按钮-->
      <el-table-column
        label="操作"
        align="center"
        width="230"
        prop=""
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <router-link :to="'/afterSale/detail?id='+row.id">
            <el-button type="primary" plain size="mini" icon="el-icon-more">详情</el-button>
          </router-link>
          <el-button
            v-if="row.state === 0"
            type="success"
            plain
            size="mini"
            icon="el-icon-check"
            @click="agreeApplication(row)"
          >同意
          </el-button>
          <el-button
            v-if="row.state === 0"
            size="mini"
            type="danger"
            plain
            icon="el-icon-close"
            @click="refuseApplication(row)"
          >拒绝
          </el-button>
        </template>
      </el-table-column>
      <!--列结束-->
    </el-table>
    <!--分页-->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="loadData"
    />

    <!-- 退款确认modal -->
    <el-dialog title="退款确认" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="退款金额">
          <el-input v-model="form.refundAmount" />
        </el-form-item>
        <el-form-item label="退款备注">
          <el-input v-model="form.refundRemark" type="textarea" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="confirmRefund(form)">{{ '确定' }}</el-button>
      </div>
    </el-dialog>
    <!--/ 退款确认modal -->
  </div>
</template>

<script>
import api from '@/api/afterSale' // 和数据交互相关写在api 方便复用
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import commonList from '@/utils/commonList'

export default {
  name: 'GoodsList',
  components: { Pagination },
  // 列绑定格式化器
  filters: {},
  mixins: [commonList],
  data() {
    return {
      api,
      // 额外过滤条件
      listQuery: {
        state: '0',
        type: undefined,
        // 产品名称或者sn
        search: undefined
      },
      rules: {},
      typeOptions: [
        { label: '换货维修', value: 0 },
        { label: '退款（无需退货）', value: 1 },
        { label: '退款退货', value: 2 }
      ],
      props:
          {
            label: 'name',
            value: 'id'
          },
      stateFilters: [
        { text: '已发起', value: 0 },
        { text: '已同意', value: 1 },
        { text: '已拒绝', value: 2 }
      ],
      dialogVisible: false,
      form: {
        refundAmount: ''
      }
    }
  },
  created() {
    this.loadData() // 页面加载创建时加载数据
  },
  methods: {
    mapState(value) {
      let result = ''
      this.stateFilters.forEach(res => {
        if (res.value === value) {
          result = res.text
        }
      })

      return result
    },
    mapType(value) {
      let result = ''
      this.typeOptions.forEach(res => {
        if (res.value === value) {
          result = res.label
        }
      })

      return result
    },
    typeClear() {
      this.listQuery.type = undefined
    },
    refuseApplication(row) {
      const afterSaleId = row.id
      this.$prompt('请输入拒绝原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w\W]+/,
        inputErrorMessage: '拒绝原因必填'
      }).then(({ value }) => {
        const data = {
          id: afterSaleId,
          refusedReason: value
        }
        api.refuseApplication(data).then(() => {
          this.$message({ message: '售后状态更新成功！', type: 'success' })
          this.loadData()
        })
      })
    },
    agreeApplication(row) {
      const afterSaleId = row.id
      const type = row.type
      this.form.refundAmount = row.refundAmount
      this.form.id = afterSaleId
      // 退款退货，需要确定收到退回的货物再退款
      if (type === 2) {
        this.$confirm('请确认收到退回的货品后再退款！', '提示', { type: 'warning' })
          .then(() => {
            this.dialogVisible = true
          })
      } else if (type === 1) { // 退款不退货
        this.dialogVisible = true
      }
    },
    confirmRefund(form) {
      debugger
    }
  }
}
</script>

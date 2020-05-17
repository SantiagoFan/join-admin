<template>
  <div class="app-container">
    <el-tabs v-model="orderState" type="card" @tab-click="SearchData">
      <el-tab-pane label="全部" name="all" />
      <el-tab-pane label="待付款" name="0" />
      <el-tab-pane label="待发货" name="1" />
      <el-tab-pane label="已发货" name="2" />
      <el-tab-pane label="待评价" name="3" />
      <el-tab-pane label="已完成" name="4" />
      <el-tab-pane label="已撤销" name="-1" />
      <el-tab-pane label="已退款" name="-2" />
    </el-tabs>
    <!--查询过滤-->
    <div class="filter-container" style="display:inline-boock;float:right;">
      <div class="block" style="display: inline-block;margin-bottom: 10px;vertical-align: middle">
        <el-date-picker
          v-model="listQuery.searchTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        />
      </div>
      <el-input v-model="listQuery.title" placeholder="标题" style="width: 200px;" class="filter-item" @keyup.enter.native="SearchData" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="SearchData">
        搜索
      </el-button>
    </div>
    <!--动作组-->
    <div class="action-container">
      <el-button-group>
        <el-button class="action-item" type="primary" icon="el-icon-edit" @click="BatchSend">批量发货</el-button>
        <el-button class="action-item" icon="el-icon-delete" @click="batchDelete">删除</el-button>
      </el-button-group>
    </div>

    <div v-for="(item, i) in list" :key="i" class="order-item">
      <table>
        <thead>
          <tr>
            <th>
              <el-checkbox v-model="item.checked" />
              <span>{{ item.createTime }}</span>
              <span style="margin-left:30px;">订单号: {{ item.sn }}</span>
            </th>
            <th class="action-cell">——</th>
            <th style="width:100px;">——</th>
            <th class="action-cell">——</th>
            <th colspan="2">——</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(itemtwo,num) in item.children" :key="num">
            <td class="noborder">
              <div class="goods-image">
                <el-image style="width: 80px; height: 80px" :src="itemtwo.imgurl+'!size=s'" />
              </div>
              <div class="goods-info">
                <p class="goods-title">
                  <el-link :underline="false" type="primary">{{ itemtwo.goodsName }}</el-link>
                </p>
                <p class="goods-spec">{{ itemtwo.skuName|regroupSpec }}</p>
              </div>
            </td>
            <td class="noborder">￥{{ itemtwo.price }}</td>
            <td class="noborder">数量：{{ itemtwo.number }}</td>
            <td>1</td>
            <!-- item.children.length -->
            <td v-if="num===0" class="action-cell" :rowspan="4">￥{{ item.totalAmount }}</td>
            <td v-if="num===0" class="action-cell" :rowspan="4">
              <!--订单操作-->
              {{ item.orderState|getOrderState }} <br>
              <router-link :to="'/order/detail?id='+item.id" style="margin-top:6px;display:inline-block;color:#1890ff">订单详情</router-link>
              <el-button v-if="item.orderState === 1 && item.isDelivered === 0" type="primary" plain size="mini" style="margin-top:6px;" @click="aloneBatchSend(item.id)">确认发货</el-button>
              <el-button v-if="item.orderState === 2 && item.expressCompany==null" type="warning" plain size="mini" style="margin-top:6px;" @click="showExpressInfo(item.sn)">运单信息</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="total === 0" class="el-table__empty-block" style="border-bottom: 1px solid #dfe4ed;border-top: 1px solid #dfe4ed;">
      <span class="el-table__empty-text" style="color:#606266;">暂无数据</span>
    </div>
    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData" />

    <!--发货-->
    <el-dialog title="发货信息" :visible.sync="showExpressDialog" width="600px">
      <el-form ref="expressForm" :rules="rules" :model="express" label-position="left" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="快递公司" prop="expressCompany">
          <el-select v-model="express.expressCompany" style="width:100%" clearable filterable placeholder="请选择快递公司">
            <el-option v-for="(value,key) in expressOptions" :key="key" :label="value" :value="key">
              <span style="float: left">{{ value }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ key }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运单编号" prop="expressCode">
          <el-input v-model="express.expressCode" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showExpressDialog = false">取消</el-button>
        <el-button type="primary" @click="ConfirmExpress">确定发货</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/orders' // 和数据交互相关写在api 方便复用
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import commonList from '@/utils/commonList'

// 自定义数据
const expressOptions = {
  SF: '顺丰速运',
  HTKY: '百世快递',
  ZTO: '中通快递',
  STO: '申通快递',
  YTO: '圆通速递',
  YD: '韵达速递',
  YZPY: '邮政快递包裹',
  EMS: 'EMS',
  HHTT: '天天快递',
  JD: '京东快递',
  UC: '优速快递',
  DBL: '德邦快递',
  ZJS: '宅急送',
  TNT: 'TNT快递',
  UPS: 'UPS',
  DHL: 'DHL',
  FEDEX: 'FEDEX联邦(国内件)',
  FEDEX_GJ: 'FEDEX联邦(国际件)'
}

export default {
  name: 'OrderList',
  components: { Pagination },
  mixins: [commonList],
  data() {
    return {
      // api接口方法
      api,
      // 额外过滤条件
      orderState: 'all',
      listQuery: {
        title: undefined,
        searchTime: []
      },
      showExpressDialog: false,
      express: {
        sn: null,
        expressCompany: '',
        expressCode: ''
      },
      expressOptions,
      rules: {
        expressCompany: [{ required: true, message: '请选择快递公司', trigger: 'blur' }],
        expressCode: [{ required: true, message: '请输入运单编号', trigger: 'blur' }]
      },
      check: false,
      ExportFields: [
        'id',
        'sn',
        'totalAmount',
        'subAmount',
        'isPaid',
        'isDelivered'
      ]
    }
  },
  created() {
    this.loadData() // 页面加载创建时加载数据
  },
  methods: {

    // 填写运单信息
    showExpressInfo(sn) {
      this.showExpressDialog = true
      this.express.sn = sn
      this.express.expressCompany = ''
      this.express.expressCode = ''
    },
    loadListBefore(p) {
      this.listQuery.orderState = this.orderState === 'all' ? null : this.orderState
    },
    ConfirmExpress() {
      this.$refs['expressForm'].validate((valid) => {
        if (valid) {
          api.UpdateExpressInfo(this.express).then(res => {
            this.showExpressDialog = false
            this.$notify({ title: '成功', message: '快递更新成功', type: 'success', duration: 2000 })
            this.SearchData()
          })
        }
      })
    },
    BatchSend() {
      var ids = this.listBatchSendSelected()
      if (ids.length > 0) {
        api.BatchInSend(ids).then(() => {
          this.$message.success('确认发货成功！')
          this.loadData()
        })
      } else {
        this.$message.error({ message: '请选择要发货的订单', type: 'warning' })
      }
    },
    batchDelete() {
      const ids = this.getSelectId()
      if (ids.length > 0) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.api.batchDelete(ids).then(res => {
            this.$message.info('删除成功！')
            this.loadData()
          })
        })
      } else {
        this.$message.error({ message: '请选择要删除的订单！', type: 'warning' })
      }
    },
    aloneBatchSend(ids) {
      this.$confirm('是否确认发货?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var a = []
        a.push(ids)
        api.BatchInSend(a).then(res => {
          if (res.code === 20000) {
            this.loadData()
          }
        })
      })
    },
    // 筛选出只包含待发货的id数组
    listBatchSendSelected() {
      const ids = []
      this.list.forEach(res => {
        if (res.checked && res.orderState === 1 && res.isDelivered === 0) {
          ids.push(res.id)
        }
      })
      return ids
    },
    getSelectId() {
      const ids = []
      this.list.forEach(res => {
        if (res.checked) { ids.push(res.id) }
      })
      return ids
    }
  }
}
</script>

<style lang="scss">
.action-cell{
  width: 120px;
}
.el-range-separator{
  width: 10% !important;
}

</style>


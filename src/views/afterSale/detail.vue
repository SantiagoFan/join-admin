<template>
  <div class="app-container">
    <!-- 售后信息 -->
    <el-card>
      <div slot="header">
        <span>售后信息</span>
      </div>
      <ul class="info el-row">
        <li class="el-col el-col-12">
          <label class="info-label">售后状态:</label>
          <div class="info-content">{{ afterSaleInfo.state === 0 ? '已发起' :( afterSaleInfo.state === 1 ? '已同意' : '已拒绝' ) }}</div>
        </li>
        <li class="el-col el-col-12">
          <label class="info-label">售后类别:</label>
          <div class="info-content">{{ afterSaleInfo.type === 0 ? '换货维修' :( afterSaleInfo.type === 1 ? '退款（无需退货）' : '退款退货' ) }}</div>
        </li>
        <li class="el-col el-col-12"><label class="info-label">售后原因:</label><div class="info-content">{{ afterSaleInfo.reason }}</div></li>
        <li class="el-col el-col-12"><label class="info-label">售后说明:</label><div class="info-content">{{ afterSaleInfo.description }}</div></li>
        <li class="el-col el-col-12"><label class="info-label">退款金额:</label><div class="info-content">{{ afterSaleInfo.refundAmount }}</div></li>
        <li><label class="info-label">创建时间:</label><div class="info-content">{{ afterSaleInfo.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</div></li>
        <li>
          <label class="info-label">附件:</label>
          <div class="info-content attachment-container">
            <el-image
              v-for="(i,index) in attachmentArr"
              :key="index"
              style="width: 150px; height: 150px;"
              :src="i+'!size=s'"
              :large="i"
              preview="0"
            ></el-image>
          </div>
        </li>
        <li v-if="afterSaleInfo.state === 2"><label class="info-label">拒绝原因:</label><div class="info-content">{{ afterSaleInfo.refusedReason }}</div></li>
      </ul>
    </el-card>
    <!--/ 售后信息 -->
    <el-card>
      <div slot="header">
        <span>收货信息</span><el-button style="float: right; padding: 3px 0" type="text" @click="getExpressInfo">刷新物流信息</el-button>
      </div>
      <el-row>
        <el-col :span="12">
          <ul class="info">
            <li><label class="info-label">收 货 人:</label><div class="info-content">{{ order.receiverName }}</div></li>
            <li><label class="info-label">收货电话:</label><div class="info-content">{{ order.receiverMobile }}</div></li>
            <li><label class="info-label">收货地址:</label><div class="info-content">{{ order.receiverAddress }}</div></li>
            <li><label class="info-label">快递公司:</label><div class="info-content">{{ order.expressCompany }}</div></li>
            <li><label class="info-label">运单编号:</label><div class="info-content">{{ order.expressCode }}</div></li>
          </ul>
        </el-col>
        <el-col :span="15">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in expressInfo"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
    <!--  -->
    </el-card>

    <el-card>
      <div slot="header">
        <span>订单信息</span><span style="float: right; padding: 3px 0;font-size:14px;">订单号: {{ order.sn }}</span>
      </div>
      <div class="order-item">
        <table>
          <thead>
            <tr>
              <th>商品</th>
              <th class="action-cell">单价</th>
              <th style="width:100px;">数量</th>
              <th class="action-cell">状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(ordertwo,num) in order.children" :key="num">
              <td class="noborder">
                <div class="goods-image">
                  <el-image style="width: 80px; height: 80px" :src="ordertwo.imgurl"></el-image>
                </div>
                <div class="goods-info">
                  <p class="goods-title">
                    <el-link :underline="false" type="primary">{{ ordertwo.goodsName }}</el-link>
                  </p>
                  <p class="goods-spec">{{ ordertwo.skuName|regroupSpec }}</p>
                </div>
              </td>
              <td class="noborder">￥{{ ordertwo.price }}</td>
              <td class="noborder">数量：{{ ordertwo.number }}</td>
              <td>
                {{ parseOrderState(order.orderState) }}
              </td>
            </tr>
          </tbody>
        </table>
        <ul class="info payInfo">
          <li><label class="info-label">商品总价:</label><div class="info-content">￥{{ order.totalAmount }}</div></li>
          <li><label class="info-label">运费(快递):</label><div class="info-content">￥{{ order.freightAmount }}</div></li>
          <li style="font-size: 17px;font-weight: bold;"><label class="info-label">订单总价:</label><div class="info-content">￥{{ order.totalAmount+order.freightAmount }}</div></li>
          <li style="font-size: 17px;font-weight: bold;"><label class="info-label">实付款:</label><div class="info-content" style="color:#DD2727">￥{{ order.subAmount }}</div></li>
        </ul>
      </div>
    </el-card>
    <el-row>
      <el-col v-if="afterSaleInfo.state == 0">
        <el-button type="success">同意</el-button>
        <el-button type="danger" @click="refuseApplication">拒绝</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/afterSale'
export default {
  data() {
    return {
      order: {
        orderState: 1
      },
      expressInfo: [],
      afterSaleInfo: {},
      attachmentArr: []
    }
  },
  created() {
    this.afterSaleInfo.id = this.$route.query.id
    if (this.afterSaleInfo.id) {
      this.loadAfterSaleInfo()
    }
  },
  methods: {
    loadAfterSaleInfo() {
      api.get(this.afterSaleInfo.id).then(res => {
        this.afterSaleInfo = res.data
        this.attachmentArr = this.afterSaleInfo.attachment.split(',')
        api.getAfterOrderDeatial(this.afterSaleInfo.orderId, this.afterSaleInfo.orderDetailId).then(res => {
          this.order = res.data
          this.getExpressInfo()
        })
      })
    },
    getExpressInfo() {
      api.getExpressInfo(this.afterSaleInfo.expressCode, this.afterSaleInfo.expressCompany).then(res => {
        // 清空物流轨迹
        this.expressInfo = []
        const traces = res.data.Traces
        traces.forEach(trace => {
          const accept = {}
          accept.timestamp = trace.AcceptTime
          accept.content = trace.AcceptStation
          this.expressInfo.push(accept)
        })
      })
    },
    parseOrderState(orderState) {
      let stateStr
      switch (orderState) {
        case -2:
          stateStr = '退款'
          break
        case -1:
          stateStr = '撤销'
          break
        case 0:
          stateStr = '待付款'
          break
        case 1:
          stateStr = '已支付'
          break
        case 2:
          stateStr = '已发货'
          break
        case 3:
          stateStr = '已收货'
          break
        case 4:
          stateStr = '已评价'
          break
      }

      return stateStr
    },
    refuseApplication() {
      this.$prompt('请输入拒绝原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w\W]+/,
        inputErrorMessage: '拒绝原因必填'
      }).then(({ value }) => {
        const data = {
          id: this.afterSaleInfo.id,
          refusedReason: value
        }
        api.refuseApplication(data).then(() => {
          this.$message({ message: '售后状态更新成功！', type: 'success' })
          this.loadAfterSaleInfo()
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order-item th{
  text-align: center;
}
.el-card{
  margin:20px;
}
.payInfo{
  width: 50%;
  float:right;
  padding: 40px;
  text-align: right;
}
</style>

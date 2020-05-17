<template>
  <div class="app-container">
    <el-steps :active="order.orderState" align-center>
      <el-step title="提交订单" :description="order.createTime"></el-step>
      <el-step title="已支付" :description="order.payTime"></el-step>
      <el-step title="已发货" :description="order.deliverTime"></el-step>
      <el-step title="已收货" :description="order.receiveTime"></el-step>
      <el-step title="已完成"></el-step>
    </el-steps>

    <el-card>
      <div slot="header">
        <span>收货信息</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getExpressInfo">刷新物流信息</el-button>
      </div>
      <el-row>
        <el-col :span="9">
          <ul class="info">
            <li>
              <div class="info-td">订单编号:</div>
              <div class="info-dd">{{ order.sn }}</div>
            </li>
            <li>
              <div class="info-td" style="letter-spacing:1px;">收 货 人:</div>
              <div class="info-dd">{{ order.receiverName }}</div>
            </li>
            <li>
              <div class="info-td">收货电话:</div>
              <div class="info-dd">{{ order.receiverMobile }}</div>
            </li>
            <li>
              <div class="info-td">收货地址:</div>
              <div class="info-dd">{{ order.receiverAddress }}</div>
            </li>
            <li>
              <div class="info-td">快递公司:</div>
              <div class="info-dd">{{ expressOptions[order.expressCompany] }}</div>
            </li>
            <li>
              <div class="info-td">运单编号:</div>
              <div class="info-dd">{{ order.expressCode }}</div>
            </li>
          </ul>
        </el-col>
        <el-col :span="15">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in expressInfo"
              :key="index"
              :timestamp="activity.timestamp"
            >{{ activity.content }}</el-timeline-item>
          </el-timeline>
        </el-col>
      </el-row>
      <!--  -->
    </el-card>

    <el-card>
      <div slot="header">
        <span>订单信息</span>
        <span style="float: right; padding: 3px 0;font-size:14px;">订单号: {{ order.sn }}</span>
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
                  <el-image style="width: 80px; height: 80px" :src="ordertwo.imgurl+'!size=s'"></el-image>
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
              <td>订单详情 操作</td>
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
  </div>
</template>

<script>
import api from '@/api/orders'
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
  data() {
    return {
      order: {
        orderState: 1
      },
      expressInfo: [],
      expressOptions
    }
  },
  created() {
    this.order.id = this.$route.query.id
    if (this.order.id) {
      api.Detail(this.order.id).then(response => {
        this.order = response.data
        this.getExpressInfo()
      })
    }
  },
  methods: {
    getExpressInfo() {
      api
        .getExpressInfo(this.order.expressCode, this.order.expressCompany)
        .then(res => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.order-item th {
  text-align: center;
}
.el-card {
  margin: 20px;
}
.payInfo {
  width: 50%;
  float: right;
  padding: 40px;
  text-align: right;
}

</style>

<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="account-book" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单金额（元）
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
          <div class="card-panel-foot">昨日：000.00</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="database" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单数量
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
          <div class="card-panel-foot">昨日：000.00</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="schedule" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            浏览数（pv）
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-panel-important">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="express" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待发货订单
          </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="transaction" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付金额（元）
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
          <div class="card-panel-foot">昨日：000.00</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="transaction" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            支付订单数
          </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="user" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            访客数（uv）
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
          <div class="card-panel-foot">昨日：000.00</div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel card-panel-important" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper">
          <svg-icon icon-class="audit" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            待处理信息
          </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 130px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color:#409EFF;
    border: 1px solid #ddd;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .card-panel-icon-wrapper {
      float: left;
      margin: 20px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 16px;
        color: #999;
        font-size: 15px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
      .card-panel-foot {
        margin-top: 12px;
        color: #999;
      }
    }
  }
  .card-panel-important{
    color: #000;
  }
}
</style>

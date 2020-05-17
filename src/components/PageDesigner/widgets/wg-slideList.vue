<template>
  <div class="wg-slideList">
    <div class="wg-tit">
      <em>{{ data.title }}</em>
      <a :href="data.url">查看更多 ></a>
    </div>
    <div class="wg-recommend">
      <div class="irs-list">
        <div v-for="(index) in data.number" :key="index" class="irs-item" :class="{'fillet':data.fillet}">
          <a href=""></a>
          <div class="irs-img">
            <img src="/placeholder.jpg">
          </div>
          <div class="irs-info">
            <div class="irsi-tit">
              这里是产品标题,最多显示一行
            </div>
            <div class="irsi-price">
              <em>￥32.80</em>
              <span>销量5280</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

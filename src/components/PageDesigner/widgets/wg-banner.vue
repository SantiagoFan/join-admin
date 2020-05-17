<template>
  <div class="wg-banner" :style="{ padding:'0 '+data.padding+'px'}">
    <van-swipe
      :autoplay="3000"
      :show-indicators="data.indicator.show"
      :indicator-color="data.indicator.color"
      @change="onChange"
    >
      <van-swipe-item v-for="(item,index) in data.list" :key="index" :class="{'fillet':data.fillet}">
        <img :src="item.src+'!size=150X150'"><div v-if="item.title" class="title">{{ item.title }}</div>
      </van-swipe-item>
      <van-swipe-item v-if="data.list.length == 0">
        <div class="empty-swipe-item">点击编辑轮播图</div>
      </van-swipe-item>
      <template v-if="data.indicator.show">
        <!--指示器样式-->
        <div v-if="data.indicator.style==1" slot="indicator" class="custom-indicator">
          {{ current + 1 }}/{{ data.list.length }}
        </div>
        <div v-if="data.indicator.style==2" slot="indicator" class="block-indicator">
          <span v-for="item in data.list.length" :key="item" class="bk" :class="{on:current+1==item}"></span>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    }
  }
}
</script>
<style lang="scss" scoped>
.empty-swipe-item{
  height: 120px;
  line-height: 120px;
  background-color: #ebf8fd;
  color: #88c4dc;
  text-align: center;
}
</style>

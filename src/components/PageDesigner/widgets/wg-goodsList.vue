<template>
  <div class="wg-goodsList" :style="{ padding:'0 '+data.padding+'px'}">
    <ul
      class="goods-container"
      :style="{margin: '0 -'+data.goodsInterval/2+'px'}"
    >
      <li
        v-for="(item,index) in data.list"
        :key="index"
        :style="{width:liwidth}"
        class="goods-item"
      >
        <router-link
          to="#"
          class="card"
          :class="{
            'fillet':data.fillet,
            'style1':data.goodsStyle=='style1',
            'style2':data.goodsStyle=='style2',
            'style3':data.goodsStyle=='style3',
            'style4':data.goodsStyle=='style4',
            'detail':data.listStyle == 3
          }"
          :style="{margin:data.goodsInterval/2+'px'}"
        >
          <div class="goods-img"><img src="/placeholder.jpg"></div>
          <div class="info">
            <div class="title">
              <h3>这里是产品标题，最多显示2行</h3>
              <p v-if="data.listStyle==0||data.listStyle==3" class="sub-title">这里显示商品描述，最多显示1行这里显示商品描述，最多显示1行</p>
            </div>
            <div class="price"><em>￥98.8</em></div>
          </div>
        </router-link>
      </li>
    </ul>
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
    }
  },
  computed: {
    liwidth: function() {
      if (this.data.listStype === 0) return '100%'
      else if (this.data.listStyle === 1) return '50%'
      else if (this.data.listStyle === 2) return '33.3%'
      else return '100%'
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>

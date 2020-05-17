<template>
  <div class="wg-navigation" :style="{ padding:'0 '+data.padding+'px',backgroundColor:data.backgroudColor,color:data.fontColor }">
    <ul>
      <li v-for="(item,index) in data.list" :key="index" class="item" :style="{width:(100/data.list.length)+'%'}">
        <router-link to="#">
          <div v-if="data.style==0" class="">
            <img src="/placeholder.jpg">
          </div>
          <h3 class="title">{{ item.title }}</h3>
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
  }
}
</script>


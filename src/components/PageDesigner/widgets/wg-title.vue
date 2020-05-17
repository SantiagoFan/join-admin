<template>
  <div class="wg-title" :style="{ backgroundColor:data.backgroudColor }">
    <div class="title-content" :style="{textAlign:data.align}">
      <h2>{{ data.title?data.title:"点击设置标题" }}</h2>
      <p v-if="data.subTitle" class="sub-title">{{ data.subTitle }}</p>
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

<style>

</style>

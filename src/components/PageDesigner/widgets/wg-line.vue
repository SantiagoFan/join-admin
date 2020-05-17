<template>
  <div class="wg-line">
    <div class="line-warp" :style="data.padding?{padding:' 15px'}:{padding:'15px 0'}">
      <hr :style="{'border-top':'1px '+data.style+' '+data.color}">
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

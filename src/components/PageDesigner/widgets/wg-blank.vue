<template>
  <div class="wg-blank" :style="{'height':data.height+'px'}">
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

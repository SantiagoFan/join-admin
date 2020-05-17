<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="空白高度">
        <el-slider v-model="selectWg.height" show-input></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    selectWg: {
      type: Object,
      default: () => {}
    }
  }

}
</script>

<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="标题">
        <el-input v-model="selectWg.title"></el-input>
      </el-form-item>
      <el-form-item label="附标题">
        <el-input v-model="selectWg.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-radio v-model="selectWg.align" label="left">左对齐</el-radio>
        <el-radio v-model="selectWg.align" label="center">居中</el-radio>
        <el-radio v-model="selectWg.align" label="right">右对齐</el-radio>
      </el-form-item>
      <el-form-item label="背景颜色">
        <el-color-picker v-model="selectWg.backgroudColor" />
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

<style>

</style>

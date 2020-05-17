<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="颜色">
        <el-color-picker v-model="selectWg.color" />
      </el-form-item>
      <el-form-item label="边距">
        <el-radio v-model="selectWg.padding" :label="true">有边距</el-radio>
        <el-radio v-model="selectWg.padding" :label="false">无边距</el-radio>
      </el-form-item>
      <el-form-item label="样式">
        <el-radio v-model="selectWg.style" label="solid">实现</el-radio>
        <el-radio v-model="selectWg.style" label="dotted">虚线</el-radio>
        <el-radio v-model="selectWg.style" label="dashed">点线</el-radio>
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

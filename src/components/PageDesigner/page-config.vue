<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-collapse v-model="activeName" accordion>

        <el-form-item label="页面标题">
          <el-input v-model="pageData.config.title"></el-input>
        </el-form-item>
        <el-form-item label="页面背景色">
          <el-color-picker v-model="pageData.config.background" />
        </el-form-item>
        <el-form-item label="图片上传">

        </el-form-item>
        <el-form-item label="内容区域宽度">
          <el-radio-group v-model="pageData.config.contentWidth" size="mini">
            <el-radio-button label="100%"></el-radio-button>
            <el-radio-button label="90%"></el-radio-button>
            <el-radio-button label="80%"></el-radio-button>
            <el-radio-button label="70%"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="内容区域圆角">
          <el-switch v-model="pageData.config.borderRadius"></el-switch>
        </el-form-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      activeName: 'base'
    }
  },
  computed: {
    ...mapState({
      pageData: state => state.pageDesigner.pageData
    })
  }

}
</script>

<style>

</style>

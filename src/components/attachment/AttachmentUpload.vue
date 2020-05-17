<template>
  <div>
    <el-upload
      ref="elupload"
      class="jui-upload"
      :action="upload_url"
      :limit="10"
      multiple
      :auto-upload="true"
      list-type="picture-card"
      :show-file-list="true"
      :headers="requestHeaders"
      :on-success="uploadSuccess"
      :on-error="uploadError"
    >
      <i class="el-icon-plus"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,建议尺寸：800*800像素,最多上传10张</div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      upload_url: process.env.VUE_APP_BASE_API + 'uploadByType',
      requestHeaders: {
        'X-Token': getToken()
      }
    }
  },
  methods: {
    clearFiles() {
      this.$nextTick(res => {
        this.$refs['elupload'].clearFiles()
      })
    },
    uploadSuccess() {
      this.$emit('change')
    },
    uploadError() {
      this.$message.error('上传错误')
    }
  }
}
</script>
<style lang="scss" >

</style>


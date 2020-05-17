<template>
  <div class="app-container">
    <el-tabs v-model="type">
      <el-tab-pane name="image">
        <span slot="label"><i class="el-icon-picture-outline"></i> 图片 </span>
        <keep-alive>
          <attachmentImage />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane name="audio">
        <span slot="label"><i class="el-icon-microphone"></i> 音频 </span>
      </el-tab-pane>
      <el-tab-pane name="video">
        <span slot="label"><i class="el-icon-video-play"></i> 视频 </span>
      </el-tab-pane>
      <el-tab-pane name="file">
        <span slot="label"><i class="el-icon-document"></i> 文件 </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import attachmentImage from './components/attachment_image'

export default {
  name: 'List',
  components: { attachmentImage },

  data() {
    return {
      type: 'image'
    }
  },
  created() {
  }
}
</script>
<style lang="scss">
</style>

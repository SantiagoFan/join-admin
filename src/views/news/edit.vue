<template>
  <div class="app-container">
    <el-form ref="dataForm" :rules="rules" :model="formData" label-width="80px">
      <transition name="fade">
        <div v-show="step==1">
          <el-row>
            <el-col :span="18">
              <el-form-item label="新闻标题" prop="title">
                <el-input v-model="formData.title" placeholder="请输入新闻标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="新闻描述">
                <el-input v-model="formData.description" placeholder="请输入新闻描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="新闻图片">
                <!-- uploadListChange -->
                <AttachmentList v-model="uploadList" :limit="10" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="排序" prop="sortNumber">
                <el-input-number
                  v-model="formData.sortNumber"
                  :min="0"
                  :max="99999"
                  :precision="0"
                  :controls="false"
                  placeholder="请输入排序号"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="是否显示">
                <el-radio-group v-model="formData.isShow" size="medium">
                  <el-radio border :label="1">是</el-radio>
                  <el-radio border :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div style="padding:2px;">
                <tinymce v-model="formData.content" :height="300" />
              </div>
            </el-col>
          </el-row>
        </div>
      </transition>
    </el-form>
    <sticky :z-index="1000" direction="bottom">
      <el-card shadow="always" :body-style="{padding:'15px','text-align':'center'}">
        <el-button type="primary" icon="el-icon-upload" @click="CreateData('dataForm')">提交</el-button>
      </el-card>
    </sticky>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import AttachmentList from '@/components/attachment/AttachmentList'
import Tinymce from '@/components/Tinymce'
import api from '@/api/news'
import commonList from '@/utils/commonList'
export default {
  components: { Sticky, AttachmentList, Tinymce },
  mixins: [commonList],
  data() {
    return {
      uploadList: [], // 图片上传列表
      api,
      formData: {
        id: '',
        title: '',
        description: '',
        imgUrl: '',
        isShow: 1,
        content: '',
        sortNumber: 99999
      },
      rules: {
        title: [{ required: true, message: '请输入新闻标题', trigger: 'blur' }],
        sortNumber: [
          { required: true, message: '请输入排序号', trigger: 'blur' },
          { type: 'number', message: '排序号必须为数字值' }
        ]
      },
      step: 1
    }
  },
  computed: {
  },
  watch: {
    uploadList(v) {
      this.formData.imgUrl = v.join(',')
    }
  },
  mounted: function() {
    this.formData.id = this.$route.query.id
    if (this.formData.id) {
      this.fetchData(this.formData.id)
    }
  },
  methods: {
    CreateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api.Create(this.formData).then((response) => {
            this.$notify({ title: '成功', message: response.message, type: 'success', duration: 2000 })
            this.$router.push({ path: '/news/list' })
          })
        }
      })
    },
    fetchData(id) {
      api.fetchArticle(id).then(response => {
        this.formData = response.data
        if (response.data.imgUrl) {
          this.uploadList = response.data.imgUrl.split(',').map(res => { return { url: res } })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

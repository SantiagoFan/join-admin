<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="7">
          <el-form-item label="模板名称" prop="title">
            <el-input v-model="formData.title" placeholder="请输入模板名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="记费方式">
            <el-radio v-model="formData.expressType" :label="0">按件数</el-radio>
            <el-radio v-model="formData.expressType" :label="1">按重量</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="地区信息" prop="details">
            <FreightTable v-model="formData.details" :mode="formData.expressType" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <el-button @click="step=1">上一步</el-button>
      <el-button type="primary" icon="el-icon-upload" @click="sub">保存并查看</el-button>

    </div>
    <el-card shadow="always" :body-style="{padding:'15px','text-align':'center'}">

    </el-card>

  </div>
</template>

<script>
import FreightTable from './components/FreightTable'
import api from '@/api/fareTemplate'

export default {
  components: { FreightTable },
  data() {
    return {
      formData: {
        title: '',
        expressType: 0,
        details: []
      },
      rules: {
        title: [
          { required: true, message: '请输入模板标题', trigger: 'blur' }
        ],
        details: [
          { required: true, message: '请至少添加一条区域信息', trigger: 'blur' }
        ]
      }
    }
  },
  created: function() {
    this.formData.id = this.$route.query.id
    if (this.formData.id) {
      api.Get(this.formData.id).then(response => {
        this.formData = response.data
      })
    }
  },
  methods: {
    sub() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            api.Update(this.formData).then((response) => {
              this.$notify({ title: '成功', message: response.message, type: 'success', duration: 2000 })
              this.$router.push({ path: '/fareTemplate/list' })
            })
          } else {
            api.Create(this.formData).then((response) => {
              this.$notify({ title: '成功', message: response.message, type: 'success', duration: 2000 })
              this.$router.push({ path: '/fareTemplate/list' })
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

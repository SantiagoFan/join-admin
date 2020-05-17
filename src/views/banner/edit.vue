<template>
  <div class="app-container">
    <el-steps :active="step" simple style="margin-bottom:20px;">
      <el-step title="基本信息" icon="el-icon-edit"></el-step>
      <el-step title="详情编辑" icon="el-icon-upload"></el-step>
    </el-steps>
    <el-form ref="dataForm" :rules="rules" :model="formData" label-width="80px">
      <transition name="fade">
        <div v-show="step==1">
          <el-row>
            <el-col :span="18">
              <el-form-item label="产品名称" prop="name">
                <el-input v-model="formData.name" placeholder="请输入产品名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="产品描述">
                <el-input v-model="formData.description" placeholder="请输入产品描述"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所属分类">
                <el-cascader
                  v-model="categoryId"
                  :props="{label: 'name',value: 'id'}"
                  change-on-select
                  style="width:100%;"
                  filterable
                  clearable
                  :options="categoryOptions"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="所属分组">
                <el-select v-model="brandId" multiple filterable placeholder="请选择" style="width:100%;">
                  <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="产品图片" prop="imgUrl">
                <AttachmentList v-model="imagesFile" :limit="6" />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="外链购买" prop="outerbuyUrl">
                <el-checkbox v-model="formData.isOuterbuy" :true-label="1" :false-label="0">跳转到其他网站购买</el-checkbox>
                <el-input v-if="formData.isOuterbuy" v-model="formData.outerbuyUrl" placeholder="请输入内容">
                  <template slot="prepend">http://</template>
                </el-input>
                <div class="el-upload__tip">因特殊流程（如电影选座等）需要，可以从商品详情跳转到外部购买，最多支持50个外部购买商品</div>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="!formData.isOuterbuy" class="jui-divider">价格库存</div>

        </div>
      </transition>
    </el-form>
    <sticky :z-index="1000" direction="bottom">
      <el-button type="primary" icon="el-icon-upload" @click="sub('dataForm')">保存并查看</el-button>
    </sticky>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件

import AttachmentList from '@/components/attachment/AttachmentList'

import api from '@/api/goods'
import category from '@/api/goodsCategory'
import brand from '@/api/brand'
import fareTemplate from '@/api/fareTemplate'

export default {
  components: { Sticky, AttachmentList },
  data() {
    return {
      imagesFile: [], // 图片上传列表
      specification: [], // 规格集合
      skus: [], // sku 集合
      brandId: [], // 分组集合
      categoryId: [], // 分类集合
      leaveMessage: [], // 用户留言
      formData: {
        id: '',
        name: '',
        brandId: '',
        categoryId: '',
        isOuterbuy: 0,
        expressType: 0,
        specification: '',
        skus: [],
        content: '',
        imgUrl: '',
        stockNum: 999,
        isSaleable: 1,
        leaveMessage: '',
        isExpress: 0,
        isPickup: 0,
        surplus: 1, // 显示剩余件数 0不显示/1显示,
        purchaseLimit: 0 // 限购，0为无限制
      },
      rules: {
        imgUrl: [
          { required: true, message: '请至少上传一张产品图片', trigger: 'blur' }
        ]
      },
      step: 1,
      brandOptions: [],
      freightTemplates: [],
      categoryOptions: []
    }
  },
  watch: {
    imagesFile(v) {
      this.formData.imgUrl = v.join(',')
    },
    specification: {
      handler: function(v) {
        this.formData.specification = JSON.stringify(v)
      },
      deep: true
    }
  },
  created() {
    this.loadCategory()
    this.loadBrands()
    this.loadFareTemplate()
  },
  mounted: function() {
    this.formData.id = this.$route.query.id
    if (this.formData.id) {
      this.fetchEdit(this.formData.id)
    }
  },
  methods: {

    sub() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.formData.id) {
            api.Update(this.formData).then((response) => {
              this.$notify({ title: '成功', message: response.message, type: 'success', duration: 2000 })
              this.$router.push({ path: '/goods/list' })
            })
          } else {
            api.Create(this.formData).then((response) => {
              this.$notify({ title: '成功', message: response.message, type: 'success', duration: 2000 })
              this.$router.push({ path: '/goods/list' })
            })
          }
        }
      })
    },
    fetchEdit(id) {
      api.goodsNestedSkus(id).then(response => {
        this.formData = response.data
        // 格式转换
        if (response.data.leaveMessage) this.leaveMessage = JSON.parse(response.data.leaveMessage)// 留言
        this.imagesFile = response.data.imgUrl.split(',') // 图片处理
        if (response.data.brandId) this.brandId = this.formData.brandId.substr(1, this.formData.brandId.length - 2).split(',').map(r => Number(r))
        if (response.data.categoryId) this.categoryId = this.formData.categoryId.substr(1, this.formData.categoryId.length - 2).split(',').map(r => Number(r))
        this.specification = JSON.parse(response.data.specification)
        this.skus = response.data.skus.map(res => { // sku 处理
          return {
            ProductId: res.id,
            ProductSpec: res.spec, // 去除反斜杠
            ProductNo: res.specNo,
            ProductPrice: res.sellPrice,
            ProductCost: res.costPrice,
            ProductStock: res.stock,
            isUse: res.isUse
          }
        })
      })
    },
    goStep() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) { this.step = 2 }
      })
    },

    loadCategory() {
      category.get().then(res => {
        this.categoryOptions = res.data
      })
    },
    loadBrands() {
      brand.getBrands({}).then(res => {
        this.brandOptions = res.data.items
      })
    },
    loadFareTemplate() {
      fareTemplate.LoadAll().then(res => {
        this.freightTemplates = res.data
        this.$message({ message: '重新加载成功', type: 'success' })
      })
    }

  }
}
</script>

<style lang="scss" scoped>

</style>

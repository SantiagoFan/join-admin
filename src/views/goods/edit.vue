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
          <el-row v-if="!formData.isOuterbuy">
            <el-col>
              <!--SKU-->
              <el-form-item label="产品规格">
                <SkuSpec v-model="specification"></SkuSpec>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="规格明细">
                <SkuTable v-model="skus" :specification.sync="specification"></SkuTable>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="销售价格" prop="price">
                <el-input-number v-model="formData.price" :min="0" :precision="2" :disabled="skus.length > 0" placeholder="请输入销售价格"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市场价格">
                <el-input-number v-model="formData.marketPrice" :min="0" :precision="2" placeholder="请输入市场价格"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item label="库存" prop="stockNum">
                <el-input-number v-model="formData.stockNum" :min="0" :precision="0" :disabled="skus.length > 0" placeholder="请输入库存"></el-input-number>
                <div class="el-upload__tip">
                  <el-checkbox v-model="formData.surplus" :true-label="1" :false-label="0">商品详情不显示剩余件数</el-checkbox><br>
                  库存为 0 时，会放到『已售罄』的商品列表里，保存后买家看到的商品可售库存同步更新
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成本价格">
                <el-input-number v-model="formData.costPrice" size="small" :min="0" :precision="2"></el-input-number>
                <div class="el-upload__tip">
                  成本价未来会用于营销建议，利润分析等
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <div v-if="!formData.isOuterbuy" class="jui-divider">物流信息</div>
          <el-row v-if="!formData.isOuterbuy">
            <el-col :span="18">
              <el-form-item label="配送方式" prop="isExpress">
                <el-checkbox v-model="formData.isExpress" :true-label="1" :false-label="0">快递发货</el-checkbox>
                <el-checkbox v-model="formData.isPickup" :true-label="1" :false-label="0">到店自提</el-checkbox>
              </el-form-item>
            </el-col>
            <el-form-item v-if="formData.isExpress == 1" prop="Express">
              <el-col :span="18">
                <el-radio v-model="formData.expressType" :label="0">统一运费</el-radio>
                <el-input-number v-model="formData.expressCost" :disabled="formData.expressType!='0'" size="small" :min="0" :precision="2"></el-input-number>
              </el-col>
              <el-col :span="18">
                <el-radio v-model="formData.expressType" :label="1">运费模板</el-radio>
                <el-select v-model="formData.expressTemplate" :disabled="formData.expressType!='1'" size="small" filterable placeholder="请选择模板">
                  <el-option v-for="item in freightTemplates" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button type="text" @click="loadFareTemplate">刷新</el-button>
                <el-link type="primary" target="_blank" href="#/fareTemplate/edit">&nbsp;新建</el-link>
                <div class="el-upload__tip">运费模板支持按地区设置运费，按购买件数计算运费，按重量计算运费等</div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
      </transition>
      <transition name="fade">
        <div v-show="step==2">
          <el-row>
            <el-col>
              <tinymce v-model="formData.content" :height="300" />
            </el-col>
          </el-row>
          <div class="jui-divider">其他信息</div>
          <el-row>
            <el-radio-group v-model="formData.isSaleable">
              <el-form-item label="上架时间" prop="isSaleable">
                <el-col :span="18">
                  <el-radio :label="1">立即上架售卖</el-radio>
                </el-col>
                <el-col :span="18">
                  <el-radio :label="0">暂不售卖，放入仓库</el-radio>
                </el-col>
                <el-col :span="18">
                  <el-radio :label="2">自定义上架时间</el-radio>
                  <el-date-picker
                    v-model="formData.customTime"
                    size="small"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM-dd HH:mm:ss"
                    :disabled="formData.isSaleable!='2'"
                  >
                  </el-date-picker>
                </el-col>
              </el-form-item>
            </el-radio-group>
            <el-form-item label="限制">
              <el-col :span="18">
                <label class="el-form-item__label">每个买家帐号累计限购
                  <el-input-number v-model="formData.purchaseLimit" size="small" :min="0" :precision="0" style="margin: 0 8px;"></el-input-number>件&nbsp;&nbsp;<label style="color:red;">(为0则表示不限制)</label>
                </label>
              </el-col>
            </el-form-item>
            <el-form-item label="留言">
              <el-col v-for="(item,index) in leaveMessage" :key="index" :span="18">
                <el-input v-model="item.msgTitle" size="small" placeholder="留言" style="width:100px;"></el-input>
                <el-select v-model="item.type" size="small" filterable placeholder="请选择类型">
                  <el-option label="文本" :value="1"></el-option>
                  <el-option label="数字" :value="2"></el-option>
                </el-select>
                &nbsp;<el-checkbox v-model="item.isMultiple" lable="多行">多行</el-checkbox>
                <el-checkbox v-model="item.isRequire" lable="必填">必填</el-checkbox>
                <el-link type="primary" @click="delMsg(index)">删除</el-link>
              </el-col>
              <el-col :span="18">
                <el-link type="primary" @click="addMsg">+添加</el-link><br>
                <div class="el-upload__tip">购买商品时让买家输入留言，最多可设置 10 条留言</div>
              </el-col>
            </el-form-item>
          </el-row>
        </div>
      </transition>
    </el-form>
    <sticky :z-index="1000" direction="bottom">
      <el-card shadow="always" :body-style="{padding:'15px','text-align':'center'}">
        <el-button v-if="step==2" @click="step=1">上一步</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="sub('dataForm')">保存并查看</el-button>
        <el-button v-if="step==1" @click="goStep">下一步</el-button>
      </el-card>
    </sticky>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import SkuTable from '@/components/SKU/SkuTable'
import SkuSpec from '@/components/SKU/SkuSpec'
import Tinymce from '@/components/Tinymce'
import AttachmentList from '@/components/attachment/AttachmentList'

import api from '@/api/goods'
import category from '@/api/goodsCategory'
import brand from '@/api/brand'
import fareTemplate from '@/api/fareTemplate'

export default {
  components: { Sticky, SkuTable, SkuSpec, AttachmentList, Tinymce },
  data() {
    // 自定义验证规则
    var v_outerbuyUrl = (rule, value, callback) => {
      if (this.formData.isOuterbuy) {
        if (!value) {
          return callback(new Error('外链购买产品外链地址不能为空'))
        }
      }
      return callback()
    }
    var v_isExpress = (rule, value, callback) => {
      if (this.formData.isExpress === 0 && this.formData.isPickup === 0) {
        return callback(new Error('请至少选择一种配送方式'))
      }
      return callback()
    }
    var v_Express = (rule, value, callback) => {
      if (this.formData.isExpress) {
        if (this.formData.expressType === 0) {
          if (this.formData.expressCost === undefined) return callback(new Error('请输入统一运费'))
        } else {
          if (this.formData.expressTemplate === undefined) return callback(new Error('请选择运费模板'))
        }
      }
      return callback()
    }
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
        name: [
          { required: true, message: '请输入产品标题', trigger: 'blur' }
        ],
        imgUrl: [
          { required: true, message: '请至少上传一张产品图片', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        outerbuyUrl: [{ validator: v_outerbuyUrl, trigger: 'blur' }],
        isExpress: [{ validator: v_isExpress, trigger: 'blur' }],
        Express: [{ validator: v_Express, trigger: 'blur' }]
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
    },
    skus: {
      handler: function(v) {
        this.formData.skus = v.map(res => {
          return {
            id: res.ProductId,
            spec: res.ProductSpec,
            specNo: res.ProductNo,
            sellPrice: res.ProductPrice,
            costPrice: res.ProductCost,
            stock: res.ProductStock,
            isUse: res.isUse
          }
        })
        let smallestSellPrice = 0
        const skus = this.formData.skus
        if (skus.length > 0) {
          smallestSellPrice = skus[0].sellPrice
          let stockSum = 0
          skus.forEach(res => {
            if (res.sellPrice < smallestSellPrice) smallestSellPrice = res.sellPrice
            stockSum += res.stock
          })
          this.formData.price = smallestSellPrice
          this.formData.stockNum = stockSum
        }
      },
      deep: true
    },
    leaveMessage(v) {
      this.formData.leaveMessage = JSON.stringify(v)
    },
    brandId(v) {
      if (v.length > 0) { this.formData.brandId = ',' + v.join(',') + ',' } else { this.formData.brandId = '' }
    },
    categoryId(v) {
      if (v.length > 0) this.formData.categoryId = ',' + v.join(',') + ','
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
    addMsg() {
      if (this.leaveMessage.length + 1 > 10) {
        return
      }
      this.leaveMessage.push({
        'msgTitle': '',
        'type': 1,
        isMultiple: false,
        isRequire: false
      })
    },
    delMsg(index) {
      this.leaveMessage.splice(index, 1)
    },
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

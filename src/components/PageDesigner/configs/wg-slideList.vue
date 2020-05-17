<template>
  <div>
    <el-form label-position="top">

      <el-form-item label="标题名称">
        <el-input v-model="selectWg.title"></el-input>
      </el-form-item>
      <el-form-item label="查看更多">
        <el-input v-model="selectWg.url" placeholder="请输入包含https://的链接"></el-input>
      </el-form-item>
      <el-form-item label="所属分组">
        <el-select v-model="selectWg.brandId" multiple filterable placeholder="请选择" style="width:100%;">
          <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示数量">
        <el-input-number v-model="selectWg.number" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="商品倒角">
        <el-radio v-model="selectWg.fillet" :label="false">直角</el-radio>
        <el-radio v-model="selectWg.fillet" :label="true">圆角</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import brand from '@/api/brand'
export default {
  props: {
    selectWg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      brandOptions: []
    }
  },
  created() {
    this.loadBrands()
  },
  methods: {
    loadBrands() {
      brand.getBrands({}).then(res => {
        this.brandOptions = res.data.items
      })
    }
  }
}
</script>

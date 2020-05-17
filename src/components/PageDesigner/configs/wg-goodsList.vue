<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="产品分组">
        <el-select v-model="selectWg.brandId" multiple filterable placeholder="请选择" style="width:100%;">
          <el-option v-for="item in brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="显示数量">
        <el-input-number v-model="selectWg.number" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="页面边距">
        <el-slider v-model="selectWg.padding" :max="30"></el-slider>
      </el-form-item>
      <el-form-item label="商品间距">
        <el-slider v-model="selectWg.goodsInterval" :max="30"></el-slider>
      </el-form-item>
      <el-form-item label="列表样式">
        <el-radio v-model="selectWg.listStyle" :label="0">大图模式</el-radio>
        <el-radio v-model="selectWg.listStyle" :label="1">一行两图</el-radio>
        <el-radio v-model="selectWg.listStyle" :label="2">一行三图</el-radio>
        <el-radio v-model="selectWg.listStyle" :label="3">详情列表</el-radio>
      </el-form-item>
      <el-form-item label="商品样式">
        <el-radio v-model="selectWg.goodsStyle" label="style1">无边白底</el-radio>
        <el-radio v-model="selectWg.goodsStyle" label="style2">卡片投影</el-radio>
        <el-radio v-model="selectWg.goodsStyle" label="style3">描边白底</el-radio>
        <el-radio v-model="selectWg.goodsStyle" label="style4">无边无底</el-radio>
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
  components: { },
  props: {
    selectWg: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      limit: 1,
      dialogVisible: false,
      edit_index: null, // 当前编辑索引 添加为空 修改为具体索引,
      brandOptions: []
    }
  },
  created() {
    this.loadBrands()
  },
  methods: {
    hiddenDelete(index) {
      this.selectWg.list.splice(index, 1)
    },
    showDiglog(index) {
      // 添加和修改限制选择数量
      this.edit_index = index === undefined ? null : index
      this.limit = index === undefined ? (10 - this.selectWg.list.length) : 1
      this.dialogVisible = true
    },
    hiddenSelect() {
      this.dialogVisible = false
      this.$refs['AttachmentSelect'].clearSelectItems()
    },
    setSelect() {
      const items = this.$refs['AttachmentSelect'].getSelectItems()
      if (this.edit_index != null) { // 修改
        this.selectWg.list[this.edit_index].src = items[0].savePath
      } else { // 新增
        items.forEach(element => {
          this.selectWg.list.push({ src: element.savePath })
        })
      }
      this.dialogVisible = false
      this.$refs['AttachmentSelect'].clearSelectItems()
    },
    loadBrands() {
      brand.getBrands({}).then(res => {
        this.brandOptions = res.data.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-item{
  &.ghost {
    background: #fff;
    border: 1px dashed blue;
    &::after {
        background: #fff;
    }
  }
  cursor: move;
  margin: 10px;
  background-color: #fdfbfb;
  border:1px dashed #e5e5e5;
  padding: 10px 10px 5px 10px;
  position: relative;
  text-align: center;
  &.btn{
    cursor: pointer;
    color: #1890FF;
    label{
      color: #999;
      display: block;
      font-size: 12px;
      line-height: 12px;
      margin-bottom: 10px;
    }
  }
  .el-input{
    margin-bottom: 10px;
  }
  .el-image{
    float: left;width: 80px; height: 80px;
    cursor: pointer;
  }
  .actions{
    position:absolute;
    color: #bbb;
    display: none;
    right: -10px;
    top:-10px;
    font-size: 22px;
    cursor: pointer;
  }
  &:hover .actions{ display: block;}
}
</style>

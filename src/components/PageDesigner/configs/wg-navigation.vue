<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="导航样式">
        <el-radio v-model="selectWg.style" :label="0">图文导航</el-radio>
        <el-radio v-model="selectWg.style" :label="1">文字导航</el-radio>
      </el-form-item>
      <el-form-item label="页面边距">
        <el-slider v-model="selectWg.padding" :max="30"></el-slider>
      </el-form-item>
      <el-form-item label="颜色设置">
        <el-color-picker v-model="selectWg.fontColor" />
        <el-color-picker v-model="selectWg.backgroudColor" />
      </el-form-item>
      <el-form-item label="展示图片(最多添加10个广告，鼠标拖拽调整广告顺序)">
        <draggable
          :list="selectWg.list"
          :options="{ ghostClass: 'ghost',animation: 100}"
        >
          <div v-for="(item,index) in selectWg.list" :key="index" class="banner-item">
            <div v-if="selectWg.style==0" @click="showDiglog(index)">
              <el-image :src="item.src" fit="cover"></el-image>
            </div>
            <div style="margin-left:100px">
              <el-input v-model="item.title" clearable size="small" placeholder="请输入标题(可不填)"></el-input>
              <el-input v-model="item.url" clearable size="small" placeholder="请输入链接(可不填)"></el-input>
            </div>
            <div class="actions" @click="hiddenDelete(index)">
              <i class="el-icon-error"></i>
            </div>
          </div>
        </draggable>
        <div v-if="selectWg.list.length!=10" class="banner-item btn" @click="showDiglog()">+ 点击添加图文
          <label>还可以添加 {{ 10-selectWg.list.length }} 个</label>
        </div>
      </el-form-item>
    </el-form>
    <!-- 素材选择 -->
    <el-dialog
      width="900px"
      :visible.sync="dialogVisible"
    >
      <AttachmentSelect ref="AttachmentSelect" :limit="limit" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenSelect">取 消</el-button>
        <el-button type="primary" @click="setSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AttachmentSelect from '@/components/attachment/AttachmentSelect'
import draggable from 'vuedraggable'
export default {
  components: { AttachmentSelect, draggable },
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
      edit_index: null // 当前编辑索引 添加为空 修改为具体索引
    }
  },
  methods: {
    hiddenDelete(index) {
      this.selectWg.list.splice(index, 1)
    },
    showDiglog(index) {
      if (this.selectWg.style === 0 && index === undefined) {
        this.selectWg.list.push({ })
        return
      }
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

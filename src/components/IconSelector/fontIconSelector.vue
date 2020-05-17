<template>
  <div class="icon-container">
    <div class="icon-item selected" @click="isShow=true">
      <i :class="'el-icon-' + (value?value:'info')" />
      <span>点击选择图标</span>
    </div>
    <el-dialog
      title="字体图标选择"
      :visible.sync="isShow"
      width="800px"
      append-to-body
      @close="hidden"
    >
      <div class="icons">
        <div v-for="item of iconsMap" :key="item" class="icon-item" :class="{'on':item==value}" @click="items_select(item)">
          <i :class="'el-icon-' + item" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        {{ value }}
        <el-button type="primary" @click="hidden">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elementIcons from './element-icon'
export default {
  name: 'IconSelector',
  props: {
    value: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      isShow: false,
      iconsMap: elementIcons
    }
  },
  methods: {
    items_select(item) {
      this.$emit('input', item)
    },
    hidden() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
 .icon-item{
    display: inline-block;
    height: 50px;
    line-height: 45px;
    text-align: center;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    padding: 0px 10px;
    box-sizing: border-box;
    border-radius: 5px;
    border: 1px solid #fff;
    &:hover,&.on{
      border: 1px solid #ddd;
      color: #1890ff;
    }
  }
  .selected{
    span{ font-size: 14px; color: #606266;}
  }
.icons{
  height: 400px;;
  overflow-y:auto;
}
</style>

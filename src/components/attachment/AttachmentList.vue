<template>
  <div>
    <ul>
      <li v-for="(i,index) in value" :key="index" class="item">
        <el-image
          style="width: 100px; height: 100px"
          :src="i+'!size=s'"
        ></el-image>
        <span class="item-actions" @click="itemDelete(index)"><i class="el-icon-delete"></i></span>
      </li>
      <li v-if="value.length < limit" class="item" @click="dialogVisible = true"><i class="el-icon-plus"></i>
      </li>
    </ul>
    <el-dialog
      width="900px"
      :visible.sync="dialogVisible"
    >
      <AttachmentSelect ref="AttachmentSelect" :limit="limit-value.length" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="hiddenSelect">取 消</el-button>
        <el-button type="primary" @click="setSelect">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AttachmentSelect from './AttachmentSelect'

export default {
  name: 'AttachmentList',
  components: { AttachmentSelect },
  props: {
    value: {
      type: Array,
      default: function() { return [] }
    },
    limit: { // 文件数量限制
      type: Number,
      default: 5
    },
    valuetype: { // 传出值的类型  附件对象obj/附件 id /附件路径url 待完善
      type: String,
      default: 'url'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    hiddenSelect() {
      this.dialogVisible = false
      this.$refs['AttachmentSelect'].clearSelectItems()
    },
    setSelect() {
      const items = this.$refs['AttachmentSelect'].getSelectItems()
      items.forEach(element => {
        this.value.push(element.savePath)
      })
      this.dialogVisible = false
      this.$refs['AttachmentSelect'].clearSelectItems()
    },
    itemDelete(i) {
      this.value.splice(i, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.item{
  width: 100px;
  height: 100px;
  border-radius: 6px;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  display: inline-block;
  overflow: hidden;
  margin: 0 8px 8px 0;
  line-height: 100px;
  text-align: center;
  cursor: pointer;
  font-size: 28px;
  color: #8c939d;
  position: relative;
  .item-actions{
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    transition:opacity .3s;
    -webkit-transition:opacity .3s;
    &:hover{opacity: 1;}
  }
}

</style>

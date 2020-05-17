<template>
  <div class="attachment-container">
    <!--动作组-->
    <div style="padding-bottom:10px;">
      <el-button size="mini" class="action-item" type="primary" icon="el-icon-edit" @click="show_upload">上传图片</el-button>
      <span style="float:right">还可以选择：{{ canSelect }} 项</span>
    </div>
    <el-row>
      <el-col :span="4">
        <AttachmentGroup type="image" @change="groupChange" />
      </el-col>
      <el-col :span="20" style="height:512px;">
        <div class="list-container">
          <div v-for="o in list" :key="o.id" class="list-item" :class="{'active':o.isChecked}">
            <div @click="itemisChecked(o)">
              <el-image :src="o.savePath" fit="cover" style="width:120px;height:120px;">
              </el-image>
            </div>
            <div class="actions">
              {{ o.originalName }}
            </div>
          </div>
        </div>

        <!--分页-->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData"></pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <el-dialog
      title="本地上传"
      :visible.sync="upload_show"
      width="800px"
      append-to-body
      @close="hidden_upload"
    >
      <div>
        <AttachmentUpload ref="Uploader" @change="fileChane" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="hidden_upload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/attachment'
import commonList from '@/utils/commonList'
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import AttachmentGroup from './AttachmentGroup'
import AttachmentUpload from './AttachmentUpload'

export default {
  name: 'AttachmentSelect',
  components: { Pagination, AttachmentGroup, AttachmentUpload },
  mixins: [commonList],
  props: {
    limit: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      upload_show: false,
      // api接口方法
      api,
      // 额外过滤条件
      listQuery: {
        limit: 15,
        groupId: null,
        type: 'image'
      }
    }
  },
  computed: {
    canSelect() {
      return this.limit - this.getSelectItems().length
    }
  },
  methods: {
    itemisChecked(o) {
      if (o.isChecked === true) { o.isChecked = false } else if (this.canSelect > 0) {
        o.isChecked = true
      }
    },
    fileChane() { // 新文件上传成功后重新加载列表
      if (this.listQuery.groupId == null) { // 仅仅加载未分组
        this.loadData()
      }
    },
    afterLoadData(list) {
      list.forEach(re => { re.isChecked = false })
      return list
    },
    groupChange(group, list) {
      this.listQuery.groupId = group.id
      this.loadData()
    },
    show_upload() {
      this.upload_show = true
    },
    hidden_upload() {
      this.upload_show = false
      this.$nextTick(res => {
        this.$refs.Uploader.clearFiles()
      })
    },
    getSelectItems() {
      const selectItem = []
      this.list.forEach(ele => {
        if (ele.isChecked) { selectItem.push(ele) }
      })
      return selectItem
    },
    clearSelectItems() {
      this.list.forEach(ele => {
        ele.isChecked = false
      })
    },
    getSelectIds() {
      const selectIds = []
      this.list.forEach(ele => {
        if (ele.isChecked) { selectIds.push(ele.id) }
      })
      return selectIds
    }
  }
}
</script>
<style lang="scss">
.attachment-container{
  width: 860px;
   .pagination-container{
    padding: 10px;
  }
}
.list-container{
  overflow: hidden;
  height: 460px;

  .list-item{
    padding: 0 10px;
    width: 143px;
    float: left;
    margin-bottom: 10px;
    cursor: pointer;
     .el-image{
        border: 2px solid #fff;
      }
    &.active{
      .el-image{
        border: 2px solid #07d;
      }
      .actions{
        color: #07d;
      }
    }
  }
  .el-col{
    padding-bottom: 20px;
  }
  .actions{
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    overflow: hidden; color: #a9a9a9;
  }

}

</style>

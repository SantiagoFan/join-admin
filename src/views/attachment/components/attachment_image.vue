<template>
  <div class="attachment-container">
    <!--动作组-->
    <div class="action-container">
      <el-button size="mini" class="action-item" type="primary" icon="el-icon-edit" @click="show_upload">上传图片</el-button>
    </div>
    <el-row>
      <el-col :span="4">
        <AttachmentGroup type="image" :editable="true" @change="groupChange" />
      </el-col>
      <el-col :span="20">
        <div class="list-container">
          <div v-for="o in list" :key="o.id" class="list-item">
            <el-image :src="o.savePath+'!size=ss'" :large="o.savePath" fit="cover" style="width:170px;height:170px;" preview="0">
            </el-image>
            <div class="actions">
              <el-checkbox v-model="o.isChecked">{{ o.originalName }}</el-checkbox>
              <div style="padding-top:7px;">
                <el-link type="primary" @click="show_rename(o)">修改</el-link> |
                <el-link type="primary" @click="show_delete(o)">删除</el-link> |
                <el-popover placement="bottom" width="286" trigger="click">
                  <el-input v-model="o.savePath" disabled size="small" style="width:200px;" />
                  <el-button v-clipboard:copy="o.savePath" v-clipboard:success="clipboardSuccess" size="small" type="primary">复制</el-button>
                  <el-link slot="reference" type="primary">链接</el-link>
                </el-popover>
              </div>
            </div>
          </div>
          <div class="list-actions">
            <el-button icon="el-icon-edit" @click="show_regroup()">批量修改分组</el-button>
            <el-button icon="el-icon-delete" @click="show_delete(null)">批量删除</el-button>
          </div>
        </div>

        <!--分页-->
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="loadData"></pagination>
      </el-col>
    </el-row>
    <!-- 修改名称分组弹窗 -->
    <el-dialog
      title="修改"
      :visible.sync="rename_show"
      width="30%"
    >
      <div>
        <el-input v-model="rename_title" type="text" />
        <el-select v-model="regroup_id" style="width:100%;margin-top:10px;" placeholder="请选择分组">
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rename_show = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate('rename')">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改分组弹窗 -->
    <el-dialog
      title="设置分组"
      :visible.sync="regroup_show"
      width="30%"
    >
      <div>
        <el-select v-model="regroup_id" style="width:100%" placeholder="请选择分组">
          <el-option
            v-for="item in groupList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="regroup_show = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdate('regroup')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增弹窗 -->
    <el-dialog
      title="本地上传"
      :visible.sync="upload_show"
      width="800px"
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
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import Pagination from '@/components/Pagination' // 分页 给予 el-pagination 的二次封装
import AttachmentGroup from '@/components/attachment/AttachmentGroup'
import AttachmentUpload from '@/components/attachment/AttachmentUpload'

export default {
  name: 'AttachmentImage',
  components: { Pagination, AttachmentGroup, AttachmentUpload },
  directives: { clipboard },
  mixins: [commonList],
  data() {
    return {
      rename_title: '',
      regroup_id: null,
      edit_mode: 'single', // 重命名/重分组 模式：批量
      current_edit_ids: [], // 当前编辑ID
      rename_show: false,
      regroup_show: false,
      upload_show: false,
      // api接口方法
      api,
      groupList: [],
      // 额外过滤条件
      listQuery: {
        groupId: null,
        type: 'image'
      }
    }
  },
  created() {
    // this.loadData() // 页面加载创建时加载数据 -》修改成分组列表加载完触发
  },
  methods: {
    fileChane() { // 新文件上传成功后重新加载列表
      if (this.listQuery.groupId == null) { // 仅仅加载未分组
        this.loadData()
      }
    },
    groupChange(group, list) {
      this.groupList = list
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
    show_rename(item) { // 重命名
      this.rename_show = true
      this.rename_title = item.originalName
      this.regroup_id = item.groupId
      this.current_edit_ids = [item.id]
    },
    show_regroup() { // 批量分组
      this.rename_title = null
      this.regroup_id = null
      this.current_edit_ids = this.getSelectIds()
      if (this.current_edit_ids.length > 0) {
        this.regroup_show = true
      } else {
        this.$message({ message: '请选择要进行重分组的数据', type: 'warning' })
      }
    },
    show_delete(item) { // 删除/批量删除
      if (item) {
        this.current_edit_ids = [item.id]
        this.handleDelete()
      } else {
        this.current_edit_ids = this.getSelectIds()
        if (this.current_edit_ids.length > 0) {
          this.handleDelete()
        } else {
          this.$message({ message: '请选择要进行删除的数据', type: 'warning' })
        }
      }
    },
    handleUpdate(actionType) {
      api.Update({
        ids: this.current_edit_ids,
        originalName: this.rename_title,
        groupId: this.regroup_id
      }).then(res => {
        this.rename_show = false
        this.regroup_show = false
        this.loadData()
        this.$message({ type: 'success', message: '修改成功!' })
      })
    },
    handleDelete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示').then(() => {
        api.Delete({ ids: this.current_edit_ids }).then(res => {
          this.loadData()
          this.$message({ type: 'success', message: '删除成功!' })
        })
      })
    },
    getSelectIds() {
      const selectIds = []
      this.list.forEach(ele => {
        if (ele.isChecked) { selectIds.push(ele.id) }
      })
      return selectIds
    },
    getSelectItems() {
      const selectItem = []
      this.list.forEach(ele => {
        if (ele.isChecked) { selectItem.push(ele) }
      })
      return selectItem
    },
    clipboardSuccess() {
      this.$message({ message: '复制成功', type: 'success', duration: 1500 })
    }
    /*,
    generateSquareScaledImagePath(path) {
      const lastIndexOfSlash = path.lastIndexOf('/')
      return path.slice(0, lastIndexOfSlash + 1) + 's_s_' + path.slice(lastIndexOfSlash + 1, path.length)
    }*/
  }
}
</script>
<style lang="scss">
.list-container{
  padding-left: 20px;
  overflow: hidden;
  .list-item{
    padding: 0 15px;
    width: 200px;
    float: left;
    cursor: pointer;
    margin-bottom: 20px;
  }
  .list-actions{
    clear: both;
    padding-top: 10px;
  }
  .el-col{
    padding-bottom: 20px;
  }
  .actions{
    padding-top: 5px;
    .el-checkbox__label{ font-size: 12px;}
    overflow: hidden; color: #a9a9a9;
  }
}

</style>

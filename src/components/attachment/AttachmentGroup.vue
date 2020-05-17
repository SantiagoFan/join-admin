<template>
  <div class="category-container">
    <div v-if="editable">
      <div class="group_title">{{ current_group.name }}</div>
      <el-button-group v-show="current_group.id != null">
        <el-button v-popover:edit_popover size="mini" icon="el-icon-edit" />
        <el-button v-popover:delete_popover size="mini" icon="el-icon-delete" />
      </el-button-group>
    </div>
    <div v-for="(item,index) in list" :key="item.id" class="category-item" :class="item.id === current_group.id?'active':''" @click="Change(index)">
      <span class="category-name"> {{ item.name }}</span>
      <span class="category-num">100</span>
    </div>
    <div v-if="editable">
      <!--新增-->
      <el-popover v-model="add_show" placement="bottom" width="200" trigger="click">
        <el-input v-model="add_title" type="text" size="small" placeholder="请输入分类名称" maxlength="6" show-word-limit />
        <div style="text-align: right;margin-top:10px;">
          <el-button size="mini" type="text" @click="add_show = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleCreate">确定</el-button>
        </div>
        <el-button slot="reference" style="margin-top:10px;" size="small"> + 添加分组</el-button>
      </el-popover>
      <!--修改-->
      <el-popover ref="edit_popover" v-model="edit_show" placement="bottom" width="200" trigger="click">
        <el-input v-model="edit_title" type="text" size="small" placeholder="请输入分类名称" maxlength="6" show-word-limit />
        <div style="text-align: right;margin-top:10px;">
          <el-button size="mini" type="text" @click="edit_show = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleEdit">确定</el-button>
        </div>
      </el-popover>
      <!--删除-->
      <el-popover ref="delete_popover" v-model="delete_show" placement="top" width="160">
        <p>仅删除分组，不删除图片，组内图片将自动归入未分组</p>
        <div style="text-align: right;">
          <el-button size="mini" type="text" @click="delete_show = false">取消</el-button>
          <el-button type="primary" size="mini" @click="handleDelete">确定</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import api from '@/api/attachmentGroup' // 和数据交互相关写在api 方便复用

export default {
  name: 'AttachmentGroup',
  props: {
    type: {
      type: String,
      default: 'image'
    },
    editable: { // 是否可以 新增修改删除
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      api,
      add_show: false,
      edit_show: false,
      delete_show: false,
      current_group: { id: null, name: '未分组' },
      current_index: 0,
      add_title: '',
      edit_title: '',
      list: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    handleCreate() {
      this.api.Create({
        name: this.add_title,
        type: this.type
      }).then(res => {
        if (res.code === 20000) {
          this.loadData()
          this.add_show = false
        }
      })
    },
    handleEdit() {
      this.api.Update({ id: this.current_group.id, name: this.edit_title }).then(res => {
        if (res.code === 20000) {
          this.current_group.name = this.edit_title
          this.edit_show = false
        }
      })
    },
    handleDelete() {
      this.api.Delete({ id: this.current_group.id }).then(res => {
        if (res.code === 20000) {
          this.list.splice(this.current_index, 1)
          this.reset()
          this.delete_show = false
        }
      })
    },
    loadData() {
      this.api.Query({ type: this.type }).then(res => {
        this.list = res.data
        this.reset()
      })
    },
    Change(index) {
      this.current_group = this.list[index]
      this.edit_title = this.current_group.name
      this.current_index = index
      this.$emit('change', this.list[index], this.list)
    },
    reset() {
      // 重新设置到 未分类
      this.Change(0)
    }
  }
}
</script>
<style lang="scss">
.category-container{
  text-align: center;
  background-color: #f8f8f8;
  padding: 20px 0px;
  font-size: 12px;
  .group_title{
    padding-bottom: 10px;
  }
  .el-button-group{
    padding-bottom: 10px;
  }
  .category-item{
    text-align: left;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;

    cursor: pointer;
    position: relative;
    &.active{
      background-color: #fff;
    }
  }
  .category-name{
    width: 80px;
    display: inline-block;
  }
  .category-num{
      position: absolute;
      top:0;
      right: 8px;
      color: #999;
    }
}
</style>

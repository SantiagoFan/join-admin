<template>
  <div class="app-container">
    <div class="action-container">
      <el-button size="mini" class="action-item" plain type="primary" icon="el-icon-plus" @click="handleCreateLevelOne">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%;"
      row-key="id"
      border
    >
      <el-table-column label="标题" prop="title">
        <template slot-scope="scope">
          <span> <svg-icon v-if="scope.row.icon" :icon-class="scope.row.icon" /> {{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" prop="path" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.path }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="orderNum" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.orderNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="组件" prop="component" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.component }}</span>
        </template>
      </el-table-column>
      <el-table-column label="重定向" prop="redirect" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.redirect }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.level < 2" type="primary" size="mini" plain icon="el-icon-plus" @click="handleCreate(scope.row)">添加</el-button>
          <el-button type="primary" size="mini" plain icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button v-if="scope.row.children.length < 1" size="mini" type="danger" plain icon="el-icon-delete" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="temp.path" />
        </el-form-item>
        <el-form-item label="组件" prop="component">
          <el-input v-model="temp.component" />
        </el-form-item>
        <el-form-item label="排序号" prop="orderNum">
          <el-input-number v-model="temp.orderNum" :min="1" />
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="temp.redirect" />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <IconSelector v-model="temp.icon" />
        </el-form-item>
        <el-form-item label="是否隐藏" prop="hidden">
          <el-checkbox v-model="temp.hidden" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/module'
import IconSelector from '@/components/IconSelector/svgIconSelector'

export default {
  components: { IconSelector },
  data() {
    return {
      tableData: [],
      listQuery: {
        search: undefined
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      temp: {
        id: undefined,
        name: '',
        parentId: '',
        title: '',
        path: '',
        orderNum: '',
        component: '',
        redirect: '',
        alwaysShow: '',
        icon: '',
        hidden: '',
        level: ''
      },
      rules: {
        name: [{ required: true, message: '请填入名称', trigger: 'blur' }],
        title: [{ required: true, message: '请填入标题', trigger: 'blur' }],
        path: [{ required: true, message: '请填入路径', trigger: 'blur' }],
        component: [{ required: true, message: '请填入组件名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // load(tree, treeNode, resolve) {
    //   resolve(
    //     this.getList()
    //   )
    // },
    getList() {
      api.get().then(response => {
        this.tableData = response.data
      })
    },
    handleFilter() {
      this.getList()
    },
    handleCreate(row) {
      this.resetTemp()
      this.temp.parentId = row.id
      this.temp.level = row.level + 1
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleCreateLevelOne() {
      this.resetTemp()
      this.temp.parentId = 0
      this.temp.level = 1
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        parentId: '',
        title: '',
        path: '',
        orderNum: '',
        component: '',
        redirect: '',
        alwaysShow: '',
        icon: '',
        hidden: '',
        level: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          api.add(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          api.update(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.delete(row.id).then(() => {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    }
  }
}
</script>

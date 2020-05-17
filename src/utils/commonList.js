// 通用列表页方法，应用于页面 minxs
import commonListFliters from './commonListFliters'

export default {
  mixins: [commonListFliters],
  data() {
    return {
      list: [], // 数据列表对象
      total: 0, // 记录总数
      Field: 'id',
      listQuery: {
        page: 1,
        limit: 10, // 页大小
        order: 'id', // 默认排序方式,
        sort: 'DESC'
      },
      listLoading: true, // 正在加载标志
      downloadLoading: false, // 正在下载标志
      ExportFields: ['id'], // 下载表格字段
      dialogFormVisible: false, // 编辑窗体显示标志
      dialogStatus: '' // 窗体编辑类型 新增 create/update
      // 以下字段请在页面重写
      // rules: {}, // 表单提交验证规则
    }
  },
  methods: {
    // 显示添加窗体
    HandleCreate(type) {
      if (this.$refs.singleTable.selection.length > 0) {
        var newObj = {}
        newObj['ids'] = this.$refs.singleTable.selection.map(a => a[this.Field])
        newObj['type'] = type
        this.api.goodsSaleable(newObj).then(res => {
          if (res.code === 20000) {
            this.$message({ message: '操作成功', type: 'success' })
            this.SearchData() // 重新加载数据
          } else {
            this.$message({ message: '操作失败', type: 'error' })
          }
        })
      } else {
        this.$message({ message: '请选择要操作的数据', type: 'error' })
      }
    },
    // 提交添加
    CreateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.api.Create(this.temp).then((response) => {
            this.dialogFormVisible = false
            this.SearchData()
            this.$notify({ title: '成功', message: '创建成功', type: 'success', duration: 2000 })
          })
        }
      })
    },
    // 提交删除
    BatchDelete() {
      if (this.$refs.singleTable.selection.length > 0) {
        var ids = this.$refs.singleTable.selection.map(a => a[this.Field])
        this.api.Delete(ids).then(response => {
          if (response.code === 20000) {
            this.$message({ message: '操作成功', type: 'success' })
            this.SearchData() // 重新加载数据
          } else {
            this.$message({ message: '操作失败', type: 'error' })
          }
        })
      } else {
        this.$message({ message: '请选择删除的数据', type: 'error' })
      }
    },
    // 行删除
    RowDelete(row) {
      var ids = [row[this.Field]]
      this.api.Delete(ids).then(response => {
        if (response.code === 20000) {
          this.$message({ message: '操作成功', type: 'success' })
          this.SearchData() // 重新加载数据
        } else {
          this.$message({ message: '操作失败', type: 'error' })
        }
      })
    },
    // 显示编辑窗体
    HandleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    // 提交修改
    UpdateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          this.api.Update(tempData).then((response) => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({ title: '成功', message: '更新成功', type: 'success', duration: 2000 })
          })
        }
      })
    },
    ConfirmData() {
      if (this.dialogStatus === 'create') {
        this.CreateData()
      } else {
        this.UpdateData()
      }
    },
    // 切换排序
    sortChange(param) {
      this.listQuery.page = 1
      this.listQuery.sort = param.order === 'ascending' ? 'ASC' : 'DESC'
      this.listQuery.order = param.prop
      this.loadData()
    },
    // 加载数据表
    loadData() {
      this.listLoading = true
      // 请求前处理
      this.loadListBefore(this.QueryParams)

      this.api.Query(this.listQuery).then(response => {
        if (this.afterLoadData) {
          response.data.items = this.afterLoadData(response.data.items)
        }
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
        this.$previewRefresh()
      })
    },
    // 发送列表请求前
    loadListBefore(params) { return params },
    // 条件过滤查询
    SearchData() {
      this.listQuery.page = 1
      this.loadData()
    },
    // 数据导出excel
    ExportData() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        // 格式转换
        const objdata = this.list.map(v => this.ExportFormateRow ? this.ExportFormateRow(v) : v)
        // 数据类型转换&字段过滤
        const data = objdata.map(v => this.ExportFields.map(j => v[j]))
        // 导出数据
        excel.export_json_to_excel({ header: this.ExportFields, data, filename: 'table-list' })
        this.downloadLoading = false
      })
    },
    // tip：以下方法请在具体业务页面重写
    // ExportFormateRow(row) { return row } // 数据行格式化方法,请在页面重写
    // 设置编辑样本
    resetTemp() {
      this.temp = { id: undefined }
    }
  }
}

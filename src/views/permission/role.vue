<template>
  <div class="app-container">
    <!--    <el-button type="primary" plain icon="el-icon-plus" @click="handleAddRole">{{ '新增角色' }}</el-button>-->

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色名称" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="是否管理员" width="220">
        <template slot-scope="scope">{{ scope.row.isAdministrator != 1 ? '否' : '是' }}</template>
      </el-table-column>
      <el-table-column align="header-center" label="描述">
        <template slot-scope="scope">{{ scope.row.remark }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" plain icon="el-icon-edit" @click="handleEdit(scope)">{{ '编辑权限' }}</el-button>
          <!--          <el-button type="danger" size="small" plain icon="el-icon-delete" @click="handleDelete(scope)">{{ '删除' }}</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑角色':'创建角色'">
      <el-form ref="roleForm" :model="role" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="role.name" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="是否管理员" prop="isAdministrator">
          <el-checkbox v-model="role.isAdministrator" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="role.remark"
            :autosize="{ minRows: 2, maxRows: 4}"
            type="textarea"
            placeholder="角色描述"
          />
        </el-form-item>
        <el-form-item label="菜单">
          <el-tree ref="tree" :check-strictly="checkStrictly" :data="routesData" :props="defaultProps" show-checkbox node-key="path" class="permission-tree" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ '取消' }}</el-button>
        <el-button type="primary" @click="confirmRole('roleForm')">{{ '确定' }}</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getFullRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'

const defaultRole = {
  id: '',
  name: '',
  remark: '',
  isAdministrator: '',
  routes: []
}

export default {
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes()
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getFullRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },
    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = '/') {
      const res = []

      for (const route of routes) {
        // skip some route
        if (route.hidden) { continue }

        // const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)
        //
        // if (route.children && onlyOneShowingChild && !route.alwaysShow) {
        //   route = onlyOneShowingChild
        // }
        const data = {
          path: path.resolve(basePath, route.path.charAt(0) === '/' ? route.path.substring(1) : route.path),
          title: route.meta && route.meta.title

        }

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    generateArr(routes) {
      let data = []
      routes.forEach(route => {
        data.push(route)
        if (route.children) {
          const temp = this.generateArr(route.children)
          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })
      return data
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false
      })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定要删除该角色吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.rolesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '角色已删除!'
          })
        })
        .catch(err => { console.error(err) })
    },
    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path.charAt(0) === '/' ? route.path.substring(1) : route.path)

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }
      return res
    },
    async confirmRole(formName) {
      let checked
      this.$refs[formName].validate((valid) => {
        if (valid) {
          checked = true
        } else {
          checked = false
          return false
        }
      })

      if (checked) {
        const isEdit = this.dialogType === 'edit'

        const checkedKeys = this.$refs.tree.getCheckedKeys()
        this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

        if (isEdit) {
          await updateRole(this.role)
          for (let index = 0; index < this.rolesList.length; index++) {
            if (this.rolesList[index].id === this.role.id) {
              this.rolesList.splice(index, 1, Object.assign({}, this.role))
              break
            }
          }
        } else {
          await addRole(this.role)
          this.rolesList.push(this.role)
        }

        const { remark, name } = this.role
        this.dialogVisible = false
        this.$notify({
          title: 'Success',
          dangerouslyUseHTMLString: true,
          message: `
            <div>角色名称: ${name}</div>
            <div>描述: ${remark}</div>
          `,
          type: 'success'
        })
      }
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>

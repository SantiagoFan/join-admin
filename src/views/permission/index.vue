<template>
  <div>
    <el-table
      :data="moduleList"
      style="width: 100%;margin-bottom: 20px;"
      border
      row-key="id"
    >
      <el-table-column
        prop="name"
        label="名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="title"
        label="地址"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getFullRoutes } from '@/api/role'
export default {
  data() {
    return {
      moduleList: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      getFullRoutes().then(res => {
        this.moduleList = res.data
      })
    }
  }
}
</script>

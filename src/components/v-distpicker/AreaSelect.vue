<template>
  <div class="wrapper">
    <el-input v-model="filterText" clearable placeholder="输入关键字进行过滤" />
    <el-tree
      ref="tree"
      :data="data"
      :indent="0"
      show-checkbox
      node-key="id"
      :expand-on-click-node="false"
      :check-on-click-node="true"
      :default-expanded-keys="['1','2','3','4','5','6','7']"
      :filter-node-method="filterNode"
    >
    </el-tree>
  </div>
</template>

<script>
import DISTRICTS from './districts'

const DISTRICTS_EX = {
  0: {
    1: '华北', 2: '东北', 3: '华东', 4: '华南', 5: '西南', 6: '西北', 7: '港澳台'
  },
  1: {
    110000: '北京市', 120000: '天津市', 130000: '河北省', 140000: '山西省', 150000: '内蒙古自治区'
  },
  2: {
    210000: '辽宁省', 220000: '吉林省', 230000: '黑龙江省'
  },
  3: {
    310000: '上海市', 320000: '江苏省', 330000: '浙江省', 340000: '安徽省', 350000: '福建省', 360000: '江西省', 370000: '山东省'
  },
  4: {
    410000: '河南省', 420000: '湖北省', 430000: '湖南省', 440000: '广东省', 450000: '广西壮族自治区', 460000: '海南省'
  },
  5: {
    500000: '重庆市', 510000: '四川省', 520000: '贵州省', 530000: '云南省', 540000: '西藏自治区'
  },
  6: {
    610000: '陕西省', 620000: '甘肃省', 630000: '青海省', 640000: '宁夏回族自治区', 650000: '新疆维吾尔自治区'
  },
  7: {
    710000: '台湾省', 810000: '香港特别行政区', 820000: '澳门特别行政区'
  }
}

export default {
  name: 'VAreaselect',
  props: {
  },
  data() {
    return {
      filterText: '',
      data: this.getRoot([])
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    getSelectNode() {
      const valueNode = [] // 有用节点 过滤区域节点和 全选后的子节点自动过滤
      const allNodes = {} // 节点字典 方便快速找到父节点
      // 过滤
      this.$refs.tree.getCheckedNodes().forEach(ele => {
        allNodes[ele.id] = ele
        if (ele.level === 0) return // 过滤区域节点
        if (ele.isAll !== undefined && ele.isAll === false) return // 过滤非满集合节点
        if (ele.parent && allNodes[ele.parent] !== undefined && allNodes[ele.parent].isAll) return // 过滤子节点全部选中节点
        valueNode.push(ele)
      })
      return valueNode
    },
    // 设置已选择节点 并过滤不可点击节点
    setSelectKey(selectKeys, removeKeys) {
      this.data = this.getRoot(removeKeys, selectKeys)
      this.$refs.tree.setCheckedKeys(selectKeys)
    },
    getRoot(removeKeys, selectKeys) {
      const root = []
      for (const item in DISTRICTS_EX[0]) { // 区域集合
        let isAll = true
        const arae = {
          id: item, level: 0, label: DISTRICTS_EX[0][item], children: []
        }
        for (const pr in DISTRICTS_EX[item]) { // 省集合
          if (removeKeys.indexOf(pr) > -1 && selectKeys.indexOf(pr) === -1) { isAll = false; continue }// 移除已经选择的

          const prc = { id: pr, level: 1, label: DISTRICTS_EX[item][pr] }
          const ch = this.getChildren(pr, removeKeys, selectKeys)
          prc.children = ch.root
          prc.isAll = ch.isAll
          if (prc.children.length > 0) arae.children.push(prc)
        }
        if (arae.children.length > 0) { // 区域没有省节点则不显示
          arae.isAll = isAll
          root.push(arae)
        }
      }
      return root
    },
    getChildren(code, removeKeys, selectKeys) {
      const root = []
      var isAll = true // 标志是否包含所有子元素
      for (const item in DISTRICTS[code]) { // 城市集合
        if (removeKeys.indexOf(item) > -1 && selectKeys.indexOf(item) === -1) { isAll = false; continue }// 移除已经选择的
        root.push({
          id: item, level: 2, parent: code,
          label: DISTRICTS[code][item]
        })
      }
      return {
        root: root,
        isAll: isAll
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss">
.wrapper{
  .el-input{
    margin-bottom: 20px;
  }
  .el-tree-node{// 区域
    margin-bottom: 5px;
    width: 100%;
    overflow: hidden;
    .el-tree-node__content{
    float: left;
    width: 20%;
    }
    .el-tree-node__children{
    float: left;
    width: 80%;
    }
    .el-tree-node{ // 省
      float: left;
      width: 33%;
      // overflow:auto;
      .el-tree-node__content{
        float: none;
        width: 100%;
      }
      .el-tree-node__children{
        float: left;
        position: absolute;
        z-index: 5;
        background: #fff;
        width: 100%;
        max-height: 300px;
        max-width: 200px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border: 1px solid #ddd;
        overflow-y:auto;
        padding: 10px 0;
        .el-tree-node{ //市区
          width: 100%;
        }
      }
    }
  }
  border:  1px solid #ddd;
  padding: 20px;
  .el-col{
    padding: 5px;
  }
  .el-row{
    padding-bottom: 5px;
  }
}
</style>

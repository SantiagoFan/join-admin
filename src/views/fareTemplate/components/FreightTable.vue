<template>
  <div class="freight-container">
    <div class="">
      <table class="freight-table el-table el-table--border" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th colspan="2">可配送区域</th>
            <th v-if="mode===0" style="width: 110px;">首件(个)</th>
            <th v-else-if="mode===1" style="width: 110px;">首重(kg)</th>
            <th style="width: 110px;">运费(元)</th>
            <th v-if="mode===0" style="width: 110px;">续件(个)</th>
            <th v-else-if="mode===1" style="width: 110px;">续重(kg)</th>
            <th style="width: 110px;">续费(元)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in value" :key="index">
            <td>{{ item.description }}</td>
            <td>
              <el-button type="text" @click="showEdit(item,index)">编辑</el-button>
              <el-button type="text" @click="showDelete(item,index)">删除</el-button>
            </td>
            <td>
              <el-input-number
                v-model="item.firstQuantity"
                size="mini"
                :controls="false"
                :min="0"
                :precision="mode==0?0:1"
              >
              </el-input-number>
            </td>
            <td>
              <el-input-number
                v-model="item.firstPrice"
                size="mini"
                :controls="false"
                :min="0"
                :precision="2"
              >
              </el-input-number>
            </td>
            <td>
              <el-input-number
                v-model="item.nextQuantity"
                size="mini"
                :controls="false"
                :min="0"
                :precision="mode==0?0:1"
              >
              </el-input-number>
            </td>
            <td>
              <el-input-number
                v-model="item.nextPrice"
                size="mini"
                :controls="false"
                :min="0"
                :precision="2"
              >
              </el-input-number>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">
              <el-button plain size="small" type="info" @click="showAdd">新增计费区域</el-button>
            </td>
          </tr>
        </tfoot>
      </table>

      <el-dialog :visible.sync="dialogVisible">
        <VAreaSelect ref="areaslect" />
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diaglogSubmit">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import VAreaSelect from '@/components/v-distpicker/AreaSelect'
export default {
  name: 'FreightTable',
  components: { VAreaSelect },
  props: {
    // 计费方式: 0 按件计费 1按重量
    mode: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogMode: 'add',
      editIndex: null,
      hasKey: [] // 所有已经选择的节点
    }
  },
  watch: {
    value: {
      handler(val, oldName) {
        this.hasKey = []
        val.forEach(res => {
          // this.hasKey.push(...res.keys)
          this.hasKey.push(...res.code.split(','))
        })
        this.hasKey = Array.from(new Set(this.hasKey))
      },
      deep: true
    }
  },
  methods: {
    showEdit(item, index) {
      this.dialogVisible = true
      this.dialogMode = 'edit'
      this.editIndex = index
      this.$nextTick(_ => {
        this.$refs.areaslect.setSelectKey(item.code.split(','), this.hasKey)
      })
    },
    showAdd() {
      this.dialogVisible = true
      this.dialogMode = 'add'
      this.$nextTick(_ => {
        this.$refs.areaslect.setSelectKey([], this.hasKey)
      })
    },
    showDelete(item, index) {
      this.value.splice(index, 1)
    },
    diaglogSubmit() {
      var selectKeys = []
      var selectLabel = []
      this.$refs.areaslect.getSelectNode().forEach(element => {
        selectKeys.push(element.id)
        selectLabel.push(element.label)
      })
      if (selectKeys.length === 0) {
        this.dialogVisible = false
        return
      }
      if (this.dialogMode === 'edit') { // 修过
        this.value[this.editIndex].description = selectLabel.join(',')
        // this.value[this.editIndex].keys = selectKeys
        this.value[this.editIndex].code = selectKeys.join(',')
      } else { // 添加
        this.value.push({
          firstQuantity: 1,
          firstPrice: 0,
          nextQuantity: 1,
          nextPrice: 0,
          description: selectLabel.join(','),
          // keys: selectKeys,
          code: selectKeys.join(',')
        })
      }
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss">
  .freight-table{
    th {
      text-align: center;
      line-height: 30px;
      background-color: #f3f6fb;
      padding: 6px 10px;
    }
    td {
      font-size: 13px;
      padding: 6px 10px;
      .el-input-number{
        width: 90px;
      }
    }
    tr td:first-child{
      border-right-width: 0px;
    }
    tr td:nth-child(2){
      text-align: right;
    }
  }
</style>

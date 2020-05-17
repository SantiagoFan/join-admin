<template>
  <div>
    <el-row>
      <el-col :span="5" :offset="1">
        <widget-list></widget-list>
      </el-col>
      <el-col :span="10">
        <div class="actions">
          <el-button type="text" size="medium" icon="el-icon-refresh" @click="handleReset()">重置</el-button>
          <el-button type="text" size="medium" icon="el-icon-view" @click="handlePreview()">预览</el-button>
          <el-button type="text" size="medium" icon="el-icon-document" @click="handleSave()">保存</el-button>
        </div>
        <widget-form></widget-form>
      </el-col>
      <el-col :span="8">
        <div class="widget-config-container">
          <div>
            <div class="config-tab" :class="{active: configTab=='widget'}" @click="handleConfigSelect('widget')">组件属性</div>
            <div class="config-tab" :class="{active: configTab=='page'}" @click="handleConfigSelect('page')">页面属性</div>
          </div>
          <div class="config-content">
            <widget-config v-show="configTab=='widget'"></widget-config>
            <page-config v-show="configTab=='page'"></page-config>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WidgetList from '@/components/PageDesigner/widget-list'
import WidgetForm from '@/components/PageDesigner/widget-form'
import PageConfig from '@/components/PageDesigner/page-config'
import WidgetConfig from '@/components/PageDesigner/widget-config'
import { setLStorage, getLStorage } from '@/utils'

export default {
  components: {
    WidgetList,
    PageConfig,
    WidgetForm,
    WidgetConfig
  },
  computed: {
    ...mapState({
      pageData: state => state.pageDesigner.pageData,
      configTab: state => state.pageDesigner.configTab
    })
  },
  created() {
    const pageData = getLStorage('pageData')
    if (pageData) {
      this.$store.commit('setPageData', pageData)
    } else {
      this.pageData.config = {}
    }
  },
  methods: {
    handleConfigSelect(value) {
      this.$store.commit('setConfigTab', value)
    },
    // 点击重置
    handleReset() {
      const initialPageData = {
        formList: [],
        list: [],
        config: { }
      }
      this.$store.commit('setSelectWg', {})
      this.$store.commit('setPageData', initialPageData)
    },
    // 点击保存
    handleSave() {
      setLStorage('pageData', this.pageData)
      this.$alert('保存成功', { showClose: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.widget-config-container{
  font-size: 0;
  .config-content{
    font-size: 14px;
    padding: 10px;
  }
}
.config-tab {
  width: 50%;
  height: 45px;
  line-height: 45px;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-bottom: solid 2px #e4e7ed;
  cursor: pointer;
  &.active {
    border-bottom: solid 2px #409eff;
  }
}
</style>

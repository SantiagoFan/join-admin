<template>
  <div>
    <div class="phone-header" @click="setConfigTab()">{{ pageData.config.title?pageData.config.title:'点击此处编辑标题' }}</div>
    <div
      class="widget-wrapper"
      :style="{background:pageData.config.background}"
    >
      <draggable
        :list="pageData.list"
        :options="{group:'widget', ghostClass: 'ghost',swapThreshold:0.5,animation: 100}"
        class="widget-list"
        :class="{'widget-empty': pageData.list.length === 0}"
        @add="handleWidgetAdd"
      >
        <div
          v-for="(item, index) in pageData.list"
          :key="index"
          class="widget-view"
          :class="{active: selectWg.key === item.key}"
          @click="handleSelectWidget(index)"
        >
          <component :is="'wg-'+item.type" :data="item" />

          <div v-if="selectWg.key === item.key" class="widget-actions" @click.stop>
            <i class="el-icon-circle-plus-outline" @click="handleWidgetClone(index)"></i>
            <i class="el-icon-remove-outline" @click="handleWidgetDelete(index)"></i>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import { deepClone } from '@/utils'
// 引入vant 移动端组件库
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)
// 引入渲染子组件
import wgTitle from './widgets/wg-title'
import wgBanner from './widgets/wg-banner'
import wgBlank from './widgets/wg-blank'
import wgLine from './widgets/wg-line'
import wgSlideList from './widgets/wg-slideList'
import wgGoodsList from './widgets/wg-goodsList'
import wgNavigation from './widgets/wg-navigation'

export default {
  components: {
    draggable,
    wgTitle,
    wgBanner,
    wgBlank,
    wgLine,
    wgSlideList,
    wgGoodsList,
    wgNavigation
  },
  computed: {
    ...mapState({
      selectWg: state => state.pageDesigner.selectWg,
      pageData: state => state.pageDesigner.pageData
    })
  },
  methods: {
    // 拖拽进入新组件
    handleWidgetAdd(evt) {
      const newIndex = evt.newIndex
      const elKey = Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      const newObj = deepClone(this.pageData.list[newIndex])

      newObj.key = this.pageData.list[newIndex].type + '_' + elKey
      this.$set(this.pageData.list, newIndex, newObj)
      this.$store.commit('setSelectWg', this.pageData.list[newIndex])
      this.$store.commit('setConfigTab', 'widget')
    },
    // 设置当前选择的组件
    handleSelectWidget(index) {
      this.$store.commit('setSelectWg', this.pageData.list[index])
      this.$store.commit('setConfigTab', 'widget')
    },
    // 删除组件
    handleWidgetDelete(index) {
      if (this.pageData.list.length - 1 === index) {
        if (index === 0) {
          this.$store.commit('setSelectWg', {})
        } else {
          this.$store.commit('setSelectWg', this.pageData.list[index - 1])
        }
      } else {
        this.$store.commit('setSelectWg', this.pageData.list[index + 1])
      }
      this.$nextTick(() => {
        this.pageData.list.splice(index, 1)
      })
    },
    // 复制组件
    handleWidgetClone(index) {
      const cloneData = deepClone(this.pageData.list[index])
      cloneData.key = this.pageData.list[index].type + '_' + Date.now() + '_' + Math.ceil(Math.random() * 1000000)
      this.pageData.list.splice(index, 0, cloneData)
      this.$nextTick(() => {
        this.$store.commit('setSelectWg', this.pageData.list[index + 1])
      })
    },
    // 切换到页面配置
    setConfigTab() {
      this.$store.commit('setConfigTab', 'page')
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/page.scss';
.phone-header{
  cursor: pointer;
  width: 320px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  font-weight:700;
  overflow: hidden;
  white-space:nowrap;
  font-size: 16px;
  padding: 23px 60px 0;
  height: 64px;
  background: url('/phone.png') no-repeat;
}
.widget-wrapper{
  width: 320px;
  border: 1px solid #ddd;
  border-top-width: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .widget-empty{
    background: url('/widget-empty.png') no-repeat;
  }
  .widget-list{
    min-height: 650px;
    .ghost {
        background: #fff;
        border: 1px dashed blue;

        &::after {
            background: #fff;
        }
    }
    li.ghost {
      position: relative;
      line-height: 30px;
      list-style: none;
      font-size: 0;
      &::after {
          content: '放到这里';
          display: block;
          background: #fff;
          position: absolute;
          left: 50%;
          margin-left: -32px;
          top: 0;
          font-size: 16px;
          color: #999;
          z-index: 10;
      }
    }
  }
  .widget-view {
    margin: 0;
    // background: #fff;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: block;
        z-index: 1001;
    }
    &:hover {
        background: #ecf5ff;
    }
    &.active {
        box-shadow: 0px 1px 10px 1px #90c7ff;
        z-index: 1111;
    }
    .widget-actions{
      position: absolute;
      right: 0;
      bottom: 0px;
      z-index: 1009;
      font-size: 25px;
      cursor: pointer;
      }
  }
}
</style>

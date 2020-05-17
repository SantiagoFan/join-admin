<template>
  <div v-if="selectWg && Object.keys(selectWg).length > 0">
    <component :is="'wg-'+selectWg.type" :select-wg="selectWg"></component>
    {{ selectWg }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
// 配置子组件引入
import wgTitle from './configs/wg-title'
import wgBanner from './configs/wg-banner'
import wgBlank from './configs/wg-blank'
import wgLine from './configs/wg-line'
import wgSlideList from './configs/wg-slideList'
import wgGoodsList from './configs/wg-goodsList'
import wgNavigation from './configs/wg-navigation'

export default {
  components: {
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
      selectWg: state => state.pageDesigner.selectWg
    })
  }
}
</script>

<style>

</style>

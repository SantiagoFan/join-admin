<template>
  <div class="">
    <MerchantLogo />
    <el-menu
      :background-color="variables.mainMenuBg"
      :text-color="variables.mainMenuText"
      :active-text-color="variables.mainMenuActiveText"
      default-active="-1"
      class="main-nav"
    >
      <a v-for="item in menu" :key="item.id" :href="item.url">
        <el-menu-item :index="item.id+''">
          <i :class="item.icon" />{{ item.title }}
        </el-menu-item>
      </a>
    </el-menu>
    <el-menu
      :background-color="variables.mainMenuBg"
      :text-color="variables.mainMenuText"
      :active-text-color="variables.mainMenuActiveText"
      default-active="1"
      class="main-nav-sub"
    >
      <a v-for="item in subList" :key="item.id" :href="item.url">
        <el-menu-item :index="item.id+''">
          <i :class="item.icon" />{{ item.title }}
        </el-menu-item>
      </a>
    </el-menu>
    <copyright />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import MerchantLogo from '../MerchantLogo'
import copyright from './copyright'
export default {
  name: 'MenuList',
  components: { MerchantLogo, copyright },
  data() {
    return {
      list: [],
      // 页面固定菜单
      subList: [
        { title: '管理', id: '1', icon: 'el-icon-setting', url: 'http://zhuke.card.nmgjoin.com' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'current_user',
      'sidebar',
      'menu'
    ]),
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.main-nav{
  &.el-menu {
      border: none;
    }
  .el-menu-item {
    padding: 0 10px !important;
  }
}
.main-nav-sub{
  margin-top: 30px;
  &.el-menu {
      border: none;
    }
  .el-menu-item {
    padding: 0 10px !important;
  }
}
</style>

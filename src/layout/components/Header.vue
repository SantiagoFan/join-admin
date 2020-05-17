<template>
  <div class="jui-header">
    <div class="header-container">
      <div class="logo-container">
        <img src="/logo.png">
        <span>ZHUKE</span>
      </div>
      <!--右侧功能键-->
      <div class="right-menu">
        <template v-if="device!=='mobile'">
          <search id="header-search" class="right-menu-item" />
          <error-log class="errLog-container right-menu-item hover-effect" />
          <screenfull id="screenfull" class="right-menu-item hover-effect" />
        </template>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
            <svg-icon icon-class="user" />
            <span>{{ current_user.RealName }}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                面板
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="">
              <el-dropdown-item>
                github
              </el-dropdown-item>
            </a>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!--顶部菜单-->
      <el-menu mode="horizontal" default-active="2" active-text-color="#6190e8" class="top-nav">
        <el-menu-item index="1"><a href="http://testshop.card.nmgjoin.com/Admin/Home/Index">会员卡管理</a></el-menu-item>
        <el-menu-item index="2">在线商城</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    ErrorLog,
    Screenfull,
    Search
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'current_user',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      const return_url_str = 'http://mall.card.nmgjoin.com/#' + this.$route.fullPath
      location.href = 'http://testshop.card.nmgjoin.com/Login?return_url=' + encodeURI(return_url_str)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.logo-container{
  float: left;
  margin-right: 50px;
  line-height: 80px;
  height: 80px;
  font-size: 28px;
  color: #6190E8;
  font-weight: bold;
  img{ vertical-align:middle; height: 65px;}
}
.top-nav{
  float: left;
  .el-menu-item {
    height: 80px;
    min-height: 80px;
    line-height: 80px;
  }

}
.jui-header {
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  box-shadow: 0 10px 60px 0 rgba(29,29,31,0.07);
  .header-container{
    width: 90%;
    margin: 0 auto;

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;
      padding-top: 8px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          // .user-avatar {
          //   cursor: pointer;
          //   width: 40px;
          //   height: 40px;
          //   border-radius: 10px;
          //   vertical-align: middle;
          // }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width:100%;
    transition: width 0.28s;
  }
</style>


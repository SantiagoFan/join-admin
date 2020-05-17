<template>
  <div class="merchant-logo-container">
    <el-popover
      width="260"
      trigger="hover"
    >
      <router-link slot="reference" to="/">
        <!-- 只显示logo -->
        <el-avatar v-if="showTag=='logo'" style="margin-top:7px;" size="medium" :src="logo" />
        <!-- 商户名称 -->
        <span v-else-if="showTag=='merchant'" class="title"><i class="el-icon-s-shop" /> {{ current_user.MerchantName }}<i class="el-icon-caret-bottom" /></span>
        <!-- 用户名称 -->
        <span v-else-if="showTag=='account'" class="title"><i class="el-icon-s-custom" /> {{ current_user.RealName }}<i class="el-icon-caret-bottom" /></span>
      </router-link>
      <el-menu style="border:0;">
        <el-menu-item>
          <i class="el-icon-s-shop" />
          <span>店铺：{{ current_user.MerchantName }}</span>
        </el-menu-item>
        <el-menu-item>
          <i class="el-icon-user-solid" />
          <span>账号：{{ current_user.RealName }}</span>
        </el-menu-item>
        <el-menu-item @click="logout">
          <i class="el-icon-switch-button" />
          <span>退出</span>
        </el-menu-item>
      </el-menu>
    </el-popover>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MerchantInfo',
  props: {
    showTag: {
      default: 'logo', // logo 商户logo merchant 商户名称 account 账户名称
      type: String
    }
  },
  data() {
    return {
      title: '驻客 ZHUKE',
      logo: '/'
    }
  },
  computed: {
    ...mapGetters([
      'current_user'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      const return_url_str = 'http://operation.card.nmgjoin.com/#'
      location.href = 'http://shop.card.nmgjoin.com/Login?return_url=' + encodeURI(return_url_str)
    }
  }
}
</script>

<style lang="scss" scoped>
.merchant-logo-container {
  height: 50px;
  line-height: 50px;
  text-align: center;
  .title{
    font-size: 15px;
  }
}
</style>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">标题</h3>

      <div class="drawer-item">
        <span>主题</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>标签项</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>固定头部</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>菜单logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>
      <h3 class="drawer-title">用户反馈</h3>
      <el-form ref="form" :model="form" label-position="top">
        <el-form-item label="反馈内容">
          <el-input v-model="form.content" type="textarea" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.tel" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" style="width:100%">提交反馈</el-button>
        </el-form-item>
      </el-form>
      <div class="support">
        <div class="support-title"><svg-icon icon-class="staff" /> 客服电话</div>
        <span>0471-4953016</span>
        <div class="support-title" style="margin:20px 0;"><i class="el-icon-s-home" />店铺二维码</div>
        <qrcode :text="'http://mall.card.nmgjoin.com/m_'+current_user['MerchantAppid']+'#/index'" />
      </div>

    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
import qrcode from '@/components/qrcode'
import { mapGetters } from 'vuex'
export default {
  components: { ThemePicker, qrcode },
  data() {
    return {
      form: {}
    }
  },
  computed: {
    ...mapGetters([
      'current_user'
    ]),
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin: 12px;
    text-align: center;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
  .support{
    text-align: center;
    color: #6d6d6d;
    .support-title{ font-size: 16px;
      svg{
        font-size: 2rem;
      }
    }
    span{font-size: 20px;}
  }
}
</style>

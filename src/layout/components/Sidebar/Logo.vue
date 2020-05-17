<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <h1 class="sidebar-title"> 管理 </h1>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '驻客 ZHUKE',
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>

.sidebar-logo-container {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  margin-bottom: 4px;
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #848484;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
    }
}
</style>

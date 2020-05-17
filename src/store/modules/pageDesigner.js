const state = {
  pageData: {
    list: [], // 组件列表
    formList: [],
    config: {} // 页面配置
  },
  selectWg: {}, // 当前焦点所在组件
  configTab: 'page', // 当前页面配置窗口
  wgCollapse: 'base' // 当前编辑的组件分组
}

// const actions = {

// }

// const getters = {
//   selectTheme: state => state.selectTheme
// }

const mutations = {
  setPageData(state, payload) {
    state.pageData = payload
  },
  setSelectWg(state, payload) {
    state.selectWg = payload
  },
  setConfigTab(state, payload) {
    state.configTab = payload
  },
  setWgCollapse(state, payload) {
    state.wgCollapse = payload
  }
}

export default {
  state,
  mutations
}

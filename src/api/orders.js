import request from '@/utils/request'

const api = {
  Query(data) {
    return request({
      url: '/backEnd/orders',
      method: 'post',
      data
    })
  },
  Detail(id) {
    return request({
      url: '/backEnd/orderNestedOrderDetail',
      method: 'get',
      params: { id, timestamp: new Date().getTime() }
    })
  },
  getExpressInfo(expNo, expCode) {
    return request({
      url: '/expressTrace',
      method: 'get',
      params: { expNo, expCode, timestamp: new Date().getTime() }
    })
  },
  BatchInSend(data) {
    return request({
      url: '/backEnd/batchSend',
      method: 'post',
      data: { ids: data }
    })
  },
  UpdateExpressInfo(data) {
    return request({
      url: '/goodsDelivery',
      method: 'put',
      data
    })
  },
  Update(data) {
    return request({
      url: '/goods',
      method: 'put',
      data
    })
  },
  Create(data) {
    return request({
      url: '/goods',
      method: 'post',
      data
    })
  },
  getBrands() {
    return request({
      url: '/dropDown/brands',
      method: 'get'
    })
  },
  fetchGoods(id) {
    return request({
      url: '/goods',
      method: 'get',
      params: { id, timestamp: new Date().getTime() }
    })
  },
  batchDelete(ids) {
    return request({
      url: '/backEnd/orders',
      method: 'delete',
      data: { ids: ids }
    })
  }
}
export default api

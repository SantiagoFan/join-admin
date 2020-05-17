import request from '@/utils/request'
const url = '/backEnd/goods'
const api = {
  Query(data) {
    return request({
      url: '/backEnd/goodsQuery',
      method: 'post',
      data
    })
  },
  Delete(data) {
    return request({
      url,
      method: 'delete',
      data: { ids: data }
    })
  },
  Update(data) {
    return request({
      url,
      method: 'put',
      data
    })
  },
  Create(data) {
    return request({
      url,
      method: 'post',
      data
    })
  },
  getBrands() {
    return request({
      url: '/dropDown/brands',
      method: 'get',
      params: { timestamp: new Date().getTime() }
    })
  },
  fetchGoods(id) {
    return request({
      url,
      method: 'get',
      params: { id, timestamp: new Date().getTime() }
    })
  },
  goodsNestedSkus(id) {
    return request({
      url: '/backEnd/goodsNestedSkus',
      method: 'get',
      params: { id, timestamp: new Date().getTime() }
    })
  },
  goodsSaleable(data) {
    return request({
      url: '/backEnd/goodsSaleable',
      method: 'post',
      data
    })
  }
}
export default api

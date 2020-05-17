import request from '@/utils/request'
const url = '/backEnd/afterSale'
const api = {
  Query(data) {
    return request({
      url: '/backEnd/afterSaleQuery',
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
  get(id) {
    return request({
      url,
      method: 'get',
      params: { id: id }
    })
  },
  getExpressInfo(expNo, expCode) {
    return request({
      url: '/expressTrace',
      method: 'get',
      params: { expNo, expCode, timestamp: new Date().getTime() }
    })
  },
  getAfterOrderDeatial(id, detailId) {
    return request({
      url: '/backEnd/getAfterOrderDeatial',
      method: 'get',
      params: { id, detailId: detailId, timestamp: new Date().getTime() }
    })
  },
  refuseApplication(data) {
    return request({
      url: '/backEnd/refuseApplication',
      method: 'put',
      data
    })
  }
}
export default api

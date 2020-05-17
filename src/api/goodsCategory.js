import request from '@/utils/request'

const url = '/backend/goodsCategory'
const api = {
  get() {
    return request({
      url: url,
      method: 'get',
      params: { timestamp: new Date().getTime() }
    })
  },
  add(data) {
    return request({
      url: url,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: url,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url: url,
      method: 'delete',
      data: { id }
    })
  }
}
export default api

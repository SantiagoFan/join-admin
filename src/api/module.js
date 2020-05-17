import request from '@/utils/request'

const url = '/backEnd/module'
const api = {
  get() {
    return request({
      url,
      method: 'get',
      params: { timestamp: new Date().getTime() }
    })
  },
  add(data) {
    return request({
      url,
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url,
      method: 'put',
      data
    })
  },
  delete(id) {
    return request({
      url,
      method: 'delete',
      params: { id }
    })
  }
}
export default api

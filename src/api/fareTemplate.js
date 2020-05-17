import request from '@/utils/request'
const url = '/backEnd/fareTemplate'
const api = {
  Get(id) {
    return request({
      url: url + '?id=' + id,
      method: 'get',
      params: { timestamp: new Date().getTime() }
    })
  },
  LoadAll() {
    return request({
      url: '/dropDown/fareTemplate',
      method: 'get'
    })
  },
  Query(data) {
    return request({
      url: '/backEnd/fareTemplateQuery',
      method: 'post',
      data
    })
  },
  Delete(data) {
    return request({
      url,
      method: 'delete',
      data
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
  }
}
export default api

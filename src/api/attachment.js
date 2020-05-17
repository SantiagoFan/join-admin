import request from '@/utils/request'
const url = '/backEnd/attachment'
const api = {
  Query(data) {
    return request({
      url: '/backEnd/attachmentQuery',
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

import request from '@/utils/request'
const url = '/backEnd/attachmentGroup'
const api = {
  Query(data) {
    return request({
      url: '/backEnd/attachmentGroupQuery',
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

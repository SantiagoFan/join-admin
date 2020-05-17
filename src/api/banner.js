import request from '@/utils/request'
const url = '/backEnd/goods'
const api = {
  Query(data) {
    return request({
      url: '/backEnd/bannerList',
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
  }
}
export default api

import request from '@/utils/request'

const url = '/backEnd/brand'
const api = {
  getBrands(data) {
    return request({
      url: '/backEnd/brandQuery',
      method: 'post',
      data
    })
  },
  addBrand(data) {
    return request({
      url,
      method: 'post',
      data
    })
  },
  updateBrand(data) {
    return request({
      url,
      method: 'put',
      data
    })
  },
  deleteBrand(id) {
    return request({
      url,
      method: 'delete',
      data: { id }
    })
  }
}
export default api

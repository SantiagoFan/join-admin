import request from '@/utils/request'

const api = {
  Query(query) {
    return request({
      url: '/article/list',
      method: 'get',
      params: query
    })
  },
  Delete(data) {
    return request({
      url: '/article/delete',
      method: 'post',
      data
    })
  },
  Update(data) {
    return request({
      url: '/article/createOrUpdate',
      method: 'post',
      data
    })
  },
  Create(data) {
    return request({
      url: '/article/createOrUpdate',
      method: 'post',
      data
    })
  },
  fetchArticle(id) {
    return request({
      url: '/article/detail',
      method: 'post',
      params: { id }
    })
  }
}
export default api

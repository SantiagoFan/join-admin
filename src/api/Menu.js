import request from '@/utils/request'
const url = '/api/auth'
const api = {
  Query(data) {
    return request({
      url: url + '/getSubsystemList',
      method: 'post',
      data
    })
  }
}
export default api

// @ 符号在vue.config.js 中配置， 表示 'src' 路径的别名
import request from '@/utils/request'

export default {
  // list是一个成员函数，对应后台的接口，export里面的一个函数就是对应的一个后台的接口
  // 获取积分模块
  list() {
    return request({
      url: '/admin/core/integralGrade/list',
      method: 'get'
    })
  },
  removeById(id){
    return request({
      url: `/admin/core/integralGrade/remove/${id}`,
      method: 'delete'
    })
  }
}
import request from '@/utils/request'
export function getEmployeeList(params) {
    return request({
      url: '/sys/user',
      params // 地址参数 查询参数
    })
  }

  /**
 * 导出员工的excel
 * **/

export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}
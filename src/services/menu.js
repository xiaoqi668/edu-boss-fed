import request from '@/utils/request'

// 获取编辑菜单信息

export const getEditMenuInfo = (id = -1) => {
  return request({
    method: 'GET',
    // url: `/boss/menu/getEditMenuInfo?id=${id}`,
    url: '/boss/menu/getEditMenuInfo',
    // GET请求用params POST请求用data
    params: {
      id
    }
  })
}

// 添加菜单接口
export const createORUpdateMenu = data => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

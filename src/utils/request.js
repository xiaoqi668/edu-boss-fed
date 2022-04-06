// 封装模块进行请求
import axios from 'axios'
// 引入Vuex
import store from '@/store'
// 通过局部引入的方式引入Element的Message组件功能,提示信息功能
import { Message } from 'element-ui'
// 引入router
import router from '@/router'
// 引入qs 用于对请求参数进行格式处理
import qs from 'qs'
// 创建axios实例
const request = axios.create({
  timeout: 5000
})

// 设置baseURL
function getBaseURL (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagounews.com'
  } else {
    return 'http://edufront.lagounews.com'
  }
}

// 设置请求拦截器
request.interceptors.request.use(function (config) {
  // 判断config.url的前缀，来进行对请求baseURL的设置
  config.baseURL = getBaseURL(config.url)

  // 设置统一的token信息
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }

  // 必须返回config 否则报错
  return config
})

// 封装页面跳转方法（跳转登录页）
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      // currentRoute 存储了路由信息的对象
      redirect: router.currentRoute.fullPath
    }
  })
}

// 存储是否正在更新token的状态，一个refresh_token只能使用一次，需要中间值做判断
let isRefreshing = false
// 存储因为token刷新而挂起的请求
let requests = []

// 设置响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码2xx会执行这里的逻辑，也就是成功会执行这里
  // console.log('响应成功了：', response)
  return response
}, function (error) {
  // 状态码4xx会执行这里的逻辑，也就是失败会执行这里
  if (error.response) {
    // 请求发送成功，响应接受完毕，但是状态码为失败的情况
    // 1.失败的状态码情况（主要处理401的情况）
    const { status } = error.response
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // 无token信息，用户未登陆
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 检测是否已经存在正在刷新token的请求
      if (isRefreshing) {
        // 已有刷新token的请求在发送，不能再发送同一个请求
        // 将当前失败的请求存储到数组中
        requests.push(() => {
          request(error.config)
        })
        return
      }
      // 没有正在刷新的token，可以刷新且将isRefreshing变为ture
      isRefreshing = true
      // 有token信息，但是token无效或token过期，重新发送请求，获取新的access_token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({
          refreshtoken: store.state.user.refresh_token
        })
      }).then(res => {
        // 用户可能修改了refresh_token，导致刷新失败
        // 刷新token失败
        if (res.data.state !== 1) {
          // 清楚无效的用户信息
          store.commit('setUser', null)
          // 跳转到登录页
          redirectLogin()
          return Promise.reject(error)
        }
        // 刷新token成功,存储新的token
        store.commit('setUser', res.data.content)
        // 重新发送失败的请求 config为本次发送失败请求的配置信息
        // 根据requests发送多次请求
        requests.forEach(callback => callback())
        // 发送完毕，清除requests
        requests = []
        // 将本次请求发送
        return request(error.config)
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        // 请求发送完毕，相应处理完毕，将isRefreshing改为false
        isRefreshing = false
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但是未接收到相应
    Message.error('请求超时，请重试')
  } else {
    // 意料之外的错误
    Message.error(error.message)
  }
  // 将本次请求的错误对象继续向后抛出，让接受相应的处理函数进行操作
  return Promise.reject(error)
})

export default request

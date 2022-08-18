import ANRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import LocalCache from '@/utils/cache'

const anRequest = new ANRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log(config)
      const token = LocalCache.getCache('token') ?? ''
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求拦截')
      return config
    },
    requestInterceptorCatch: (error) => {
      return error
    },
    responseInterceptor: (res) => {
      console.log('响应拦截')
      return res
    },
    responseInterceptorCatch: (error) => {
      return error
    }
  }
})

export default anRequest

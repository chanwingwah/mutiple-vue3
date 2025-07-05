import { AxiosResponse, InternalAxiosRequestConfig } from './types'
import qs from 'qs'
import { TRANSFORM_REQUEST_DATA } from '@/constants'
import { objToFormData } from '@/utils'

const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === 'post' &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  } else if (
    TRANSFORM_REQUEST_DATA &&
    config.method === 'post' &&
    config.headers['Content-Type'] === 'multipart/form-data' &&
    !(config.data instanceof FormData)
  ) {
    config.data = objToFormData(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

const defaultResponseInterceptors = (response: AxiosResponse) => {
  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  }

  // 检查是否返回了HTML页面（通常是错误页面）
  if (typeof response.data === 'string' && response.data.includes('<html>')) {
    // 使用iframe显示HTML，这样可以保持相对路径的正确性
    const iframe = document.createElement('iframe')
    iframe.style.cssText = `
        width: 100%;
        height: 100vh;
        border: none;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
      `
    // 清空当前页面内容并添加iframe和关闭按钮
    document.body.innerHTML = ''
    document.body.appendChild(iframe)

    // 将HTML内容写入iframe
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
    if (iframeDoc) {
      iframeDoc.open()
      iframeDoc.write(response.data)
      iframeDoc.close()
    }

    return Promise.reject(new Error('接口返回HTML页面'))
  }

  // 检查响应数据结构
  if (response.data && typeof response.data === 'object') {
    return response.data
    // if (response.data.code === SUCCESS_CODE) {
    //   return response.data
    // } else {
    //   ElMessage.error(response?.data?.message || '请求失败')
    //   if (response?.data?.code === 401) {
    //     // const userStore = useUserStoreWithOut()
    //     // userStore.logout()
    //     // todo: 退出登录
    //   }
    //   return Promise.reject(response.data)
    // }
  }

  // 如果响应数据不是预期的格式，直接返回
  return response.data
}

export { defaultResponseInterceptors, defaultRequestInterceptors }

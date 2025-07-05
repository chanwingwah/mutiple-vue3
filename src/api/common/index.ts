import request from '@/axios'

// svcManager/ccbManager
export const ccbManager = async (data: any) => {
  return request.post({
    url: '/svcManager/ccbManager',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

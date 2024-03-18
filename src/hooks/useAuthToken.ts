import { api } from '@/lib/axios'

const getToken = () => {
  let token = sessionStorage.getItem('devContactsToken')
  if (!token) {
    token = localStorage.getItem('devContactsToken')
  }
  return token ?? ''
}

const useAuthToken = () => {
  api.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json'
    config.headers.Authorization = getToken()
    return config
  })
}

export { useAuthToken, getToken }

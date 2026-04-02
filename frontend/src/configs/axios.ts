import axios, { AxiosInstance } from 'axios'
import auth from './auth'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api'

export const authStorage = {
  get(): string | null {
    return localStorage.getItem(auth.storageTokenKeyName)
  },
  set(token: string | null): void {
    if (token) {
      localStorage.setItem(auth.storageTokenKeyName, token)
    } else {
      localStorage.removeItem(auth.storageTokenKeyName)
    }
  }
}

type AxiosOpts = {
  contentType?: 'application/json' | 'multipart/form-data' | 'formData' | string
  timeoutMs?: number
}

export const getAxios = ({ contentType, timeoutMs }: AxiosOpts = {}): AxiosInstance => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }

  if (contentType) {
    headers['Content-Type'] =
      contentType === 'formData' ? 'multipart/form-data' : contentType
  }

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: typeof timeoutMs === 'number' ? timeoutMs : 10000,
    headers
  })

  instance.interceptors.request.use(config => {
    const token = authStorage.get()

    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        authStorage.set(null)
      }
      return Promise.reject(error)
    }
  )

  return instance
}


export default getAxios()
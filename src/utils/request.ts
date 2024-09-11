import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

export const parseParams = (params: Record<string, unknown>) => {
  let options = ''

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const element of value) {
        options += `${key}=${element}&`
      }
    } else {
      if (value != undefined) {
        options += `${key}=${value}&`
      }
    }
  }

  return options.slice(0, -1)
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 18000,
  withCredentials: false,
  paramsSerializer: (params) => {
    return parseParams(params)
  },
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    if (response.headers['content-type'] === 'application/json') {
      response.data = camelcaseKeys(response.data, { deep: true })
    }
    return response
  },
  async (error) => {
    //* Временное решение
    return Promise.reject(error)
  },
)

export default service

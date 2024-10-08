import axios from 'axios'
import snakecaseKeys from 'snakecase-keys'
import camelcaseKeys from 'camelcase-keys'
import { mapKeys, shake } from 'radash'

const requestHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
}

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

const serviceDadata = axios.create({
  baseURL: import.meta.env.VITE_DADATA_API_URL,
  timeout: 18000,
  headers: requestHeaders,
  paramsSerializer: (params) => {
    return parseParams(params)
  },
}
)

serviceDadata.interceptors.request.use(
  (config) => {
    if (typeof config.data === 'object' && !(config.data instanceof FormData)) {
      config.data = shake(config.data, (val) => val === '')
      {
        config.data = snakecaseKeys(config.data, {
          deep: true,
          exclude: [/[а-яА-Я]/g],
          parsingOptions: {
            splitRegexp: /([a-z])([A-Z]|\d)/g,
          },
        })
      }
    }

    if (typeof config.params === 'object') {
      // * На бэкенде параметры диапазона обозначаются с помощью двух dash (__) и gt/lt,
      // * чтобы соблюсти это и оставить camelCase, здесь эти параметры проверяются на
      // * соответствие regExp и затем модифицируются вторым dash
      // * так как первый они получаются после приведения в snake_keys
      config.params = snakecaseKeys(config.params, { deep: true })
      config.params = mapKeys(config.params, (key: string) =>
        /_(gt|lt)$/.test(key) ? key.slice(0, -3) + '_' + key.slice(-3) : key,
      )
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

let isRefreshing = false
serviceDadata.interceptors.response.use(
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

export default serviceDadata

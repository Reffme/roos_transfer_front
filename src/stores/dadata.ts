import { defineStore } from 'pinia'
import {
  getSuggestionsByAddressQuery,
} from '@/api/dadata'

export const useDadataStore = defineStore('dadata', () => {
  const getAddressSuggestions = async (query?: string) => {
    const { data } = await getSuggestionsByAddressQuery(query)
    return data.suggestions
  }

  return {
    getAddressSuggestions,
  }
})

import axios from 'axios'
import type { AxiosPromise } from 'axios'
import serviceDadata from "@/utils/requestDadata";


export const getSuggestionsByAddressQuery = (
  query?: string,
): AxiosPromise<{ suggestions:  {value: string, data: object}[] }> =>
    serviceDadata.post(
    'suggest/address',
    {
      query: query,
    },
  )
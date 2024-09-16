import type { AxiosPromise } from 'axios'
import serviceDadata from "@/utils/requestDadata";


export const getSuggestionsByAddressQuery = (
  query?: string,
): AxiosPromise<{ suggestions:  {value: string, unrestricted_value: string, data: object}[] }> =>
    serviceDadata.post(
    'suggest/address',
    {
      query: query,
        division: 'MUNICIPAL'
    },
  )

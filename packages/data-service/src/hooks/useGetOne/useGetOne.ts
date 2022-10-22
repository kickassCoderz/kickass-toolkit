import { useQuery } from '@tanstack/react-query'

import { useDataService } from './hooks/useDataService/useDataService'
import type { TBaseResponse, TQueryOptions, TUseGetOneResult, TUseGetOneVariables } from './types'
import { createGetOneQueryKey } from './utils/queryKeys'

const useGetOne = <TData extends TBaseResponse = TBaseResponse, TError = unknown>(
    variables: TUseGetOneVariables,
    queryOptions?: TQueryOptions<TData, TError>
): TUseGetOneResult<TData, TError> => {
    const dataService = useDataService()

    const getOneQuery = useQuery<TData, TError>(
        createGetOneQueryKey(variables.resource, variables.params),
        ({ meta, signal }) => dataService.getOne(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getOneQuery
}

export { useGetOne }

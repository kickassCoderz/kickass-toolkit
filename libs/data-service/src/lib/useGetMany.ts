import { useQuery } from '@tanstack/react-query'

import { createGetManyQueryKey } from './queryKeys'
import type { TBaseResponse, TQueryOptions, TUseGetManyResult, TUseGetManyVariables } from './types'
import { useDataService } from './useDataService'

const useGetMany = <TData extends TBaseResponse[] = TBaseResponse[], TError = unknown>(
    variables: TUseGetManyVariables,
    queryOptions?: TQueryOptions<TData, TError>
): TUseGetManyResult<TData, TError> => {
    const dataService = useDataService()

    const getManyQuery = useQuery<TData, TError>(
        createGetManyQueryKey(variables.resource, variables.params),
        ({ meta, signal }) => dataService.getMany(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getManyQuery
}

export { useGetMany }
import { useQuery } from '@tanstack/react-query'

import type { TBaseResponse, TQueryOptions, TUseGetOneResult, TUseGetOneVariables } from '../../types'
import { createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useGetOne is a hook which enables getting a single entity from resource based on id.
 * It uses `dataService.getOne` under the hood.
 *
 * @param variables
 * @param queryOptions
 * @returns data and query state
 */
function useGetOne  <TData extends TBaseResponse = TBaseResponse, TError = unknown>(
    variables: TUseGetOneVariables,
    queryOptions?: TQueryOptions<TData, TError>
): TUseGetOneResult<TData, TError>  {
    const dataService = useDataService()

    const getOneQuery = useQuery<TData, TError>(
        createGetOneQueryKey(variables.resource, variables.params),
        ({ meta, signal }) => dataService.getOne(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getOneQuery
}

export { useGetOne }

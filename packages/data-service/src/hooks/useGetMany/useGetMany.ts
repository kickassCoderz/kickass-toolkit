import { useQuery } from '@tanstack/react-query'

import type { TBaseResponse, TQueryOptions, TUseGetManyResult, TUseGetManyVariables } from '../../types'
import { createGetManyQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useGetMany is a hook which enables getting a list of entities from the same resource based on their respective ids.
 * It uses `dataService.getMany` under the hood.
 *
 * @param variables
 * @param queryOptions
 * @returns data and query state
 */
const useGetMany = <TData extends TBaseResponse = TBaseResponse, TError = unknown>(
    variables: TUseGetManyVariables,
    queryOptions?: TQueryOptions<TData[], TError>
): TUseGetManyResult<TData[], TError> => {
    const dataService = useDataService()

    const getManyQuery = useQuery<TData[], TError>(
        createGetManyQueryKey(variables.resource, variables.params),
        ({ meta, signal }) => dataService.getMany(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getManyQuery
}

export { useGetMany }

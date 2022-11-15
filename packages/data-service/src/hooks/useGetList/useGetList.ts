import { useQuery } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TGetListResponse,
    TQueryOptions,
    TUseGetListResult,
    TUseGetListVariables
} from '../../types'
import { createGetListQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useGetList is a hook which enables getting a list of entities from the same resource.
 * It uses `dataService.getList` under the hood.
 *
 * @param variables
 * @param queryOptions
 * @returns data and mutation state
 */
const useGetList = <TData extends TBaseResponse = TBaseResponse, TError = unknown>(
    variables: TUseGetListVariables,
    queryOptions?: TQueryOptions<TGetListResponse<TData[]>, TError>
): TUseGetListResult<TData[], TError> => {
    const dataService = useDataService()

    const getListQuery = useQuery<TGetListResponse<TData[]>, TError>(
        createGetListQueryKey(variables.resource, variables.params || {}),
        ({ meta, signal }) => dataService.getList(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getListQuery
}

export { useGetList }

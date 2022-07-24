import { useQuery } from '@tanstack/react-query'

import { createGetListQueryKey } from './queryKeys'
import type { TBaseResponse, TGetListResponse, TQueryOptions, TUseGetListResult, TUseGetListVariables } from './types'
import { useDataService } from './useDataService'

const useGetList = <TData extends TBaseResponse[] = TBaseResponse[], TError = unknown>(
    variables: TUseGetListVariables,
    queryOptions?: TQueryOptions<TGetListResponse<TData>, TError>
): TUseGetListResult<TData, TError> => {
    const dataService = useDataService()

    const getListQuery = useQuery<TGetListResponse<TData>, TError>(
        createGetListQueryKey(variables.resource, variables.params),
        ({ meta, signal }) => dataService.getList(variables.resource, variables.params, { meta, signal }),
        queryOptions
    )

    return getListQuery
}

export { useGetList }

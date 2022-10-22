import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useDataService } from './hooks/useDataService/useDataService'
import type {
    TBaseResponse,
    TMutationOptions,
    TUseUpdateManyPayload,
    TUseUpdateManyResult,
    TUseUpdateManyVariables
} from './types'
import { createBaseQueryKey, createGetOneQueryKey } from './utils/queryKeys'

const useUpdateMany = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseUpdateManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext>
): TUseUpdateManyResult<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const updateManyMutation = useMutation<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext>(
        params => dataService.updateMany(variables.resource, params),
        {
            onSuccess(data) {
                const listBaseQueryKey = createBaseQueryKey(variables.resource, 'getList')
                const manyBaseQueryKey = createBaseQueryKey(variables.resource, 'getMany')

                queryClient.invalidateQueries(listBaseQueryKey)
                queryClient.invalidateQueries(manyBaseQueryKey)

                data.forEach(item => {
                    const oneQueryKey = createGetOneQueryKey(variables.resource, { id: item.id })
                    queryClient.setQueryData(oneQueryKey, item)
                })
            },
            ...mutationOptions
        }
    )

    return updateManyMutation
}

export { useUpdateMany }

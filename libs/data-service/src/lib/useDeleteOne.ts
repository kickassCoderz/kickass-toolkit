import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBaseQueryKey, createGetOneQueryKey } from './queryKeys'
import type {
    TBaseResponse,
    TMutationOptions,
    TUseDeleteOnePayload,
    TUseDeleteOneResult,
    TUseDeleteOneVariables
} from './types'
import { useDataService } from './useDataService'

const useDeleteOne = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseDeleteOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TUseDeleteOnePayload<TPayload>, TContext>
): TUseDeleteOneResult<TData, TError, TUseDeleteOnePayload<TPayload>, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const deleteOneMutation = useMutation<TData, TError, TUseDeleteOnePayload<TPayload>, TContext>(
        params => dataService.deleteOne(variables.resource, params),
        {
            onSuccess(data) {
                const queryKeysToInvalidate = [
                    createBaseQueryKey(variables.resource, 'getList'),
                    createBaseQueryKey(variables.resource, 'getMany'),
                    createGetOneQueryKey(variables.resource, { id: data.id })
                ]

                queryKeysToInvalidate.forEach(queryKey => queryClient.invalidateQueries(queryKey))
            },
            ...mutationOptions
        }
    )

    return deleteOneMutation
}

export { useDeleteOne }

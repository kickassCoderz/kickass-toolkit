import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseDeleteManyPayload,
    TUseDeleteManyResult,
    TUseDeleteManyVariables
} from '../../types'
import { createBaseQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useDeleteMany is a hook which enables deleting many entities in the same resource based on their respective ids.
 * It uses `dataService.deleteMany` under the hood.
 *
 * @param variables
 * @param mutationOptions
 * @returns deleted data and mutation state
 */
function useDeleteMany <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseDeleteManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext>
): TUseDeleteManyResult<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext>  {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const deleteManyMutation = useMutation<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext>(
        params => dataService.deleteMany(variables.resource, params),
        {
            onSuccess(data, params) {
                const oneQueryKeysToInvalidate = params.ids.map(id => createGetOneQueryKey(variables.resource, { id }))

                const queryKeysToInvalidate = [
                    createBaseQueryKey(variables.resource, 'getList'),
                    createBaseQueryKey(variables.resource, 'getMany'),
                    ...oneQueryKeysToInvalidate
                ]

                queryKeysToInvalidate.forEach(queryKey => queryClient.invalidateQueries(queryKey))
            },
            ...mutationOptions
        }
    )

    return deleteManyMutation
}

export { useDeleteMany }

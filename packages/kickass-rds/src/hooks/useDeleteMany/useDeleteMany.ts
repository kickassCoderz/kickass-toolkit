import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseDeleteManyPayload,
    TUseDeleteManyResult,
    TUseDeleteManyVariables
} from '../../types'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useDeleteMany is a hook which enables deleting many entities in the same resource based on their respective ids.
 * It uses `dataService.deleteMany` under the hood.
 *
 * @param variables - resource and ids
 * @param mutationOptions - mutation options
 * @returns deleted data and mutation state
 */
function useDeleteMany<
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseDeleteManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext>
): TUseDeleteManyResult<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext> {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const deleteManyMutation = useMutation<TData[], TError, TUseDeleteManyPayload<TPayload>, TContext>(
        parameters => dataService.deleteMany(variables.resource, parameters),
        {
            async onSuccess(data, parameters) {
                const oneQueryKeysToInvalidate = parameters.ids.map(id =>
                    createGetOneQueryKey(variables.resource, { id })
                )

                const queryKeysToInvalidate = [
                    createGetListQueryKey(variables.resource),
                    createGetManyQueryKey(variables.resource),
                    ...oneQueryKeysToInvalidate
                ]

                await Promise.allSettled(queryKeysToInvalidate.map(queryKey => queryClient.invalidateQueries(queryKey)))
            },
            ...mutationOptions
        }
    )

    return deleteManyMutation
}

export { useDeleteMany }

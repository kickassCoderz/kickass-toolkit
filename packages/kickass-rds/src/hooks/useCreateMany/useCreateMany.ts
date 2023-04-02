import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseCreateManyPayload,
    TUseCreateManyResult,
    TUseCreateManyVariables
} from '../../types'
import { createBaseQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useCreateMany is a hook which enables creating many new entities in the same resource.
 * It uses `dataService.createMany` under the hood.
 *
 * @param variables - variables for the query
 * @param mutationOptions - options for the mutation
 * @returns newly created data and mutation state
 */
function useCreateMany<
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseCreateManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseCreateManyPayload<TPayload>, TContext>
): TUseCreateManyResult<TData[], TError, TUseCreateManyPayload<TPayload>, TContext> {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const createManyMutation = useMutation<TData[], TError, TUseCreateManyPayload<TPayload>, TContext>(
        parameters => dataService.createMany(variables.resource, parameters),
        {
            async onSuccess(data) {
                const listBaseQueryKey = createBaseQueryKey(variables.resource, 'getList')
                await queryClient.invalidateQueries(listBaseQueryKey)

                for (const item of data) {
                    const oneQueryKey = createGetOneQueryKey(variables.resource, { id: item.id })
                    queryClient.setQueryData(oneQueryKey, item)
                }
            },
            ...mutationOptions
        }
    )

    return createManyMutation
}

export { useCreateMany }

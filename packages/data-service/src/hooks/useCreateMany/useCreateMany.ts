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
 * @param variables
 * @param mutationOptions
 * @returns newly created data and mutation state
 */
const useCreateMany = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseCreateManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseCreateManyPayload<TPayload>, TContext>
): TUseCreateManyResult<TData[], TError, TUseCreateManyPayload<TPayload>, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const createManyMutation = useMutation<TData[], TError, TUseCreateManyPayload<TPayload>, TContext>(
        params => dataService.createMany(variables.resource, params),
        {
            onSuccess(data) {
                const listBaseQueryKey = createBaseQueryKey(variables.resource, 'getList')
                queryClient.invalidateQueries(listBaseQueryKey)

                data.forEach(item => {
                    const oneQueryKey = createGetOneQueryKey(variables.resource, { id: item.id })
                    queryClient.setQueryData(oneQueryKey, item)
                })
            },
            ...mutationOptions
        }
    )

    return createManyMutation
}

export { useCreateMany }

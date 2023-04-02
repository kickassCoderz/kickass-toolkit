import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseUpdateManyPayload,
    TUseUpdateManyResult,
    TUseUpdateManyVariables
} from '../../types'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useUpdateMany is a hook which enables updating any number of entities from the same resource based on their respective ids.
 * It uses `dataService.updateMany` under the hood.
 *
 * @param variables - resource and ids
 * @param mutationOptions - mutation options
 * @returns data and mutation state
 */
function useUpdateMany<
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseUpdateManyVariables,
    mutationOptions?: TMutationOptions<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext>
): TUseUpdateManyResult<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext> {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const updateManyMutation = useMutation<TData[], TError, TUseUpdateManyPayload<TPayload>, TContext>(
        parameters => dataService.updateMany(variables.resource, parameters),
        {
            async onSuccess(data) {
                const listBaseQueryKey = createGetListQueryKey(variables.resource)
                const manyBaseQueryKey = createGetManyQueryKey(variables.resource)

                await queryClient.invalidateQueries(listBaseQueryKey)
                await queryClient.invalidateQueries(manyBaseQueryKey)

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

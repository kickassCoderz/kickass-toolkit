import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseUpdateOnePayload,
    TUseUpdateOneResult,
    TUseUpdateOneVariables
} from '../../types'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useUpdateOne is a hook which enables updating a single entity in a resource based on its id.
 * It uses `dataService.updateOne` under the hood.
 *
 * @param variables - resource and id
 * @param mutationOptions - mutation options
 * @returns data and mutation state
 */
function useUpdateOne<
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseUpdateOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TUseUpdateOnePayload<TPayload>, TContext>
): TUseUpdateOneResult<TData, TError, TUseUpdateOnePayload<TPayload>, TContext> {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const updateOneMutation = useMutation<TData, TError, TUseUpdateOnePayload<TPayload>, TContext>(
        parameters => dataService.updateOne(variables.resource, parameters),
        {
            async onSuccess(data) {
                const listBaseQueryKey = createGetListQueryKey(variables.resource)
                const manyBaseQueryKey = createGetManyQueryKey(variables.resource)
                const oneQueryKey = createGetOneQueryKey(variables.resource, { id: data.id })

                await queryClient.invalidateQueries(listBaseQueryKey)
                await queryClient.invalidateQueries(manyBaseQueryKey)

                queryClient.setQueryData(oneQueryKey, data)
            },
            ...mutationOptions
        }
    )

    return updateOneMutation
}

export { useUpdateOne }

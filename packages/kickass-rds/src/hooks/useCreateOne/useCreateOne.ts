import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseCreateOnePayload,
    TUseCreateOneResult,
    TUseCreateOneVariables
} from '../../types'
import { createBaseQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useCreateOne is a hook which enables creating a single entity in resource.
 * It uses `dataService.createOne` under the hood.
 *
 * @param variables
 * @param mutationOptions
 * @returns newly created data and mutation state
 */
function useCreateOne  <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseCreateOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TUseCreateOnePayload<TPayload>, TContext>
): TUseCreateOneResult<TData, TError, TUseCreateOnePayload<TPayload>, TContext> {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const createOneMutation = useMutation<TData, TError, TUseCreateOnePayload<TPayload>, TContext>(
        params => dataService.createOne(variables.resource, params),
        {
            onSuccess(data) {
                const listBaseQueryKey = createBaseQueryKey(variables.resource, 'getList')
                const oneQueryKey = createGetOneQueryKey(variables.resource, { id: data.id })

                queryClient.invalidateQueries(listBaseQueryKey)
                queryClient.setQueryData(oneQueryKey, data)
            },
            ...mutationOptions
        }
    )

    return createOneMutation
}

export { useCreateOne }

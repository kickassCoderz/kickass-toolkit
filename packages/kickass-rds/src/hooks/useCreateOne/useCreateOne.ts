import { useMutation, useQueryClient } from '@tanstack/react-query'

import type {
    TBaseResponse,
    TMutationOptions,
    TUseCreateOnePayload,
    TUseCreateOneResult,
    TUseCreateOneVariables
} from '../../types'
import { createGetListQueryKey, createGetOneQueryKey } from '../../utils'
import { useDataService } from '../useDataService'

/**
 * useCreateOne is a hook which enables creating a single entity in resource.
 * It uses `dataService.createOne` under the hood.
 *
 * @param variables - variables for the query
 * @param mutationOptions - options for the mutation
 * @returns newly created data and mutation state
 */
function useCreateOne<
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
        parameters => dataService.createOne(variables.resource, parameters),
        {
            async onSuccess(data) {
                const listBaseQueryKey = createGetListQueryKey(variables.resource)
                const oneQueryKey = createGetOneQueryKey(variables.resource, { id: data.id })

                await queryClient.invalidateQueries(listBaseQueryKey)
                queryClient.setQueryData(oneQueryKey, data)
            },
            ...mutationOptions
        }
    )

    return createOneMutation
}

export { useCreateOne }

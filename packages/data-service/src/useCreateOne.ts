import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBaseQueryKey, createGetOneQueryKey } from './queryKeys'
import type {
    TBaseResponse,
    TMutationOptions,
    TUseCreateOnePayload,
    TUseCreateOneResult,
    TUseCreateOneVariables
} from './types'
import { useDataService } from './useDataService'

const useCreateOne = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseCreateOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TUseCreateOnePayload<TPayload>, TContext>
): TUseCreateOneResult<TData, TError, TUseCreateOnePayload<TPayload>, TContext> => {
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

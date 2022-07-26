import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBaseQueryKey, createGetOneQueryKey } from './queryKeys'
import type { TBaseResponse, TMutationOptions, TUseCreateOneResult, TUseCreateOneVariables } from './types'
import { useDataService } from './useDataService'

const useCreateOne = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseCreateOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TPayload, TContext>
): TUseCreateOneResult<TData, TError, TPayload, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const createOneMutation = useMutation<TData, TError, TPayload, TContext>(
        payload => dataService.createOne(variables.resource, { payload }),
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

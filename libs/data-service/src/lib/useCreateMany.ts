import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createBaseQueryKey, createGetOneQueryKey } from './queryKeys'
import type { TBaseResponse, TMutationOptions, TUseCreateManyResult, TUseCreateManyVariables } from './types'
import { useDataService } from './useDataService'

const useCreateMany = <
    TData extends TBaseResponse[] = TBaseResponse[],
    TError = unknown,
    TPayload extends Record<string, unknown>[] = Record<string, unknown>[],
    TContext = unknown
>(
    variables: TUseCreateManyVariables,
    mutationOptions?: TMutationOptions<TData, TError, TPayload, TContext>
): TUseCreateManyResult<TData, TError, TPayload, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const createManyMutation = useMutation<TData, TError, TPayload, TContext>(
        payload => dataService.createMany(variables.resource, { payload }),
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

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useDataService } from './hooks/useDataService/useDataService'
import type {
    TBaseResponse,
    TMutationOptions,
    TUseUpdateOnePayload,
    TUseUpdateOneResult,
    TUseUpdateOneVariables
} from './types'
import { createBaseQueryKey, createGetOneQueryKey } from './utils/queryKeys'

const useUpdateOne = <
    TData extends TBaseResponse = TBaseResponse,
    TError = unknown,
    TPayload extends Record<string, unknown> = Record<string, unknown>,
    TContext = unknown
>(
    variables: TUseUpdateOneVariables,
    mutationOptions?: TMutationOptions<TData, TError, TUseUpdateOnePayload<TPayload>, TContext>
): TUseUpdateOneResult<TData, TError, TUseUpdateOnePayload<TPayload>, TContext> => {
    const dataService = useDataService()
    const queryClient = useQueryClient()

    const updateOneMutation = useMutation<TData, TError, TUseUpdateOnePayload<TPayload>, TContext>(
        params => dataService.updateOne(variables.resource, params),
        {
            onSuccess(data) {
                const listBaseQueryKey = createBaseQueryKey(variables.resource, 'getList')
                const manyBaseQueryKey = createBaseQueryKey(variables.resource, 'getMany')
                const oneQueryKey = createGetOneQueryKey(variables.resource, { id: data.id })

                queryClient.invalidateQueries(listBaseQueryKey)
                queryClient.invalidateQueries(manyBaseQueryKey)

                queryClient.setQueryData(oneQueryKey, data)
            },
            ...mutationOptions
        }
    )

    return updateOneMutation
}

export { useUpdateOne }

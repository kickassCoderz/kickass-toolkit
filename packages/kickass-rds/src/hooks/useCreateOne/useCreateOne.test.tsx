import { act, renderHook, waitFor } from '@testing-library/react'

import { TestWrapper } from '../../__fixtures__'
import { createTestQueryClient } from '../../__fixtures__/createTestQueryClient'
import { createGetListQueryKey, createGetOneQueryKey } from '../../utils'
import { useCreateOne } from './useCreateOne'

describe('useCreateOne', () => {
    it('should be defined', () => {
        expect(useCreateOne).toBeDefined()
    })

    it('should render', async () => {
        const payload = { name: 'Vukovarsko' }

        const { result } = renderHook(
            () =>
                useCreateOne({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ payload })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(payload)
    })

    it('should return id for item', async () => {
        const payload = { name: 'Vukovarsko' }

        const { result } = renderHook(
            () =>
                useCreateOne({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ payload })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data?.id).toBeDefined()
    })

    it('should prefill data for getOne query key', async () => {
        const payload = { name: 'Vukovarsko' }
        const queryClient = createTestQueryClient()

        const { result } = renderHook(
            () =>
                useCreateOne({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ payload })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(
            queryClient.getQueryData(createGetOneQueryKey('beers', { id: result.current.data?.id as string }))
        ).toBeDefined()
    })

    it('should invalidate data for getList query keys', async () => {
        const payload = { name: 'Vukovarsko' }
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetListQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useCreateOne({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ payload })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetListQueryKey('beers'))?.isInvalidated).toBe(true)
    })
})

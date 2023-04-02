import { act, renderHook, waitFor } from '@testing-library/react'

import { TestWrapper } from '../../__fixtures__'
import { createTestQueryClient } from '../../__fixtures__/createTestQueryClient'
import { createGetListQueryKey, createGetOneQueryKey } from '../../utils'
import { useCreateMany } from './useCreateMany'

describe('useCreateMany', () => {
    it('should be defined', () => {
        expect(useCreateMany).toBeDefined()
    })

    it('should render', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Velebitsko' }]

        const { result } = renderHook(
            () =>
                useCreateMany({
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

    it('should return id for each item', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Velebitsko' }]

        const { result } = renderHook(
            () =>
                useCreateMany({
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

        result.current.data?.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })

    it('should prefill data for getOne query keys', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Velebitsko' }]
        const queryClient = createTestQueryClient()

        const { result } = renderHook(
            () =>
                useCreateMany({
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

        result.current.data?.forEach(item => {
            expect(queryClient.getQueryData(createGetOneQueryKey('beers', { id: item.id }))).toBeDefined()
        })
    })

    it('should invalidate data for getList query keys', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Velebitsko' }]
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetListQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useCreateMany({
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

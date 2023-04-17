import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { createTestQueryClient } from '../../__fixtures__/createTestQueryClient'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useDeleteMany } from './useDeleteMany'

describe('useDeleteMany', () => {
    it('should be defined', () => {
        expect(useDeleteMany).toBeDefined()
    })

    it('should render', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]

        const { result } = renderHook(
            () =>
                useDeleteMany({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ ids })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(ids.map(id => ({ id })))
    })

    it('should invalidate data for getList query keys', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetListQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useDeleteMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ ids })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetListQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should invalidate data for getMany query keys', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetManyQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useDeleteMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ ids })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetManyQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should invalidate data for getOne query keys', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]
        const queryClient = createTestQueryClient()
        ids.map(id => {
            queryClient.setQueryData(createGetOneQueryKey('beers', { id }), { id })
        })

        const { result } = renderHook(
            () =>
                useDeleteMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ ids })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        result.current.data?.map(item => {
            expect(queryClient.getQueryState(createGetOneQueryKey('beers', { id: item.id }))?.isInvalidated).toBe(true)
        })
    })
})

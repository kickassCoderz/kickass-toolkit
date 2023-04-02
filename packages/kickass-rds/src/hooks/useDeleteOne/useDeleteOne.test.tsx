import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { createTestQueryClient } from '../../__fixtures__/createTestQueryClient'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useDeleteOne } from './useDeleteOne'

describe('useDeleteOne', () => {
    it('should be defined', () => {
        expect(useDeleteOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id

        const { result } = renderHook(
            () =>
                useDeleteOne({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ id })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data?.id).toBeDefined()
    })

    it('should invalidate data for getList query keys', async () => {
        const id = BEERS_MOCK_DATA[0].id
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetListQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useDeleteOne({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ id })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetListQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should invalidate data for getMany query keys', async () => {
        const id = BEERS_MOCK_DATA[0].id
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetManyQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useDeleteOne({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ id })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetManyQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should invalidate data for getOne query key', async () => {
        const id = BEERS_MOCK_DATA[0].id
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetOneQueryKey('beers', { id }), { id })

        const { result } = renderHook(
            () =>
                useDeleteOne({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({ id })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(
            queryClient.getQueryState(createGetOneQueryKey('beers', { id: result.current.data?.id as string }))
                ?.isInvalidated
        ).toBe(true)
    })
})

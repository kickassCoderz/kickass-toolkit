import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { createTestQueryClient } from '../../__fixtures__/createTestQueryClient'
import { createGetListQueryKey, createGetManyQueryKey, createGetOneQueryKey } from '../../utils'
import { useUpdateMany } from './useUpdateMany'

describe('useUpdateMany', () => {
    it('should be defined', () => {
        expect(useUpdateMany).toBeDefined()
    })

    it('should render', async () => {
        const payload = [{ name: 'Imperial Stout' }, { name: 'New England IPA' }]
        const ids = BEERS_MOCK_DATA.slice(0, 2).map(item => item.id)

        const { result } = renderHook(
            () =>
                useUpdateMany({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({
                ids,
                payload
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(payload)

        result.current.data?.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })

    it('should invalidate data for getList query keys', async () => {
        const payload = [{ name: 'Imperial Stout' }, { name: 'New England IPA' }]
        const ids = BEERS_MOCK_DATA.slice(0, 2).map(item => item.id)
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetListQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useUpdateMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({
                ids,
                payload
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetListQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should invalidate data for getMany query keys', async () => {
        const payload = [{ name: 'Imperial Stout' }, { name: 'New England IPA' }]
        const ids = BEERS_MOCK_DATA.slice(0, 2).map(item => item.id)
        const queryClient = createTestQueryClient()
        queryClient.setQueryData(createGetManyQueryKey('beers'), [])

        const { result } = renderHook(
            () =>
                useUpdateMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({
                ids,
                payload
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(queryClient.getQueryState(createGetManyQueryKey('beers'))?.isInvalidated).toBe(true)
    })

    it('should prefill data for getOne query keys', async () => {
        const payload = [{ name: 'Imperial Stout' }, { name: 'New England IPA' }]
        const ids = BEERS_MOCK_DATA.slice(0, 2).map(item => item.id)
        const queryClient = createTestQueryClient()

        const { result } = renderHook(
            () =>
                useUpdateMany({
                    resource: 'beers'
                }),
            {
                wrapper: ({ children }) => <TestWrapper queryClient={queryClient}>{children}</TestWrapper>
            }
        )

        act(() => {
            result.current.mutate({
                ids,
                payload
            })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        result.current.data?.map(item => {
            expect(queryClient.getQueryData(createGetOneQueryKey('beers', { id: item.id }))).toBeDefined()
        })
    })
})

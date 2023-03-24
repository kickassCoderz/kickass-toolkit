import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
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

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.stringContaining(ids[0]),
                    name: expect.stringContaining(BEERS_MOCK_DATA[0].name)
                }),
                expect.objectContaining({
                    id: expect.stringContaining(ids[1]),
                    name: expect.stringContaining(BEERS_MOCK_DATA[1].name)
                })
            ])
        )
    })
})

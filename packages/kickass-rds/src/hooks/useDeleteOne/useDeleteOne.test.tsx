import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
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

        expect(result.current.data).toEqual(
            expect.objectContaining({
                id: expect.stringContaining(id),
                name: expect.stringContaining(BEERS_MOCK_DATA[0].name)
            })
        )

        expect(result.current.data).toBeDefined()
    })
})

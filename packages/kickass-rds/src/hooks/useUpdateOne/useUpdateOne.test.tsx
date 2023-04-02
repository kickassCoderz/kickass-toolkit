import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useUpdateOne } from './useUpdateOne'

describe('useUpdateOne', () => {
    it('should be defined', () => {
        expect(useUpdateOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id
        const payload = { name: 'Vukovarsko' }

        const { result } = renderHook(
            () =>
                useUpdateOne({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ id, payload })
        })

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.objectContaining({
                id: expect.stringContaining(id),
                name: expect.stringContaining(payload.name)
            })
        )
    })
})

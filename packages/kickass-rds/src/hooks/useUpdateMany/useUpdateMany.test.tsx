import { act, renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useUpdateMany } from './useUpdateMany'

describe('useUpdateMany', () => {
    it('should be defined', () => {
        expect(useUpdateMany).toBeDefined()
    })

    it('should render', async () => {
        const payload = BEERS_MOCK_DATA.slice(0, 2)
        const ids = payload.map(item => item.id)

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
    })
})

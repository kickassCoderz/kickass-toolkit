import { renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useGetMany } from './useGetMany'

describe('useGetMany', () => {
    it('should be defined', () => {
        expect(useGetMany).toBeDefined()
    })

    it('should render', async () => {
        const payload = BEERS_MOCK_DATA.slice(0, 2)
        const ids = payload.map(item => item.id)

        const { result } = renderHook(
            () =>
                useGetMany({
                    resource: 'beers',
                    params: {
                        ids
                    }
                }),
            {
                wrapper: TestWrapper
            }
        )

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(payload)
    })
})

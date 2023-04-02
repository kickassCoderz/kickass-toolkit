import { renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useGetMany } from './useGetMany'

describe('useGetMany', () => {
    it('should be defined', () => {
        expect(useGetMany).toBeDefined()
    })

    it('should render', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]

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

        expect(result.current.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(BEERS_MOCK_DATA[0]),
                expect.objectContaining(BEERS_MOCK_DATA[1])
            ])
        )
    })
})

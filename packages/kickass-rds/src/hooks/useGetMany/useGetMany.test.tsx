import { act, renderHook } from '@testing-library/react'

import { TestWrapper,BEERS_MOCK_DATA } from '../../__mocks__'
import { useGetMany } from './useGetMany'

describe('useGetMany', () => {
    it('should be defined', () => {
        expect(useGetMany).toBeDefined()
    })

    it('should render', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]

        const { result, waitFor } = renderHook(
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

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining(BEERS_MOCK_DATA[0]),
                expect.objectContaining(BEERS_MOCK_DATA[1])
            ])
        )
    })
})

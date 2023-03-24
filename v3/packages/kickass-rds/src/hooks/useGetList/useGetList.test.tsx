import { act, renderHook } from '@testing-library/react'

import { TestWrapper,BEERS_MOCK_DATA } from '../../__mocks__'
import { useGetList } from './useGetList'

describe('useGetList', () => {
    it('should be defined', () => {
        expect(useGetList).toBeDefined()
    })

    it('should render', async () => {
        const { result, waitFor } = renderHook(
            () =>
                useGetList({
                    resource: 'beers'
                }),

            {
                wrapper: TestWrapper
            }
        )

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject({
            data: BEERS_MOCK_DATA,
            total: 4
        })
    })
})

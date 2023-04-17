import { renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useGetList } from './useGetList'

describe('useGetList', () => {
    it('should be defined', () => {
        expect(useGetList).toBeDefined()
    })

    it('should render', async () => {
        const payload = { ...BEERS_MOCK_DATA }

        const { result } = renderHook(
            () =>
                useGetList({
                    resource: 'beers'
                }),

            {
                wrapper: TestWrapper
            }
        )

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject({
            data: payload,
            total: 4
        })
    })
})

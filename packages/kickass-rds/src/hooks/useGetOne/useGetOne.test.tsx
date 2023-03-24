import { renderHook, waitFor } from '@testing-library/react'

import { BEERS_MOCK_DATA, TestWrapper } from '../../__fixtures__'
import { useGetOne } from './useGetOne'

describe('useGetOne', () => {
    it('should be defined', () => {
        expect(useGetOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id

        const { result } = renderHook(
            () =>
                useGetOne({
                    resource: 'beers',
                    params: {
                        id
                    }
                }),
            {
                wrapper: TestWrapper
            }
        )

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(BEERS_MOCK_DATA[0])
    })
})

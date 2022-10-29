import { renderHook } from '@testing-library/react-hooks'

import { TestWrapper } from '../../mocks'
import { BEERS_MOCK_DATA } from '../../mocks/consts'
import { useGetOne } from './useGetOne'

describe('useGetOne', () => {
    it('should be defined', () => {
        expect(useGetOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id

        const { result, waitFor } = renderHook(
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

import { act, renderHook } from '@testing-library/react-hooks'

import { TestWrapper } from '../../mocks'
import { BEERS_MOCK_DATA } from '../../mocks/consts'
import { useDeleteOne } from './useDeleteOne'

describe('useDeleteOne', () => {
    it('should be defined', () => {
        expect(useDeleteOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id

        const { result, waitFor } = renderHook(
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

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toEqual(
            expect.objectContaining({
                id: expect.stringContaining(id),
                name: expect.stringContaining(BEERS_MOCK_DATA[0].name)
            })
        )

        expect(result.current.data).toBeDefined()
    })
})

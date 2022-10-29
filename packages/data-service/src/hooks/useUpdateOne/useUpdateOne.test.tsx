import { act, renderHook } from '@testing-library/react-hooks'

import { TestWrapper } from '../../mocks'
import { BEERS_MOCK_DATA } from '../../mocks/consts'
import { useUpdateOne } from './useUpdateOne'

describe('useUpdateOne', () => {
    it('should be defined', () => {
        expect(useUpdateOne).toBeDefined()
    })

    it('should render', async () => {
        const id = BEERS_MOCK_DATA[0].id
        const payload = { name: 'Vukovarsko' }

        const { result, waitFor } = renderHook(
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

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.objectContaining({
                id: expect.stringContaining(id),
                name: expect.stringContaining(payload.name)
            })
        )
    })
})

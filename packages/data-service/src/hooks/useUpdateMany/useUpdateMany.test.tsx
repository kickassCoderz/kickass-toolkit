import { act, renderHook } from '@testing-library/react-hooks'

import { TestWrapper } from '../../mocks'
import { BEERS_MOCK_DATA } from '../../mocks/consts'
import { useUpdateMany } from './useUpdateMany'

describe('useUpdateMany', () => {
    it('should be defined', () => {
        expect(useUpdateMany).toBeDefined()
    })

    it('should render', async () => {
        const ids = [BEERS_MOCK_DATA[0].id, BEERS_MOCK_DATA[1].id]
        const payload = [{ name: 'Velebitsko' }, { name: 'Daruvarsko' }]

        const { result, waitFor } = renderHook(
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

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.stringContaining(ids[0]),
                    name: expect.stringContaining(payload[0].name)
                }),
                expect.objectContaining({
                    id: expect.stringContaining(ids[1]),
                    name: expect.stringContaining(payload[1].name)
                })
            ])
        )
    })
})

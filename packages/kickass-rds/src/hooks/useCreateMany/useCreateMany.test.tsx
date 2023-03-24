import { act, renderHook, waitFor } from '@testing-library/react'

import { TestWrapper } from '../../__fixtures__'
import { useCreateMany } from './useCreateMany'

describe('useCreateMany', () => {
    it('should be defined', () => {
        expect(useCreateMany).toBeDefined()
    })

    it('should render', async () => {
        const payload = [{ name: 'Vukovarsko' }, { name: 'Velebitsko' }]

        const { result } = renderHook(
            () =>
                useCreateMany({
                    resource: 'beers'
                }),
            {
                wrapper: TestWrapper
            }
        )

        act(() => {
            result.current.mutate({ payload })
        })

        await waitFor(() => result.current.isSuccess)

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.stringContaining(payload[0].name)
                }),
                expect.objectContaining({
                    id: expect.any(String),
                    name: expect.stringContaining(payload[1].name)
                })
            ])
        )
    })
})

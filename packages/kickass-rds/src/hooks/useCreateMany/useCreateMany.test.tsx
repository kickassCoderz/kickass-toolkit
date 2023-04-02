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

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        expect(result.current.data).toMatchObject(payload)
    })

    it('should return id for each item', async () => {
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

        await waitFor(() => expect(result.current.isSuccess).toBe(true))

        expect(result.current.data).toBeDefined()

        result.current.data?.forEach(item => {
            expect(item.id).toBeDefined()
        })
    })
})

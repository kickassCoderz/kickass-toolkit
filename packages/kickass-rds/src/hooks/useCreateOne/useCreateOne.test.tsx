import { act, renderHook, waitFor } from '@testing-library/react'

import { TestWrapper } from '../../__fixtures__'
import { useCreateOne } from './useCreateOne'

describe('useCreateOne', () => {
    it('should be defined', () => {
        expect(useCreateOne).toBeDefined()
    })

    it('should render', async () => {
        const payload = { name: 'Vukovarsko' }

        const { result } = renderHook(
            () =>
                useCreateOne({
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
            expect.objectContaining({
                id: expect.any(String),
                name: expect.stringContaining(payload.name)
            })
        )
    })
})

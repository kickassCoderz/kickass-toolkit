import { renderHook } from '@testing-library/react'

import { useMountEffect } from './useMountEffect'

describe('useMountEffect', () => {
    it('should call callbackFn only on first mount', () => {
        const callbackSpy = jest.fn()

        const { rerender, result, unmount } = renderHook(() => useMountEffect(callbackSpy))

        expect(result.current).toBeUndefined()

        expect(callbackSpy).toHaveBeenCalledTimes(1)

        rerender()

        expect(callbackSpy).toHaveBeenCalledTimes(1)

        unmount()

        expect(callbackSpy).toHaveBeenCalledTimes(1)
    })
})

import { renderHook } from '@testing-library/react'

import { useUnmountEffect } from './useUnmountEffect'

describe('useUnmountEffect', () => {
    it('should not call callbackFn when component is mounting or rerendering', () => {
        const callbackSpy = jest.fn()

        const { rerender, result } = renderHook(() => useUnmountEffect(callbackSpy))

        expect(result.current).toBeUndefined()

        expect(callbackSpy).toHaveBeenCalledTimes(0)

        rerender()

        expect(callbackSpy).toHaveBeenCalledTimes(0)
    })

    it('should call callbackFn when component is unmounting', () => {
        const callbackSpy = jest.fn()

        const { unmount } = renderHook(() => useUnmountEffect(callbackSpy))

        unmount()

        expect(callbackSpy).toHaveBeenCalledTimes(1)
    })

    it('should call callbackFn on unmount even if it has changed', () => {
        const originalCallbackSpy = jest.fn()
        const newCallbackSpy = jest.fn()

        const { unmount, rerender } = renderHook(({ fn }) => useUnmountEffect(fn), {
            initialProps: {
                fn: originalCallbackSpy
            }
        })

        rerender({ fn: newCallbackSpy })

        unmount()

        expect(originalCallbackSpy).toHaveBeenCalledTimes(0)

        expect(newCallbackSpy).toHaveBeenCalledTimes(1)
    })
})

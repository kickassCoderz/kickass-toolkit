import { renderHook } from '@testing-library/react'

import { useTimeout } from './useTimeout'

describe('useTimeout', () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('should be defined', () => {
        expect(useTimeout).toBeDefined()
    })

    it('should render', () => {
        const onTimeoutSpy = jest.fn()
        const { result } = renderHook(() => useTimeout(onTimeoutSpy, 1000))

        expect(result.current).toBeUndefined()
    })

    it('should call timeout callback', () => {
        const onTimeoutSpy = jest.fn()
        renderHook(() => useTimeout(onTimeoutSpy, 1000))
        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledWith()
        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)
    })

    it('should call timeout only once and I shall say this only once', () => {
        const onTimeoutSpy = jest.fn()
        renderHook(() => useTimeout(onTimeoutSpy, 1000))
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)
    })

    it('should abandon old timeout callback after ms change', () => {
        const onTimeoutSpy = jest.fn()
        const { rerender } = renderHook(({ ms }: { ms: number }) => useTimeout(onTimeoutSpy, ms), {
            initialProps: {
                ms: 1000
            }
        })

        rerender({ ms: 2000 })

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)
    })

    it('should call new callback after callback change', () => {
        const onTimeoutSpy = jest.fn()
        const onTimeoutSpy2 = jest.fn()
        const { rerender } = renderHook(({ callback }: { callback: () => void }) => useTimeout(callback, 1000), {
            initialProps: {
                callback: onTimeoutSpy
            }
        })

        rerender({ callback: onTimeoutSpy2 })

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(0)
        expect(onTimeoutSpy2).toHaveBeenCalledTimes(1)
    })

    it('should not call timeout callback after unmount', () => {
        const onTimeoutSpy = jest.fn()
        const { unmount } = renderHook(() => useTimeout(onTimeoutSpy, 1000))

        unmount()

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(0)
    })

    it('should call timeout callback with args', () => {
        const onTimeoutSpy = jest.fn((a: string, b: number) => {
            return a + b
        })
        renderHook(({ a, b }) => useTimeout(onTimeoutSpy, 1000, a, b), {
            initialProps: {
                a: 'a',
                b: 1
            }
        })
        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)
        expect(onTimeoutSpy).toHaveBeenCalledWith('a', 1)
    })
})

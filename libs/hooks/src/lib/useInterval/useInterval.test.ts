import { renderHook } from '@testing-library/react'

import { useInterval } from './useInterval'

describe('useInterval', () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('should be defined', () => {
        expect(useInterval).toBeDefined()
    })

    it('should render', () => {
        const onIntervalSpy = jest.fn()
        const { result } = renderHook(() => useInterval(onIntervalSpy, 1000))

        expect(result.current).toBeUndefined()
    })

    it('should call interval callback', () => {
        const onIntervalSpy = jest.fn()
        renderHook(() => useInterval(onIntervalSpy, 1000))
        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
    })

    it('should call interval callback multiple times', () => {
        const onIntervalSpy = jest.fn()
        renderHook(() => useInterval(onIntervalSpy, 1000))
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()
        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(3)
    })

    it('should abbandon old interval callback after delay change', () => {
        const onIntervalSpy = jest.fn()
        const { rerender } = renderHook(({ delay }: { delay: number }) => useInterval(onIntervalSpy, delay), {
            initialProps: {
                delay: 1000
            }
        })
        jest.runOnlyPendingTimers()

        rerender({ delay: 2000 })

        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(2)
    })

    it('should call new callback after callback change', () => {
        const onIntervalSpy = jest.fn()
        const onIntervalSpy2 = jest.fn()
        const { rerender } = renderHook(({ callback }: { callback: () => void }) => useInterval(callback, 1000), {
            initialProps: {
                callback: onIntervalSpy
            }
        })
        jest.runOnlyPendingTimers()

        rerender({ callback: onIntervalSpy2 })

        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
        expect(onIntervalSpy2).toHaveBeenCalledTimes(1)
    })

    it('should not call interval callback after unmount', () => {
        const onIntervalSpy = jest.fn()
        const { unmount } = renderHook(() => useInterval(onIntervalSpy, 1000))
        jest.runOnlyPendingTimers()

        unmount()

        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
    })

    it('should call interval callback with args', () => {
        const onIntervalSpy = jest.fn((a: string, b: number) => {
            return a + b
        })
        const { rerender } = renderHook(({ a, b }) => useInterval(onIntervalSpy, 1000, a, b), {
            initialProps: {
                a: 'a',
                b: 1
            }
        })
        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
        expect(onIntervalSpy).toHaveBeenCalledWith('a', 1)

        rerender({ a: 'b', b: 2 })
        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(2)
        expect(onIntervalSpy).toHaveBeenCalledWith('a', 1)
    })
})

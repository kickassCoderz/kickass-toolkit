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

        expect(typeof result.current).toBe('function')
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

    it('should abandon old interval callback after ms change', () => {
        const onIntervalSpy = jest.fn()
        const { rerender } = renderHook(({ ms }: { ms: number }) => useInterval(onIntervalSpy, ms), {
            initialProps: {
                ms: 1000
            }
        })
        jest.runOnlyPendingTimers()

        rerender({ ms: 2000 })

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

    it('should not call interval callback after calling clear function', () => {
        const onIntervalSpy = jest.fn()
        const { result } = renderHook(() => useInterval(onIntervalSpy, 1000))
        jest.runOnlyPendingTimers()

        result.current()

        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
    })

    it('should clear latest interval after props change', () => {
        const onIntervalSpy = jest.fn()
        const { result, rerender } = renderHook(({ ms }: { ms: number }) => useInterval(onIntervalSpy, ms), {
            initialProps: {
                ms: 1000
            }
        })
        jest.runOnlyPendingTimers()

        rerender({ ms: 2000 })

        result.current()

        jest.runOnlyPendingTimers()

        expect(onIntervalSpy).toHaveBeenCalledTimes(1)
    })
})

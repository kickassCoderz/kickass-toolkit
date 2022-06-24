import { act, renderHook } from '@testing-library/react'

import { useRequestAnimationFrameCallback } from './useRequestAnimationFrameCallback'

describe('useRequestAnimationFrameCallback', () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.clearAllTimers()
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('should be defined', () => {
        expect(useRequestAnimationFrameCallback).toBeDefined()
    })

    it('should render and return an array with two functions', () => {
        const spyFn = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrameCallback(spyFn))

        expect(result.current).toBeDefined()

        expect(result.current).toBeInstanceOf(Array)

        expect(result.current.length).toBe(2)

        expect(result.current[0]).toBeInstanceOf(Function)

        expect(result.current[1]).toBeInstanceOf(Function)

        expect(spyFn).toBeCalledTimes(0)
    })

    it('should call passed callback only on next raf', () => {
        const spyFn = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrameCallback(spyFn))

        const execute = result.current[0]

        act(() => execute())

        expect(spyFn).toHaveBeenCalledTimes(0)

        jest.advanceTimersToNextTimer()

        expect(spyFn).toHaveBeenCalledTimes(1)
    })

    it('should cancel scheduled call on consequential calls', () => {
        const spyFn = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrameCallback(spyFn))

        const execute = result.current[0]

        act(() => execute())
        act(() => execute())
        act(() => execute())

        expect(spyFn).toHaveBeenCalledTimes(0)

        jest.advanceTimersToNextTimer(4)

        expect(spyFn).toHaveBeenCalledTimes(1)
    })

    it('should cancel scheduled call when clear method is called', () => {
        const spyFn = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrameCallback(spyFn))

        const execute = result.current[0]
        const clear = result.current[1]

        act(() => execute())

        expect(spyFn).toHaveBeenCalledTimes(0)

        act(() => clear())

        jest.advanceTimersToNextTimer(4)

        expect(spyFn).toHaveBeenCalledTimes(0)
    })

    it('should cancel scheduled call on unmount', () => {
        const spyFn = jest.fn()
        const { result, unmount } = renderHook(() => useRequestAnimationFrameCallback(spyFn))

        const execute = result.current[0]

        act(() => execute())

        expect(spyFn).toHaveBeenCalledTimes(0)

        unmount()

        jest.advanceTimersToNextTimer(4)

        expect(spyFn).toHaveBeenCalledTimes(0)
    })
})

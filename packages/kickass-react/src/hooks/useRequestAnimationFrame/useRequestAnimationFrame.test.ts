import { act, renderHook } from '@testing-library/react-hooks'

import { useRequestAnimationFrame } from './useRequestAnimationFrame'

describe('useRequestAnimationFrame', () => {
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
        expect(useRequestAnimationFrame).toBeDefined()
    })

    it('should render', () => {
        const spyFunction = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrame())

        expect(result.current).toBeDefined()

        expect(result.current).toBeInstanceOf(Array)

        expect(result.current).toHaveLength(2)

        expect(result.current[0]).toBeInstanceOf(Function)

        expect(result.current[1]).toBeInstanceOf(Function)

        expect(spyFunction).toHaveBeenCalledTimes(0)
    })

    it('should call passed callback only on next raf', () => {
        const spyFunction = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrame())

        const execute = result.current[0]

        act(() => execute(spyFunction))

        expect(spyFunction).toHaveBeenCalledTimes(0)

        jest.advanceTimersToNextTimer()

        expect(spyFunction).toHaveBeenCalledTimes(1)
    })

    it('should cancel scheduled call on consequential calls', () => {
        const spyFunction = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrame())

        const execute = result.current[0]

        act(() => execute(spyFunction))
        act(() => execute(spyFunction))
        act(() => execute(spyFunction))

        expect(spyFunction).toHaveBeenCalledTimes(0)

        jest.advanceTimersToNextTimer(4)

        expect(spyFunction).toHaveBeenCalledTimes(1)
    })

    it('should cancel scheduled call when clear method is called', () => {
        const spyFunction = jest.fn()
        const { result } = renderHook(() => useRequestAnimationFrame())

        const execute = result.current[0]
        const clear = result.current[1]

        act(() => execute(spyFunction))

        expect(spyFunction).toHaveBeenCalledTimes(0)

        act(() => clear())

        jest.advanceTimersToNextTimer(4)

        expect(spyFunction).toHaveBeenCalledTimes(0)
    })

    it('should cancel scheduled call on unmount', () => {
        const spyFunction = jest.fn()
        const { result, unmount } = renderHook(() => useRequestAnimationFrame())

        const execute = result.current[0]

        act(() => execute(spyFunction))

        expect(spyFunction).toHaveBeenCalledTimes(0)

        unmount()

        jest.advanceTimersToNextTimer(4)

        expect(spyFunction).toHaveBeenCalledTimes(0)
    })
})

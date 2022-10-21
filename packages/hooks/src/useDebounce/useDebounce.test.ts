import { act, renderHook } from '@testing-library/react'

import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
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
        expect(useDebounce).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useDebounce(200))

        expect(result.current).toBeDefined()

        expect(result.current).toBeInstanceOf(Array)

        expect(result.current.length).toBe(2)

        expect(result.current[0]).toBeInstanceOf(Function)

        expect(result.current[1]).toBeInstanceOf(Function)
    })

    it('should run given callback only after specified delay since last call', () => {
        const spyFn = jest.fn()

        const { result } = renderHook(() => useDebounce(200))

        const execute = result.current[0]

        act(() => execute(spyFn))

        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)

        act(() => execute(spyFn))

        jest.advanceTimersByTime(199)

        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(1)

        expect(spyFn).toHaveBeenCalledTimes(1)
    })

    it('should cancel debounce execution when clear method is called', () => {
        const spyFn = jest.fn()

        const { result } = renderHook(() => useDebounce(200))

        const execute = result.current[0]
        const clear = result.current[1]

        act(() => execute(spyFn))

        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)

        act(() => clear())

        jest.advanceTimersByTime(100)

        expect(spyFn).not.toHaveBeenCalled()
    })

    it('should cancel debounce execution after component unmount', () => {
        const spyFn = jest.fn()

        const { result, unmount } = renderHook(() => useDebounce(200))

        const execute = result.current[0]

        act(() => execute(spyFn))

        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)

        expect(spyFn).not.toHaveBeenCalled()

        unmount()

        jest.advanceTimersByTime(100)

        expect(spyFn).not.toHaveBeenCalled()
    })
})

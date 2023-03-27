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

        expect(result.current).toHaveLength(2)

        expect(result.current[0]).toBeInstanceOf(Function)

        expect(result.current[1]).toBeInstanceOf(Function)
    })

    it('should run given callback only after specified delay since last call', () => {
        const spyFunction = jest.fn()

        const { result } = renderHook(() => useDebounce(200))

        const execute = result.current[0]

        act(() => execute(spyFunction))

        expect(spyFunction).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)

        act(() => execute(spyFunction))

        jest.advanceTimersByTime(199)

        expect(spyFunction).not.toHaveBeenCalled()

        jest.advanceTimersByTime(1)

        expect(spyFunction).toHaveBeenCalledTimes(1)
    })

    it('should cancel debounce execution when clear method is called', () => {
        const spyFunction = jest.fn()

        const { result } = renderHook(() => useDebounce(200))

        const execute = result.current[0]
        const clear = result.current[1]

        act(() => execute(spyFunction))

        expect(spyFunction).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)

        act(() => clear())

        jest.advanceTimersByTime(100)

        expect(spyFunction).not.toHaveBeenCalled()
    })

    it('should cancel debounce execution after component unmount', () => {
        const spyFunction = jest.fn()

        const { result, unmount } = renderHook(() => useDebounce(200))

        const execute = result.current[0]

        act(() => execute(spyFunction))

        expect(spyFunction).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)

        expect(spyFunction).not.toHaveBeenCalled()

        unmount()

        jest.advanceTimersByTime(100)

        expect(spyFunction).not.toHaveBeenCalled()
    })
})

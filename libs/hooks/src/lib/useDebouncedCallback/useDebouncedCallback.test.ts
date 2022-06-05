import { renderHook } from '@testing-library/react'

import { useDebouncedCallback } from './useDebouncedCallback'

describe('useDebouncedCallback', () => {
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
        expect(useDebouncedCallback).toBeDefined()
    })

    it('should render', () => {
        const spyFn = jest.fn()
        const { result } = renderHook(() => {
            useDebouncedCallback(spyFn, 200)
        })
        expect(result.current).toBeUndefined()
    })

    it('should run given callback only after specified delay since last call', () => {
        const spyFn = jest.fn()

        const { result } = renderHook(() => useDebouncedCallback(spyFn, 200))

        const execute = result.current[0]

        execute()
        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(100)
        execute()

        jest.advanceTimersByTime(199)
        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(1)
        expect(spyFn).toHaveBeenCalledTimes(1)
    })

    it('should pass parameters to callback', () => {
        const spyFn = jest.fn((a: number, c: string) => {
            return `${a}${c}`
        })

        const { result } = renderHook(() => useDebouncedCallback(spyFn, 200))

        const execute = result.current[0]

        execute(1, 'abc')
        jest.advanceTimersByTime(200)
        expect(spyFn).toHaveBeenCalledWith(1, 'abc')
    })

    it('should cancel previously scheduled call even if parameters changed', () => {
        const spyFn1 = jest.fn()
        const spyFn2 = jest.fn()

        const { result, rerender } = renderHook(
            ({ i }) => useDebouncedCallback(() => (i === 1 ? spyFn1() : spyFn2()), 200),
            {
                initialProps: { i: 1 }
            }
        )

        const execute = result.current[0]

        execute()
        jest.advanceTimersByTime(100)

        rerender({ i: 2 })
        execute()
        jest.advanceTimersByTime(200)

        expect(spyFn1).not.toHaveBeenCalled()
        expect(spyFn2).toHaveBeenCalledTimes(1)
    })

    it('should cancel debounce execution when clear method is called', () => {
        const spyFn = jest.fn()

        const { result } = renderHook(() => useDebouncedCallback(spyFn, 200))

        const execute = result.current[0]
        const clear = result.current[1]

        execute()
        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)
        clear()
        jest.advanceTimersByTime(100)
        expect(spyFn).not.toHaveBeenCalled()
    })

    it('should cancel debounce execution after component unmount', () => {
        const spyFn = jest.fn()

        const { result, unmount } = renderHook(() => useDebouncedCallback(spyFn, 200))

        const execute = result.current[0]

        execute()
        expect(spyFn).not.toHaveBeenCalled()

        jest.advanceTimersByTime(149)
        expect(spyFn).not.toHaveBeenCalled()

        unmount()
        jest.advanceTimersByTime(100)
        expect(spyFn).not.toHaveBeenCalled()
    })
})

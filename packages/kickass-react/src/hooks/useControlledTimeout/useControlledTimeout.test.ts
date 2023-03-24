import { act, renderHook } from '@testing-library/react'

import { useControlledTimeout } from '.'

describe('useControlledTimeout', () => {
    beforeAll(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.clearAllTimers()
        jest.clearAllMocks()
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('should be defined', () => {
        expect(useControlledTimeout).toBeDefined()
    })

    const onTimeoutSpy = jest.fn()

    it('should render', () => {
        const { result } = renderHook(useControlledTimeout)

        expect(Array.isArray(result.current)).toBeTruthy()

        const [execute, clear] = result.current

        expect(typeof execute).toBe('function')

        expect(typeof clear).toBe('function')
    })

    it("should start timer when 'execute' is called", () => {
        const { result } = renderHook(useControlledTimeout)

        const [execute] = result.current

        act(() => {
            execute(onTimeoutSpy, 1000)
        })

        expect(onTimeoutSpy).not.toHaveBeenCalled()

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledTimes(1)
    })

    it("should clear timer when 'clear' is called", () => {
        const { result } = renderHook(useControlledTimeout)

        const [execute, clear] = result.current

        act(() => {
            execute(onTimeoutSpy, 1000)
        })

        expect(onTimeoutSpy).not.toHaveBeenCalled()

        jest.advanceTimersByTime(500)

        expect(onTimeoutSpy).not.toHaveBeenCalled()

        act(() => {
            clear()
        })

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).not.toHaveBeenCalled()
    })

    it('should call provided callback with provided arguments', () => {
        const { result } = renderHook(useControlledTimeout)

        const [execute] = result.current

        act(() => {
            execute(onTimeoutSpy, 1000, 'foo', 'bar')
        })

        expect(onTimeoutSpy).not.toHaveBeenCalled()

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).toHaveBeenCalledWith('foo', 'bar')
    })

    it("should properly handle 'this' when using wrapper function", () => {
        let testValue: string | undefined

        const myObject = {
            array: ['zero', 'one', 'two'],
            getArray(key?: number) {
                if (key) {
                    testValue = this?.array?.[key]
                }
            }
        }

        const { result } = renderHook(useControlledTimeout)

        const [execute] = result.current

        act(() => {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            execute(myObject.getArray, 1000, 1)
        })

        jest.runOnlyPendingTimers()

        expect(testValue).toBeUndefined()

        act(() => {
            execute(() => myObject.getArray(1), 1000)
        })

        jest.runOnlyPendingTimers()

        expect(testValue).toBe('one')

        act(() => {
            execute(index => myObject.getArray(index), 1000, 1)
        })

        jest.runOnlyPendingTimers()

        expect(testValue).toBe('one')
    })

    it('should clear timer on unmount', () => {
        const { result, unmount } = renderHook(useControlledTimeout)

        const [execute] = result.current

        act(() => {
            execute(onTimeoutSpy, 1000)
        })

        expect(onTimeoutSpy).not.toHaveBeenCalled()

        jest.advanceTimersByTime(500)

        unmount()

        jest.runOnlyPendingTimers()

        expect(onTimeoutSpy).not.toHaveBeenCalled()
    })
})

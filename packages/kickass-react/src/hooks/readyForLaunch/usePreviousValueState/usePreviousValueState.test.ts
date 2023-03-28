import { act, renderHook } from '@testing-library/react'
import { useCallback } from 'react'

import { usePreviousValueState } from './usePreviousValueState'

describe('usePreviousValueState', () => {
    it('should be defined', () => {
        expect(usePreviousValueState).toBeDefined()
    })

    it('should return an object containing currentValue,previousValue and setValue', () => {
        const { result } = renderHook(usePreviousValueState, { initialProps: { currentValue: 1 } })

        expect(typeof result.current).toBe('object')

        expect(Reflect.has(result.current, 'currentValue')).toBeTruthy()

        expect(Reflect.has(result.current, 'previousValue')).toBeTruthy()

        expect(Reflect.has(result.current, 'setValue')).toBeTruthy()

        expect(typeof result.current.setValue).toBe('function')
    })

    it('should set current and previous value', () => {
        const { result } = renderHook(initialProperties => usePreviousValueState(initialProperties), {
            initialProps: { currentValue: '' }
        })

        expect(result.current.previousValue).toBeUndefined()

        expect(result.current.currentValue).toBe('')

        act(() => result.current.setValue('s'))

        expect(result.current.previousValue).toBe('')

        expect(result.current.currentValue).toBe('s')

        act(() => result.current.setValue('sa'))

        expect(result.current.previousValue).toBe('s')

        expect(result.current.currentValue).toBe('sa')

        act(() => result.current.setValue('sas'))

        expect(result.current.previousValue).toBe('sa')

        expect(result.current.currentValue).toBe('sas')
    })

    it('should not update previous value if current value is the same', () => {
        const { result } = renderHook(usePreviousValueState, {
            initialProps: { currentValue: 0 }
        })

        expect(result.current.previousValue).toBeUndefined()

        act(() => {
            result.current.setValue(1)
        })

        expect(result.current.previousValue).toBe(0)

        act(() => {
            result.current.setValue(1)
        })

        expect(result.current.previousValue).toBe(0)

        act(() => {
            result.current.setValue(1)
        })

        expect(result.current.previousValue).toBe(0)
    })

    it('should accept custom equalty function', () => {
        const { result } = renderHook(
            initialProperties =>
                usePreviousValueState(
                    initialProperties,
                    useCallback((a: number | undefined, b: number) => a !== b, [])
                ),
            {
                initialProps: { currentValue: 0 }
            }
        )

        expect(result.current.previousValue).toBeUndefined()

        act(() => {
            result.current.setValue(1)
        })

        expect(result.current.previousValue).toBe(0)
    })
})

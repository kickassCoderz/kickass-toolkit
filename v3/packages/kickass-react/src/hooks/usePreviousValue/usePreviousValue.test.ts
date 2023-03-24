import { act, renderHook } from '@testing-library/react-hooks'
import { useState } from 'react'

import { usePreviousValue } from './usePreviousValue'

describe('usePreviousValue', () => {
    it('should be defined', () => {
        expect(usePreviousValue).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => usePreviousValue(undefined))

        expect(result.current).toBeUndefined()
    })

    it('should return undefined on first render', () => {
        const { result } = renderHook(() => {
            const [value] = useState(0)
            const previousValue = usePreviousValue(value)

            return { previousValue }
        })

        expect(result.current.previousValue).toBeUndefined()
    })

    it('should return previous value after rerender', () => {
        const { result, rerender } = renderHook(() => {
            const [value, setValue] = useState(0)
            const previousValue = usePreviousValue(value)

            return { previousValue, setValue }
        })
        const setState = result.current.setValue

        act(() => {
            setState(current => current + 1)
        })
        rerender()

        expect(result.current.previousValue).toBe(1)
    })

    it('should return previous values after each rerender', () => {
        const { result, rerender } = renderHook(() => {
            const [value, setValue] = useState(0)
            const previousValue = usePreviousValue(value)

            return { previousValue, setValue }
        })
        const setState = result.current.setValue

        expect(result.current.previousValue).toBeUndefined()

        act(() => {
            setState(current => current + 1)
        })
        rerender()

        expect(result.current.previousValue).toBe(1)

        act(() => {
            setState(current => current + 1)
        })
        rerender()

        expect(result.current.previousValue).toBe(2)
    })
})

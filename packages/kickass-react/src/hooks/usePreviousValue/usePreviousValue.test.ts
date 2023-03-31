import { renderHook } from '@testing-library/react'
import { useCallback } from 'react'

import { usePreviousValue } from './usePreviousValue'

describe('usePreviousValue', () => {
    it('should be defined', () => {
        expect(usePreviousValue).toBeDefined()
    })

    it('should return undefined on first render', () => {
        const { result } = renderHook(usePreviousValue, { initialProps: 1 })

        expect(result.current).toBeUndefined()
    })

    it('should return previous value after rerender', () => {
        const { result, rerender } = renderHook(usePreviousValue, {
            initialProps: 0
        })

        expect(result.current).toBeUndefined()

        rerender(1)

        expect(result.current).toBe(0)

        rerender(2)

        expect(result.current).toBe(1)

        rerender(3)

        expect(result.current).toBe(2)

        rerender(4)

        expect(result.current).toBe(3)
    })

    it('should not update previous value if current value is the same', () => {
        const { result, rerender } = renderHook(usePreviousValue, {
            initialProps: 0
        })

        expect(result.current).toBeUndefined()

        rerender(1)

        expect(result.current).toBe(0)

        rerender(1)

        expect(result.current).toBe(0)

        rerender(1)

        expect(result.current).toBe(0)
    })

    it('should accept custom equalty function', () => {
        const { result, rerender } = renderHook(
            initialProperties =>
                usePreviousValue(
                    initialProperties,
                    useCallback((a: number | undefined, b: number) => a !== b, [])
                ),
            {
                initialProps: 0
            }
        )

        expect(result.current).toBeUndefined()

        rerender(1)

        expect(result.current).toBe(0)
    })
})

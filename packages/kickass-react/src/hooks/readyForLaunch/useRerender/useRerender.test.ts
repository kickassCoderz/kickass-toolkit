import { act, renderHook } from '@testing-library/react'
import { useEffect, useRef } from 'react'

import { useRerender } from './useRerender'

describe('useRerender', () => {
    it('should be defined', () => {
        expect(useRerender).toBeDefined()
    })

    it('should return same function on each re-render', () => {
        const { result, rerender } = renderHook(() => useRerender())

        const function1 = result.current

        rerender()

        const function2 = result.current

        rerender()

        const function3 = result.current

        expect(function1).toBeInstanceOf(Function)

        expect(function1).toBe(function2)

        expect(function2).toBe(function3)
    })

    it('should rerender component on returned rerender function call', () => {
        const { result } = renderHook(() => {
            const countReference = useRef(0)

            useEffect(() => {
                countReference.current += 1
            })

            return [countReference.current, useRerender()] as const
        })

        expect(result.current[0]).toBe(0)

        void act(() => result.current[1]())

        expect(result.current[0]).toBe(1)

        void act(() => result.current[1]())

        expect(result.current[0]).toBe(2)
    })
})

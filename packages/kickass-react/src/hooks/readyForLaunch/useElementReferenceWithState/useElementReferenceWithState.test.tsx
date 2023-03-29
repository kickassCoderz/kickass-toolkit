import { act, renderHook } from '@testing-library/react'

import { useElementReferenceWithState } from './useElementReferenceWithState'

describe('useElementReferenceWithState', () => {
    it('should return a tuple with a reference and a callbackRef', () => {
        const { result } = renderHook(useElementReferenceWithState)

        expect(Array.isArray(result.current)).toBe(true)

        expect(result.current[0]).toBeNull()

        expect(typeof result.current[1]).toBe('function')
    })

    it('should set reference on mount', () => {
        const { result } = renderHook(useElementReferenceWithState<HTMLButtonElement>)

        act(() => {
            result.current[1](document.createElement('button'))
        })

        expect(result.current[0]).toBeInstanceOf(HTMLButtonElement)
    })
})

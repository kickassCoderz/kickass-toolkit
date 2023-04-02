import { act, renderHook } from '@testing-library/react'

import { useToggle } from '.'

describe('useToggle', () => {
    it('should be defined', () => {
        expect(useToggle).toBeDefined()
    })

    it('should return a tuple of state and setter', () => {
        const { result } = renderHook(useToggle)

        expect(result.current).toHaveLength(2)

        expect(typeof result.current[0]).toBe('boolean')

        expect(typeof result.current[1]).toBe('function')
    })

    it('should render with provided initialState', () => {
        const { result } = renderHook(useToggle, { initialProps: true })

        expect(result.current[0]).toBe(true)
    })

    it('should render with provided initialState function', () => {
        const { result } = renderHook(useToggle, { initialProps: () => true })

        expect(result.current[0]).toBe(true)
    })

    it('should render with initialState set to false if the same is not provided', () => {
        const { result } = renderHook(useToggle)

        expect(result.current[0]).toBe(false)
    })

    it('should toggle state', () => {
        const { result } = renderHook(useToggle)

        expect(result.current[0]).toBe(false)

        act(() => result.current[1]())

        expect(result.current[0]).toBe(true)
    })

    it('should toggle state to provided value', () => {
        const { result } = renderHook(useToggle)

        expect(result.current[0]).toBe(false)

        act(() => result.current[1](true))

        expect(result.current[0]).toBe(true)
    })
})

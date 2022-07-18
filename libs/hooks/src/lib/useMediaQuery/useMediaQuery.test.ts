import { renderHook } from '@testing-library/react'

import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
    const initialMM = global.matchMedia
    const onChangeSpy = jest.fn()
    const offChangeSpy = jest.fn()

    beforeAll(() => {
        global.matchMedia = jest.fn(query => {
            return {
                matches: query.includes('max-width: 600px'),
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: onChangeSpy,
                removeEventListener: offChangeSpy,
                dispatchEvent: jest.fn()
            }
        })
    })

    beforeEach(() => {
        onChangeSpy.mockClear()
        offChangeSpy.mockClear()
    })

    afterAll(() => {
        global.matchMedia = initialMM
    })

    it('should be defined', () => {
        expect(useMediaQuery).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(onChangeSpy).toHaveBeenCalledTimes(1)
        expect(typeof result.current.matches).toBe('boolean')
    })

    it('should update value after hydration when using fallback value', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 500px)', true))

        // after effects run value is false because media does not match
        expect(result.current.matches).toBe(false)
    })

    it('should update value when document changes', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(result.current.matches).toBe(true)

        // TODO feat/use-media-query
        // expect(result.current.matches).toBe(false)
    })

    it('should cleanup change listener on component unmount', () => {
        const { unmount } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(onChangeSpy).toHaveBeenCalledTimes(1)

        unmount()

        expect(offChangeSpy).toHaveBeenCalledTimes(1)
    })

    it('should cleanup change listener on query change', () => {
        const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
            initialProps: {
                query: '(max-width: 600px)'
            }
        })

        expect(onChangeSpy).toHaveBeenCalledTimes(1)

        rerender({ query: '(max-width: 800px)' })

        expect(onChangeSpy).toHaveBeenCalledTimes(2)
        expect(offChangeSpy).toHaveBeenCalledTimes(1)
    })
})

import { renderHook } from '@testing-library/react'

import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
    const initialMM = global.matchMedia

    beforeAll(() => {
        global.matchMedia = jest.fn(query => {
            return {
                matches: query.includes('max-width: 600px'),
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }
        })
    })

    afterAll(() => {
        global.matchMedia = initialMM
    })

    it('should be defined', () => {
        expect(useMediaQuery).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(typeof result.current.matches).toBe('boolean')
    })

    it('should update value when document changes', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(result.current.matches).toBe(true)

        // TODO feat/use-media-query
        // expect(result.current.matches).toBe(false)
    })
})

import { renderHook } from '@testing-library/react'

import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
    it('should be defined', () => {
        expect(useMediaQuery).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useMediaQuery())

        expect(typeof result.current).toBe('boolean')
    })
})

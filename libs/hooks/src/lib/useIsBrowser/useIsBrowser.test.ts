import { renderHook } from '@testing-library/react'

import { useIsBrowser } from './useIsBrowser'

//@TODO: extend this test
describe('useIsBrowser', () => {
    it('should return "true" when global window is present (is browser)', () => {
        const { result } = renderHook(() => useIsBrowser())

        expect(result.current).toBe(true)
    })
})

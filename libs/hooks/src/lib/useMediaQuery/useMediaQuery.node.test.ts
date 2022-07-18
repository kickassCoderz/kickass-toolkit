/**
 * @jest-environment node
 */
// @NOTE @testing-library/react-hooks/server instead of @testing-library/react just because it does not support SSR hooks rendering
// github.com/testing-library/react-testing-library/issues/561#issuecomment-594032426
import { renderHook } from '@testing-library/react-hooks/server'

import { useMediaQuery } from './useMediaQuery'

describe('useMediaQuery', () => {
    it('should be defined', () => {
        expect(useMediaQuery).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'))

        expect(result.current.matches).toBe(false)
    })

    it('should render in SSR mode with fallback value', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 600px)', true))

        expect(result.current.matches).toBe(true)
    })
})

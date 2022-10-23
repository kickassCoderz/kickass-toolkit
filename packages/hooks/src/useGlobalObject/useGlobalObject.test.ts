import { renderHook } from '@testing-library/react-hooks'

import { useGlobalObject } from './useGlobalObject'

describe('useGlobalObject', () => {
    it('should be defined', () => {
        expect(useGlobalObject).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useGlobalObject())

        expect(result.current).toBe(window)
    })
})

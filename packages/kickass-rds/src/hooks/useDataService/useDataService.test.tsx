import { renderHook } from '@testing-library/react'

import { useDataService } from './useDataService'

describe('useDataService', () => {
    it('should be defined', () => {
        expect(useDataService).toBeDefined()
    })

    it('should throw if no context', () => {
        expect(() => {
            renderHook(() => useDataService())
        }).toThrow('useDataService must be used within DataServiceProvider')
    })
})

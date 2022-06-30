import { renderHook } from '@testing-library/react'
import { useState } from 'react'

import { usePreviousValue } from './usePreviousValue'

describe('usePreviousValue', () => {
    it('should be defined', () => {
        expect(usePreviousValue).toBeDefined()
    })

    it('should render', () => {
        const { result } = renderHook(() => useState(0))
        const { result: previousResult } = renderHook(({ value }) => usePreviousValue(value), {
            initialProps: {
                value: result.current[0]
            }
        })

        expect(previousResult.current).toBeUndefined()
    })
})

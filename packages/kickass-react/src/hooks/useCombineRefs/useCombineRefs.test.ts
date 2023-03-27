import { act, renderHook } from '@testing-library/react'
import { useRef } from 'react'

import { useCombineRefs as useCombineReferences } from './useCombineRefs'

describe('useCombineRefs', () => {
    it('should be defined', () => {
        expect(useCombineReferences).toBeDefined()
    })

    it('should render', () => {
        const {
            result: { current: reference1 }
        } = renderHook(() => useRef())
        const {
            result: { current: reference2 }
        } = renderHook(() => useRef())
        const { result } = renderHook(() => useCombineReferences(reference1, reference2))

        expect(result.current).toBeTruthy()
    })

    it('should pass ref objects to all the combined refs', () => {
        const { result: resultReference1 } = renderHook(() => useRef<HTMLDivElement>())
        const { result: resultReference2 } = renderHook(() => useRef<HTMLDivElement>())
        const { result } = renderHook(() => useCombineReferences(resultReference1.current, resultReference2.current))

        expect(result.current).toBeTruthy()

        const referencesSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(referencesSpy).toHaveBeenCalledTimes(1)
        expect(referencesSpy).toHaveBeenCalledWith(div)
        expect(resultReference1.current.current).toBe(div)
        expect(resultReference2.current.current).toBe(div)
    })

    it('should handle function based refs', () => {
        const referenceFunction1 = jest.fn()
        const referenceFunction2 = jest.fn()

        const { result } = renderHook(() => useCombineReferences(referenceFunction1, referenceFunction2))

        expect(result.current).toBeTruthy()

        const referencesSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(referencesSpy).toHaveBeenCalledTimes(1)
        expect(referencesSpy).toHaveBeenCalledWith(div)
        expect(referenceFunction1).toHaveBeenCalledTimes(1)
        expect(referenceFunction1).toHaveBeenCalledWith(div)
        expect(referenceFunction2).toHaveBeenCalledTimes(1)
        expect(referenceFunction2).toHaveBeenCalledWith(div)
    })

    it('should ignore falsy ref objects as they are invalid', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { result } = renderHook(() => useCombineReferences(undefined as any, null))

        expect(result.current).toBeTruthy()

        const referencesSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(referencesSpy).toHaveBeenCalledTimes(1)
        expect(referencesSpy).toHaveBeenCalledWith(div)
    })
})

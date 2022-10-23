import { act, renderHook } from '@testing-library/react-hooks'
import { useRef } from 'react'

import { useCombineRefs } from './useCombineRefs'

describe('useCombineRefs', () => {
    it('should be defined', () => {
        expect(useCombineRefs).toBeDefined()
    })

    it('should render', () => {
        const {
            result: { current: ref1 }
        } = renderHook(() => useRef())
        const {
            result: { current: ref2 }
        } = renderHook(() => useRef())
        const { result } = renderHook(() => useCombineRefs(ref1, ref2))

        expect(result.current).toBeTruthy()
    })

    it('should pass ref objects to all the combined refs', () => {
        const { result: resultRef1 } = renderHook(() => useRef<HTMLDivElement>())
        const { result: resultRef2 } = renderHook(() => useRef<HTMLDivElement>())
        const { result } = renderHook(() => useCombineRefs(resultRef1.current, resultRef2.current))

        expect(result.current).toBeTruthy()

        const refsSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(refsSpy).toHaveBeenCalledTimes(1)
        expect(refsSpy).toHaveBeenCalledWith(div)
        expect(resultRef1.current.current).toBe(div)
        expect(resultRef2.current.current).toBe(div)
    })

    it('should handle function based refs', () => {
        const refFunc1 = jest.fn()
        const refFunc2 = jest.fn()

        const { result } = renderHook(() => useCombineRefs(refFunc1, refFunc2))

        expect(result.current).toBeTruthy()

        const refsSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(refsSpy).toHaveBeenCalledTimes(1)
        expect(refsSpy).toHaveBeenCalledWith(div)
        expect(refFunc1).toHaveBeenCalledTimes(1)
        expect(refFunc1).toHaveBeenCalledWith(div)
        expect(refFunc2).toHaveBeenCalledTimes(1)
        expect(refFunc2).toHaveBeenCalledWith(div)
    })

    it('should ignore falsy ref objects as they are invalid', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { result } = renderHook(() => useCombineRefs(undefined as any, null))

        expect(result.current).toBeTruthy()

        const refsSpy = jest.spyOn(result, 'current')
        const div = document.createElement('div')

        act(() => {
            result.current(div)
        })

        expect(refsSpy).toHaveBeenCalledTimes(1)
        expect(refsSpy).toHaveBeenCalledWith(div)
    })
})

import { renderHook } from '@testing-library/react'

import { useEffectEvent } from './useEffectEvent'

describe('useEffectEvent', () => {
    it('should be defined', () => {
        expect(useEffectEvent).toBeDefined()
    })

    it('should return a stable function across rerenders', () => {
        const callbackSpy = jest.fn()

        const { result, rerender } = renderHook(() => useEffectEvent(callbackSpy))

        const effectCallback1 = result.current

        rerender()

        const effectCallback2 = result.current

        expect(effectCallback1).toBe(effectCallback2)
    })

    it('should update effectCallback when inner variables change', () => {
        const { result, rerender } = renderHook(
            initialProperties =>
                useEffectEvent((): number => {
                    return initialProperties.num1 + initialProperties.num2
                }),
            {
                initialProps: {
                    num1: 1,
                    num2: 2
                }
            }
        )

        const effectCallback1 = result.current

        expect(effectCallback1()).toBe(3)

        rerender({ num1: 2, num2: 2 })

        const effectCallback2 = result.current

        expect(effectCallback2()).toBe(4)

        expect(effectCallback1).toBe(effectCallback2)
    })

    it('should update effectCallback when callback changes', () => {
        const callbackSpy1 = jest.fn().mockImplementation(() => 1 + 1)
        const callbackSpy2 = jest.fn().mockImplementation(() => 'KickassCoderz')

        const { result, rerender } = renderHook(initialProperties => useEffectEvent(initialProperties), {
            initialProps: callbackSpy1
        })

        const effectCallback1 = result.current

        expect(effectCallback1()).toBe(2)

        rerender(callbackSpy2)

        const effectCallback2 = result.current

        expect(effectCallback1()).toBe('KickassCoderz')

        expect(effectCallback1).toBe(effectCallback2)
    })

    it('should call the callback when the effect event is called', () => {
        const callbackSpy = jest.fn()

        const { result } = renderHook(() => useEffectEvent(callbackSpy))

        const effectCallback = result.current

        effectCallback()

        expect(callbackSpy).toHaveBeenCalledTimes(1)
    })

    it("should call the callback with the effect event's arguments", () => {
        const callbackSpy = jest.fn()

        const { result } = renderHook(() => useEffectEvent(callbackSpy))

        const effectCallback = result.current

        effectCallback('foo', 'bar')

        expect(callbackSpy).toHaveBeenCalledWith('foo', 'bar')
    })
})

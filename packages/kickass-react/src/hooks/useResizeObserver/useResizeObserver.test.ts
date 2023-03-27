import { renderHook } from '@testing-library/react'
import { useRef } from 'react'

import { useResizeObserver } from './useResizeOberver'

describe('useResizeObserver', () => {
    const observeSpy = jest.fn()
    const unobserveSpy = jest.fn()
    const disconnectSpy = jest.fn()
    const onResizeCallbackSpy = jest.fn()
    const onResizeCallbackSpy1 = jest.fn()

    let ResizeObserverSpy: jest.Mock<ResizeObserver>

    const initialRO = global.ResizeObserver

    beforeAll(() => {
        ResizeObserverSpy = jest.fn(() => ({
            observe: observeSpy,
            unobserve: unobserveSpy,
            disconnect: disconnectSpy
        }))

        global.ResizeObserver = ResizeObserverSpy
    })

    beforeEach(() => {
        observeSpy.mockClear()
        unobserveSpy.mockClear()
        disconnectSpy.mockClear()
    })

    afterAll(() => {
        global.ResizeObserver = initialRO
    })

    it('should be defined', () => {
        expect(useResizeObserver).toBeDefined()
    })

    it('should render', () => {
        const div = document.createElement('div')

        const { result } = renderHook(() => useResizeObserver(div, onResizeCallbackSpy))

        expect(result.current).toBeUndefined()
    })

    it('should create ResizeObserver instance only on first hook render', () => {
        expect(ResizeObserverSpy).toHaveBeenCalledTimes(1)
        const div = document.createElement('div')

        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))
        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))

        expect(ResizeObserverSpy).toHaveBeenCalledTimes(1)
    })

    it('should subscribe in case ref first was empty but then gained element', () => {
        const div = document.createElement('div')
        const reference: React.MutableRefObject<Element | null> = { current: null }

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { rerender } = renderHook(({ ref }) => useResizeObserver(ref.current, onResizeCallbackSpy), {
            initialProps: { ref: reference }
        })

        expect(observeSpy).toHaveBeenCalledTimes(0)

        reference.current = div

        rerender({ ref: reference })

        expect(observeSpy).toHaveBeenCalledTimes(1)

        const entries = [
            {
                target: div,
                contentRect: {},
                borderBoxSize: {},
                contentBoxSize: {}
            } as unknown as ResizeObserverEntry
        ]
        const observerInstance = ResizeObserverSpy.mock.instances[0]

        ResizeObserverSpy.mock.calls[0][0](entries, observerInstance)

        expect(onResizeCallbackSpy).toHaveBeenCalledWith(entries, observerInstance)
    })

    it('should invoke each callback listening same element synchronusly', () => {
        const div = document.createElement('div')

        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))
        renderHook(() => useResizeObserver(div, onResizeCallbackSpy1))

        expect(observeSpy).toHaveBeenCalledTimes(2)

        const entries = [
            {
                target: div,
                contentRect: {},
                borderBoxSize: {},
                contentBoxSize: {}
            } as unknown as ResizeObserverEntry
        ]
        const observerInstance = ResizeObserverSpy.mock.instances[0]

        ResizeObserverSpy.mock.calls[0][0](entries, observerInstance)

        expect(onResizeCallbackSpy).toHaveBeenCalledWith(entries, observerInstance)

        expect(onResizeCallbackSpy1).toHaveBeenCalledWith(entries, observerInstance)
    })

    it('should call each callback listening different element', () => {
        const div = document.createElement('div')
        const div2 = document.createElement('div')

        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))
        renderHook(() => useResizeObserver(div2, onResizeCallbackSpy1))

        expect(observeSpy).toHaveBeenCalledTimes(2)

        const entries = [
            {
                target: div,
                contentRect: { test: 1 }, // to make sure entries are different
                borderBoxSize: {},
                contentBoxSize: {}
            } as unknown as ResizeObserverEntry,
            {
                target: div2,
                contentRect: { test: 2 }, // to make sure entries are different
                borderBoxSize: {},
                contentBoxSize: {}
            } as unknown as ResizeObserverEntry
        ]
        const observerInstance = ResizeObserverSpy.mock.instances[0]

        ResizeObserverSpy.mock.calls[0][0](entries, observerInstance)

        expect(onResizeCallbackSpy).toHaveBeenCalledWith([entries[0]], observerInstance)

        expect(onResizeCallbackSpy1).toHaveBeenCalledWith([entries[1]], observerInstance)
    })

    it('should unsubscribe on component unmount', () => {
        const div = document.createElement('div')

        const { unmount } = renderHook(() => useResizeObserver(div, onResizeCallbackSpy))

        expect(observeSpy).toHaveBeenCalledTimes(1)

        expect(observeSpy).toHaveBeenCalledWith(div)

        expect(unobserveSpy).toHaveBeenCalledTimes(0)

        unmount()

        expect(observeSpy).toHaveBeenCalledTimes(1)

        expect(unobserveSpy).toHaveBeenCalledTimes(1)

        expect(unobserveSpy).toHaveBeenCalledWith(div)
    })

    it('should accept React ref as a target', () => {
        expect(ResizeObserverSpy).toHaveBeenCalledTimes(1)
        const div = document.createElement('div')
        const { result: resultReference } = renderHook(() => useRef(div))

        renderHook(() => useResizeObserver(resultReference.current, onResizeCallbackSpy))

        expect(observeSpy).toHaveBeenCalledWith(div)
        expect(observeSpy).toHaveBeenCalledTimes(1)
        expect(ResizeObserverSpy).toHaveBeenCalledTimes(1)
    })
})

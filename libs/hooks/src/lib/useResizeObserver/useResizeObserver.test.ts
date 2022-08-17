import { renderHook } from '@testing-library/react'

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
        const ref: React.MutableRefObject<Element | null> = { current: null }

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { rerender } = renderHook(({ ref }) => useResizeObserver(ref.current, onResizeCallbackSpy), {
            initialProps: { ref }
        })

        expect(observeSpy).toHaveBeenCalledTimes(0)

        ref.current = div

        rerender({ ref })

        expect(observeSpy).toHaveBeenCalledTimes(1)

        const entry = {
            target: div,
            contentRect: {},
            borderBoxSize: {},
            contentBoxSize: {}
        } as unknown as ResizeObserverEntry

        ResizeObserverSpy.mock.calls[0][0]([entry])

        expect(onResizeCallbackSpy).toHaveBeenCalledWith(entry)
    })

    it('should invoke each callback listening same element synchronusly', () => {
        const div = document.createElement('div')

        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))
        renderHook(() => useResizeObserver(div, onResizeCallbackSpy1))

        expect(observeSpy).toHaveBeenCalledTimes(2)

        const entry = {
            target: div,
            contentRect: {},
            borderBoxSize: {},
            contentBoxSize: {}
        } as unknown as ResizeObserverEntry

        ResizeObserverSpy.mock.calls[0][0]([entry])

        expect(onResizeCallbackSpy).toHaveBeenCalledWith(entry)

        expect(onResizeCallbackSpy1).toHaveBeenCalledWith(entry)
    })

    it('should call each callback listening different element', () => {
        const div = document.createElement('div')
        const div2 = document.createElement('div')

        renderHook(() => useResizeObserver(div, onResizeCallbackSpy))
        renderHook(() => useResizeObserver(div2, onResizeCallbackSpy1))

        expect(observeSpy).toHaveBeenCalledTimes(2)

        const entry1 = {
            target: div,
            contentRect: {},
            borderBoxSize: {},
            contentBoxSize: {}
        } as unknown as ResizeObserverEntry

        const entry2 = {
            target: div2,
            contentRect: {},
            borderBoxSize: {},
            contentBoxSize: {}
        } as unknown as ResizeObserverEntry

        ResizeObserverSpy.mock.calls[0][0]([entry1, entry2])

        expect(onResizeCallbackSpy).toHaveBeenCalledWith(entry1)

        expect(onResizeCallbackSpy1).toHaveBeenCalledWith(entry2)
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
})

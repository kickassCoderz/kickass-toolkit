import { renderHook } from '@testing-library/react-hooks'

import { useEventListener } from './useEventListener'

describe('useEventListener', () => {
    it('should be defined', () => {
        expect(useEventListener).toBeDefined()
    })

    it('should render', () => {
        const div = document.createElement('div')
        const listener = jest.fn()
        const { result } = renderHook(() => useEventListener(div, 'click', listener))

        expect(result.current).toBeUndefined()
    })

    it('should bind listener on mount and unbind on unmount', () => {
        const div = document.createElement('div')
        const listener = jest.fn()
        const addSpy = jest.spyOn(div, 'addEventListener')
        const removeSpy = jest.spyOn(div, 'removeEventListener')

        const { rerender, unmount } = renderHook(() => useEventListener(div, 'resize', listener, { passive: true }))

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(removeSpy).toHaveBeenCalledTimes(0)

        rerender()

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(removeSpy).toHaveBeenCalledTimes(0)

        unmount()

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(removeSpy).toHaveBeenCalledTimes(1)
    })

    it('should work with react refs', () => {
        const div = document.createElement('div')
        const listener = jest.fn()
        const addSpy = jest.spyOn(div, 'addEventListener')
        const removeSpy = jest.spyOn(div, 'removeEventListener')

        const ref = { current: div }
        const { rerender, unmount } = renderHook(() =>
            useEventListener(ref.current, 'resize', listener, { passive: true })
        )

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(addSpy.mock.calls[0][2]).toStrictEqual({ passive: true })
        expect(removeSpy).toHaveBeenCalledTimes(0)

        rerender()

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(removeSpy).toHaveBeenCalledTimes(0)

        unmount()

        expect(addSpy).toHaveBeenCalledTimes(1)
        expect(removeSpy).toHaveBeenCalledTimes(1)
    })

    it('should invoke provided function on event trigger with proper context', () => {
        const div = document.createElement('div')
        let context: unknown
        const spy = jest.fn(function (this: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            context = this
        })

        renderHook(() => useEventListener(div, 'resize', spy, { passive: true }))

        const evt = new Event('resize')
        div.dispatchEvent(evt)

        expect(spy).toHaveBeenCalledWith(evt)
        expect(context).toBe(div)
    })

    it('should properly handle event listener objects', () => {
        const div = document.createElement('div')
        let context: unknown
        const spy = jest.fn(function (this: unknown) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            context = this
        })

        renderHook(() => useEventListener(div, 'resize', { handleEvent: spy }, { passive: true }))

        const evt = new Event('resize')
        div.dispatchEvent(evt)

        expect(spy).toHaveBeenCalledWith(evt)
        expect(context).toBe(div)
    })
})

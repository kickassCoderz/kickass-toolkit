import { useMemo, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

//@NOTE: useEvent updates the callback it's using after an "effective-time". So make sure to use it as a callback or in a useEffect which is placed after useEvent

type TCallbackFn = (...args: any[]) => any

interface EventCallbackHook {
    <F extends TCallbackFn>(callback?: F): (this: any, ...args: Parameters<F>) => ReturnType<F>
}

/**
 * A Hook to define an event handler with an always-stable function identity.
 *
 * Based on RFC https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 *
 * @template F
 * @param {F} [callback] function to use for event handler
 * @return {*} event handler
 */
const useEvent: EventCallbackHook = <F extends TCallbackFn>(callback?: F) => {
    const callbackRef = useRef(callback)

    useIsomorphicLayoutEffect(() => {
        callbackRef.current = callback
    })

    return useMemo(
        () =>
            function (this: any, ...args: Parameters<F>) {
                if (callbackRef.current) {
                    return Reflect.apply(callbackRef.current, this, args)
                }
            },
        []
    )
}

export { useEvent }

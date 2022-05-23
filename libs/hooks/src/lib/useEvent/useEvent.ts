import { useMemo, useRef } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

//@NOTE: useEventCallback updates the callback it's using after an "effective-time". So make sure to use it as a callback or in a useEffect which is placed after useEventCallback;

type TCallbackFn = (...args: any[]) => any

interface EventCallbackHook {
    <F extends TCallbackFn>(callback?: F): (...args: Parameters<F>) => ReturnType<F>
}

const useEvent: EventCallbackHook = <F extends TCallbackFn>(callback?: F) => {
    const callbackRef = useRef(callback)

    useIsomorphicLayoutEffect(() => {
        callbackRef.current = callback
    })

    return useMemo(
        () =>
            (...args: Parameters<F>) =>
                callbackRef.current?.(...args),
        []
    )
}

export { useEvent }

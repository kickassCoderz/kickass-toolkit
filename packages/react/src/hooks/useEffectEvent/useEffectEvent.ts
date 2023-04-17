import { useInsertionEffect, useMemo, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAnyFunction = (...arguments_: Array<any>) => any

export type TUseEffectEventReturnType<T extends TAnyFunction> = (
    this: ThisParameterType<T>,
    ...arguments_: Parameters<T>
) => ReturnType<T>

/**
 * A Hook to define an event handler with an always-stable function identity.
 * Meant to use with useEffect. Its serves as a temporary replacement for incomming `React.useEffectEvent`.
 * `useEffectEvent` updates the callback it's using after an "effective-time".
 *
 * @beta This hook is in beta and may change in the future.
 * @param effectEventCallback - The callback to be called when the event is triggered.
 * @returns A stable function that can be used in a `useEffect`.
 */
function useEffectEvent<T extends TAnyFunction>(effectEventCallback: T): TUseEffectEventReturnType<T> {
    const effectEventCallbackReference = useRef(effectEventCallback)

    useInsertionEffect(() => {
        effectEventCallbackReference.current = effectEventCallback
    }, [effectEventCallback])

    const effectEvent = useMemo(() => {
        return function (this: ThisParameterType<T>, ...arguments_: Parameters<T>): ReturnType<T> {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return Reflect.apply(effectEventCallbackReference.current, this, arguments_)
        }
    }, [])

    return effectEvent
}

export { useEffectEvent }

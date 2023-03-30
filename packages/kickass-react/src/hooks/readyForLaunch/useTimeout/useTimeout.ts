import { useEffect, useRef } from 'react'

import { useTimeoutPrimitive } from '../useTimeoutPrimitive/useTimeoutPrimitive'

type TUseTimeoutCallback = () => void

/**
 * A hook to execute a callback after a delay.
 * @beta This hook is in beta and may change in the future.
 * @param callback - A callback to be executed after a delay.
 * @param delay - A delay in milliseconds.
 * @returns A function to clear the timeout.
 */
function useTimeout(callback: TUseTimeoutCallback, delay: number) {
    const [execute, clear] = useTimeoutPrimitive()
    const callbackReference = useRef(callback)

    useEffect(() => {
        callbackReference.current = callback
    }, [callback])

    useEffect(() => {
        execute(() => callbackReference.current(), delay)

        return clear
    }, [execute, clear, delay])

    return clear
}

export { useTimeout }

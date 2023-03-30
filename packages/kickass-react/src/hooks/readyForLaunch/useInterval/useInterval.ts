import { useEffect, useRef } from 'react'

import { useTimeoutPrimitive } from '../useTimeoutPrimitive/useTimeoutPrimitive'

type TUseIntervalCallback = () => void

/**
 * Executes a callback function every x milliseconds.
 * Uses timeout internally.
 * @beta This function is in beta and may change in the future
 * @param callback - Callback function to be executed
 * @param delay - Delay in milliseconds
 * @returns Function to clear the interval
 */
function useInterval(callback: TUseIntervalCallback, delay: number) {
    const [execute, clear] = useTimeoutPrimitive()
    const callbackReference = useRef(callback)

    useEffect(() => {
        callbackReference.current = callback
    }, [callback])

    useEffect(() => {
        const tick = () => {
            execute(() => {
                callbackReference.current()
                tick()
            }, delay)
        }

        tick()

        return clear
    }, [execute, clear, delay])

    return clear
}

export { useInterval }

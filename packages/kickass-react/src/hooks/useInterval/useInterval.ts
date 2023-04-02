import { useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { useTimeoutPrimitive } from '../useTimeoutPrimitive/useTimeoutPrimitive'

export type TUseIntervalCallback = () => void

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
    const effectEventCallback = useEffectEvent(callback)

    useEffect(() => {
        const tick = () => {
            execute(() => {
                effectEventCallback()
                tick()
            }, delay)
        }

        tick()

        return clear
    }, [execute, clear, delay, effectEventCallback])

    return clear
}

export { useInterval }

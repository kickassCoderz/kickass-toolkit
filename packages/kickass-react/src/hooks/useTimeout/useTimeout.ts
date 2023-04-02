import { useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { useTimeoutPrimitive } from '../useTimeoutPrimitive/useTimeoutPrimitive'

export type TUseTimeoutCallback = () => void

/**
 * A hook to execute a callback after a delay.
 * @beta This hook is in beta and may change in the future.
 * @param callback - A callback to be executed after a delay.
 * @param delay - A delay in milliseconds.
 * @returns A function to clear the timeout.
 */
function useTimeout(callback: TUseTimeoutCallback, delay: number) {
    const [execute, clear] = useTimeoutPrimitive()
    const effectEvent = useEffectEvent(callback)

    useEffect(() => {
        execute(() => {
            effectEvent()
        }, delay)

        return clear
    }, [execute, clear, delay, effectEvent])

    return clear
}

export { useTimeout }

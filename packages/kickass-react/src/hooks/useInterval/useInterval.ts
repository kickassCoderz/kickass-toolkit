import { useEffect, useRef } from 'react'

import { useEvent } from '../useEvent'

export type TOnClearIntervalFn = () => void

/**
 * Drop in hook replacement for setInterval. It automatically clears any running interval on unmount.
 *
 *
 * @param callbackFn callback to call on interval
 * @param ms interval in milliseconds
 * @param args arguments to pass to callback
 * @returns a function to clear interval
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInterval = <TArgs extends any[]>(
    callbackFn: (...args: TArgs) => void,
    ms: number,
    ...args: TArgs
): TOnClearIntervalFn => {
    const intervalRef = useRef<ReturnType<typeof setInterval>>()

    const onInterval = useEvent(() => {
        callbackFn(...args)
    })

    const onClearInterval = useEvent(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)

            intervalRef.current = undefined
        }
    })

    useEffect(() => {
        intervalRef.current = setInterval(onInterval, ms)

        return onClearInterval
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])

    return onClearInterval
}

export { useInterval }

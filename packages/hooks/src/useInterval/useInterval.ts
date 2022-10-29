import { useEffect, useRef } from 'react'

import { useEvent } from '../useEvent'

type ClearIntervalFn = () => void

/**
 * Drop in hook replacement for setInterval
 *
 * @template TArgs
 * @param {(...args: TArgs) => void} callback callback to call on interval
 * @param {number} ms interval in milliseconds
 * @param {...TArgs} args arguments to pass to callback
 * @return {*}  {ClearIntervalFn} function to call to clear the interval
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInterval = <TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    ms: number,
    ...args: TArgs
): ClearIntervalFn => {
    const intervalRef = useRef<ReturnType<typeof setInterval>>()

    const onInterval = useEvent(() => {
        callback(...args)
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

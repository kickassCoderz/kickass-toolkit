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
const useInterval = <TArguments extends any[]>(
    callbackFunction: (...arguments_: TArguments) => void,
    ms: number,
    ...arguments_: TArguments
): TOnClearIntervalFn => {
    const intervalReference = useRef<ReturnType<typeof setInterval>>()

    const onInterval = useEvent(() => {
        callbackFunction(...arguments_)
    })

    const onClearInterval = useEvent(() => {
        if (intervalReference.current) {
            clearInterval(intervalReference.current)

            intervalReference.current = undefined
        }
    })

    useEffect(() => {
        intervalReference.current = setInterval(onInterval, ms)

        return onClearInterval
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])

    return onClearInterval
}

export { useInterval }

import { useEffect, useRef } from 'react'

import { useEvent } from '../useEvent'

export type TOnClearTimeout = () => void

/**
 * Drop in hook replacement for setTimeout. It automatically clears any running timeout on unmount.
 *
 * @param callbackFn callback to call on timeout
 * @param ms timeout in milliseconds
 * @param args arguments to pass to callback
 * @returns A function to clear timeout
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTimeout = <TArguments extends any[]>(
    callbackFunction: (...arguments_: TArguments) => void,
    ms: number,
    ...arguments_: TArguments
): TOnClearTimeout => {
    const timeoutReference = useRef<ReturnType<typeof setTimeout>>()

    const onTimeout = useEvent(() => {
        callbackFunction(...arguments_)
    })

    const onClearTimeout = useEvent(() => {
        if (timeoutReference.current) {
            clearTimeout(timeoutReference.current)

            timeoutReference.current = undefined
        }
    })

    useEffect(() => {
        timeoutReference.current = setTimeout(onTimeout, ms)

        return onClearTimeout
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])

    return onClearTimeout
}

export { useTimeout }

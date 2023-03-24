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
const useTimeout = <TArgs extends any[]>(
    callbackFn: (...args: TArgs) => void,
    ms: number,
    ...args: TArgs
): TOnClearTimeout => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const onTimeout = useEvent(() => {
        callbackFn(...args)
    })

    const onClearTimeout = useEvent(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)

            timeoutRef.current = undefined
        }
    })

    useEffect(() => {
        timeoutRef.current = setTimeout(onTimeout, ms)

        return onClearTimeout
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])

    return onClearTimeout
}

export { useTimeout }

import { useEffect, useRef } from 'react'

import { useEvent } from '../useEvent'

type ClearTimeoutFn = () => void

/**
 * Drop in hook replacement for setTimeout
 *
 * @template TArgs
 * @param {(...args: TArgs) => void} callback callback to call on timeout
 * @param {number} ms timeout in milliseconds
 * @param {...TArgs} args arguments to pass to callback
 * @return {*}  {ClearTimeoutFn}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTimeout = <TArgs extends any[]>(
    callback: (...args: TArgs) => void,
    ms: number,
    ...args: TArgs
): ClearTimeoutFn => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const onTimeout = useEvent(() => {
        callback(...args)
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

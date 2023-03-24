import { useEffect } from 'react'

import { useEvent } from '../useEvent'

/**
 * Same as useEffect but runs only once before component unmounts.
 * @param callbackFn A function which will be called on unmount
 * @example Log hello world on unmount
 * ```
 * // Prints hello world on unmount
 * useUnmountEffect(()=> console.log("hello world"))
 * ```
 *
 */
const useUnmountEffect = (callbackFunction: CallableFunction): void => {
    const callback = useEvent(() => callbackFunction())

    useEffect(
        () => {
            return () => {
                callback()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}

export { useUnmountEffect }

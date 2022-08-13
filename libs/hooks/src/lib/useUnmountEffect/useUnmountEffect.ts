import { useEffect } from 'react'

import { useEvent } from '../useEvent'

/**
 * Same as useEffect but runs only once before component unmounts,
 *
 * @param {CallableFunction} callbackFn
 */
const useUnmountEffect = (callbackFn: CallableFunction): void => {
    const callback = useEvent(() => callbackFn())

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

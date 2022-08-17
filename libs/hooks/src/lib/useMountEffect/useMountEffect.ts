import { useEffect } from 'react'

/**
 * Same as useEffect but runs only once on component mount,
 *
 * @param {CallableFunction} callbackFn
 */
const useMountEffect = (callbackFn: CallableFunction) => {
    useEffect(() => {
        callbackFn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { useMountEffect }

import { useEffect } from 'react'

/**
 * Same as useEffect but runs only once on component mount,
 *
 * @param callbackFn a function which will be invoked on component mount
 */
const useMountEffect = (callbackFn: CallableFunction) => {
    useEffect(() => {
        callbackFn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { useMountEffect }

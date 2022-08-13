import { useEffect, useRef } from 'react'

/**
 * Same as useEffect but runs only once on component mount,
 *
 * @param {CallableFunction} callbackFn
 */
const useMountEffect = (callbackFn: CallableFunction) => {
    const mountedRef = useRef(false)

    useEffect(() => {
        // to avoid re-renders in concurrent mode
        if (mountedRef.current) {
            return
        }

        mountedRef.current = true

        callbackFn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { useMountEffect }

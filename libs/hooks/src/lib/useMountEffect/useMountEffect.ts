import { useEffect } from 'react'

const useMountEffect = (callbackFn: CallableFunction) => {
    useEffect(() => {
        callbackFn()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { useMountEffect }

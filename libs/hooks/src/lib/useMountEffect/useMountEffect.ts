import { useEffect } from 'react'

const useMountEffect = (callback: CallableFunction) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { useMountEffect }

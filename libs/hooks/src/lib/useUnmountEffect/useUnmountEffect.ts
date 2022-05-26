import { useEffect } from 'react'

const useUnmountEffect = (callback: CallableFunction): void => {
    useEffect(
        () => () => {
            callback()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}

export { useUnmountEffect }

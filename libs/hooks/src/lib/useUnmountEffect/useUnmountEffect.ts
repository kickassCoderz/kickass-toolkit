import { useEffect } from 'react'

import { useEvent } from '../useEvent'

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

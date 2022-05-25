import { useEffect } from 'react'

import { useEvent } from '../useEvent'

const useUnmountEffect = (effect: CallableFunction): void => {
    const callable = useEvent(() => effect())

    useEffect(
        () => () => {
            callable()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )
}

export { useUnmountEffect }

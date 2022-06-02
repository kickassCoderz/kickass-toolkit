import { useEffect } from 'react'

import { useEvent } from '../useEvent'

const useInterval = (callback: () => void, delay: number) => {
    const onInterval = useEvent(callback)

    useEffect(() => {
        const interval = setInterval(onInterval, delay)

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay])
}

export { useInterval }

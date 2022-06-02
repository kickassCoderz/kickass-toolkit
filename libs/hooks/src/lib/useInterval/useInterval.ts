import { useEffect } from 'react'

import { useEvent } from '../useEvent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInterval = <TArgs extends any[]>(callback: (...args: TArgs) => void, delay: number, ...args: TArgs) => {
    const onInterval = useEvent(() => {
        callback(...args)
    })

    useEffect(() => {
        const interval = setInterval(onInterval, delay)

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delay])
}

export { useInterval }

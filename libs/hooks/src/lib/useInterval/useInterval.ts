import { useEffect } from 'react'

import { useEvent } from '../useEvent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Drop in hook replacement for setInterval
 *
 * @template TArgs
 * @param {(...args: TArgs) => void} callback
 * @param {number} ms
 * @param {...TArgs} args
 */
const useInterval = <TArgs extends any[]>(callback: (...args: TArgs) => void, ms: number, ...args: TArgs) => {
    const onInterval = useEvent(() => {
        callback(...args)
    })

    useEffect(() => {
        const interval = setInterval(onInterval, ms)

        return () => {
            clearInterval(interval)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])
}

export { useInterval }

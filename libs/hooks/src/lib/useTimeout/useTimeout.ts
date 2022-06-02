import { useEffect } from 'react'

import { useEvent } from '../useEvent'

/**
 * Drop in hook replacement for setTimeout
 *
 * @template TArgs
 * @param {(...args: TArgs) => void} callback
 * @param {number} ms
 * @param {...TArgs} args
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTimeout = <TArgs extends any[]>(callback: (...args: TArgs) => void, ms: number, ...args: TArgs) => {
    const onTimeout = useEvent(() => {
        callback(...args)
    })

    useEffect(() => {
        const timeout = setTimeout(onTimeout, ms)

        return () => {
            clearTimeout(timeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ms])
}

export { useTimeout }

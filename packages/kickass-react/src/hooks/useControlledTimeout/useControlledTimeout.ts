import { useCallback, useEffect, useRef } from 'react'

export type TUseControlledTimeoutExecuteFunction = <T extends Array<unknown>>(
    callback: (...arguments_: T) => void,
    ms: number,
    ...arguments_: T
) => void

export type TUseControlledTimeoutClearFunction = () => void

/**
 * A controlled version of `setTimeout`.
 * `execute` function behaves similary as `setTimeout`. It takes a callback, a timeout in milliseconds and optional arguments to pass to the callback.
 * `clear` function clears the timer.
 * Timer is cleared on unmount.
 * @beta This is work in progress and may change in the future.
 * @returns A tuple of `execute` and `clear` functions.
 * @example
 * Call `console.log` after 1 second:
 * ```tsx
 * const [execute] = useControlledTimeout()
 *
 * execute(() => console.log('Kickass Coderz'), 1000)
 * ```
 * @example
 * Call `console.log` after 1 second with arguments:
 * ```tsx
 * const [execute] = useControlledTimeout()
 *
 * execute((a, b) => console.log(a, b), 1000, 'Kickass', 'Coderz')
 * ```
 * @example
 * Execute timer, clear it and execute it again:
 * ```tsx
 * const [execute, clear] = useControlledTimeout()
 *
 * execute(() => console.log('Kickass Coderz'), 1000)
 *
 * clear()
 *
 * execute(() => console.log('Kickass Coderz'), 1000)
 * ```
 */
function useControlledTimeout() {
    const timeoutReference = useRef<ReturnType<typeof setTimeout>>()

    const clear = useCallback<TUseControlledTimeoutClearFunction>(() => {
        if (timeoutReference.current) {
            clearTimeout(timeoutReference.current)

            timeoutReference.current = undefined
        }
    }, [])

    const execute = useCallback<TUseControlledTimeoutExecuteFunction>((callback, ms, ...arguments_) => {
        timeoutReference.current = setTimeout(callback, ms, ...arguments_)
    }, [])

    useEffect(() => {
        return () => {
            clear()
        }
    }, [clear])

    return [execute, clear] as const
}

export { useControlledTimeout }

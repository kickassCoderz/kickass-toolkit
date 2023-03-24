import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useUnmountEffect } from '../useUnmountEffect'

/**
 * Returns a function that can be used to debounce events, callbacks and function calls
 * for specific delay.
 * @remarks
 * It will clear timeout on unmount.
 * Debouncing will truncate a series of sequential calls to a function into a single call to that function.
 * For example it ensures that one notification is made for an event that fires multiple times.
 *
 *
 * @param delay debounce delay
 * @returns a tuple which consists of execute and clear functions
 */
const useDebounce = (delay: number) => {
    const timeoutReference = useRef<ReturnType<typeof setTimeout>>()

    const clear = useCallback(() => {
        if (timeoutReference.current) {
            clearTimeout(timeoutReference.current)
            timeoutReference.current = undefined
        }
    }, [])

    useUnmountEffect(clear)

    const execute = useEvent((callback: () => void) => {
        clear()
        timeoutReference.current = setTimeout(callback, delay)
    })

    return [execute, clear] as const
}

export { useDebounce }

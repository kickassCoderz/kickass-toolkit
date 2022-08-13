import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useUnmountEffect } from '../useUnmountEffect'

/**
 * Returns a function that can be used to debounce events, callbacks and function calls
 * for specific delay.
 *
 * Debouncing will bunch a series of sequential calls to a function into a single call to that function.
 * For example it ensures that one notification is made for an event that fires multiple times.
 *
 * @param {number} delay debounce delay
 * @return {*}
 */
const useDebounce = (delay: number) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const clear = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }
    }, [])

    useUnmountEffect(clear)

    const execute = useEvent((callback: () => void) => {
        clear()
        timeoutRef.current = setTimeout(callback, delay)
    })

    return [execute, clear] as const
}

export { useDebounce }

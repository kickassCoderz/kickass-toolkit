import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useUnmountEffect } from '../useUnmountEffect'

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

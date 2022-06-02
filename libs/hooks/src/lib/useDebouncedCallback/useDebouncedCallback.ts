import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useUnmountEffect } from '../useUnmountEffect'

type TCallbackFn = (...args: any[]) => any

const useDebouncedCallback = <F extends TCallbackFn>(callback: F, delay: number) => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const clear = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = undefined
        }
    }, [])

    useUnmountEffect(clear)

    const execute = useEvent(function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        clear()

        timeoutRef.current = setTimeout(() => Reflect.apply(callback, this, args), delay)
    })

    return [execute, clear] as const
}

export { useDebouncedCallback }

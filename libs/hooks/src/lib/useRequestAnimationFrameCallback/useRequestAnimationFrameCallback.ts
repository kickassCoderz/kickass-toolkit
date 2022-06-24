import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useIsBrowser } from '../useIsBrowser'
import { useUnmountEffect } from '../useUnmountEffect'

type TCallbackFn = (...args: any[]) => any

const useRequestAnimationFrameCallback = <F extends TCallbackFn>(callback: F) => {
    const isBrowser = useIsBrowser()
    const animationFrameRef = useRef<ReturnType<typeof requestAnimationFrame>>()

    const clear = useCallback(() => {
        if (isBrowser && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
            animationFrameRef.current = undefined
        }
    }, [isBrowser])

    useUnmountEffect(clear)

    const execute = useEvent(function (this: ThisParameterType<F>, ...args: Parameters<F>) {
        if (isBrowser) {
            clear()

            animationFrameRef.current = requestAnimationFrame(() => Reflect.apply(callback, this, args))
        }
    })

    return [execute, clear] as const
}

export { useRequestAnimationFrameCallback }

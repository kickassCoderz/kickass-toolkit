import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useIsBrowser } from '../useIsBrowser'
import { useUnmountEffect } from '../useUnmountEffect'

/**
 * useRequestAnimationFrame is drop in replacement for requestAnimationFrame as a React hook.
 *
 * @returns a tuple of execute and clear functions
 */
const useRequestAnimationFrame = () => {
    const isBrowser = useIsBrowser()
    const animationFrameRef = useRef<ReturnType<typeof requestAnimationFrame>>()

    const clear = useCallback(() => {
        if (isBrowser && animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)

            animationFrameRef.current = undefined
        }
    }, [isBrowser])

    useUnmountEffect(clear)

    const execute = useEvent((callbackFn: FrameRequestCallback) => {
        if (isBrowser) {
            clear()

            animationFrameRef.current = requestAnimationFrame(callbackFn)
        }
    })

    return [execute, clear] as const
}

export { useRequestAnimationFrame }

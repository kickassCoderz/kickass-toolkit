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
    const animationFrameReference = useRef<ReturnType<typeof requestAnimationFrame>>()

    const clear = useCallback(() => {
        if (isBrowser && animationFrameReference.current) {
            cancelAnimationFrame(animationFrameReference.current)

            animationFrameReference.current = undefined
        }
    }, [isBrowser])

    useUnmountEffect(clear)

    const execute = useEvent((callbackFunction: FrameRequestCallback) => {
        if (isBrowser) {
            clear()

            animationFrameReference.current = requestAnimationFrame(callbackFunction)
        }
    })

    return [execute, clear] as const
}

export { useRequestAnimationFrame }

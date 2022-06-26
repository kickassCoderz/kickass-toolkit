import { useCallback, useRef } from 'react'

import { useEvent } from '../useEvent'
import { useIsBrowser } from '../useIsBrowser'
import { useUnmountEffect } from '../useUnmountEffect'

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

    const execute = useEvent((callback: FrameRequestCallback) => {
        if (isBrowser) {
            clear()

            animationFrameRef.current = requestAnimationFrame(callback)
        }
    })

    return [execute, clear] as const
}

export { useRequestAnimationFrame }

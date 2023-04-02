import { useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { useRequestAnimationFramePrimitive } from '../useRequestAnimationFramePrimitive/useRequestAnimationFramePrimitive'

/**
 * A RAF hook which allows you to pass a callback and a boolean to control the RAF loop.
 * @beta this hook is in beta and may change in the future.
 * @param frameRequestCallback - The callback to be executed on each RAF loop.
 * @param isActive - A boolean to control the RAF loop.
 */
function useRequestAnimationFrame(frameRequestCallback: FrameRequestCallback, isActive: boolean) {
    const { clear, loop } = useRequestAnimationFramePrimitive()
    const effectEvent = useEffectEvent(frameRequestCallback)

    useEffect(() => {
        if (isActive) {
            loop(effectEvent)
        }

        return clear()
    }, [isActive, loop, clear, effectEvent])
}

export { useRequestAnimationFrame }

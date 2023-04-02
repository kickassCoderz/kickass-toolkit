import { useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { useRequestAnimationFramePrimitive } from '../useRequestAnimationFramePrimitive/useRequestAnimationFramePrimitive'

function getFps(requestFps: (fps: number) => void, refreshRate = 10): FrameRequestCallback {
    let ticks = 0
    let last = 0

    return timestamp => {
        ticks += 1

        if (ticks >= refreshRate) {
            const diff = timestamp - last
            const fps = Math.round(1000 / (diff / ticks))
            requestFps(fps)
            last = timestamp
            ticks = 0
        }
    }
}

/**
 * Hook that calculates the fps and calls a callback with the fps.
 * @beta this hook is still in development and may change in the future
 * @param fpsCallback - callback that will be called with the fps
 * @param isActive - whether the hook is active
 * @param refreshRate - how often the fps should be calculated
 */
function useGetFps(fpsCallback: (fps: number) => void, isActive: boolean, refreshRate = 10) {
    const { clear, loop } = useRequestAnimationFramePrimitive()
    const effectEvent = useEffectEvent(fpsCallback)

    useEffect(() => {
        if (isActive) {
            loop(getFps(effectEvent, refreshRate))
        }
        return clear
    }, [effectEvent, loop, clear, isActive, refreshRate])
}

export { getFps, useGetFps }

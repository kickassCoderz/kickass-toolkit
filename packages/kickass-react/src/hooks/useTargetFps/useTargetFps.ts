import { useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { useRequestAnimationFramePrimitive } from '../useRequestAnimationFramePrimitive/useRequestAnimationFramePrimitive'

function targetFps(callback: FrameRequestCallback, fps: number): FrameRequestCallback {
    const time = {
        interval: Math.floor(1000 / fps),
        elapsed: 0,
        lastRun: 0,
        missedBy: 0
    }

    return timestamp => {
        time.elapsed = timestamp - time.lastRun
        if (Math.ceil(time.elapsed + time.missedBy) >= time.interval) {
            time.lastRun = timestamp
            time.missedBy = Math.max(time.elapsed - time.interval, 0)
            callback(timestamp)
        }
    }
}

/**
 * Exactly as useRequestAnimationFrame, but with a target FPS.
 * @beta this hook is still in development and may change in the future.
 * @param frameRequestCallback - The callback to be executed on each RAF loop.
 * @param isActive - A boolean to control the RAF loop.
 * @param fps - The target FPS.
 */
function useTargetFps(frameRequestCallback: FrameRequestCallback, isActive: boolean, fps = 60) {
    const { clear, loop } = useRequestAnimationFramePrimitive()
    const effectEvent = useEffectEvent(frameRequestCallback)

    useEffect(() => {
        if (isActive) {
            loop(targetFps(effectEvent, fps))
        }

        return clear
    }, [loop, clear, effectEvent, isActive, fps])
}

export { targetFps, useTargetFps }

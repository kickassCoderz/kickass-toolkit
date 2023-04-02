import { useCallback, useRef } from 'react'

/**
 * A primitive hook that provides a `requestAnimationFrame` utilities.
 * @beta this hook is experimental and may change in the future.
 * @returns an object with `execute`, `clear` and `loop` functions.
 */
function useRequestAnimationFramePrimitive() {
    const requestAnimationFrameReference = useRef<number>(0)

    const execute = useCallback((frameRequestFallback: FrameRequestCallback) => {
        requestAnimationFrameReference.current = requestAnimationFrame(frameRequestFallback)
    }, [])

    const clear = useCallback(() => {
        cancelAnimationFrame(requestAnimationFrameReference.current)
    }, [])

    const loop = useCallback(
        (frameRequestCallback: FrameRequestCallback) => {
            const loopCallback: FrameRequestCallback = time => {
                execute(loopCallback)
                frameRequestCallback(time)
            }

            execute(loopCallback)
        },
        [execute]
    )

    return { execute, clear, loop } as const
}

export { useRequestAnimationFramePrimitive }

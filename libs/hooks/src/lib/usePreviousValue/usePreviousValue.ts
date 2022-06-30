import { useEffect, useRef } from 'react'

/**
 * Hook that returns the previous value of the given value.
 *
 * Previous value is the value before the current render.
 *
 * Hook is always undefined on the first render.
 *
 * @template T
 * @param {T} value
 * @return {*}  {(T | undefined)}
 */
const usePreviousValue = <T>(value: T): T | undefined => {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

export { usePreviousValue }

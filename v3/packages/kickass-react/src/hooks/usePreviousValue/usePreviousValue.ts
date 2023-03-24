import { useEffect, useRef } from 'react'

/**
 * Hook that returns the previous value of the given value.
 *
 * Previous value is the value during previous render.
 *
 * Hook return value is always undefined on the first render.
 *
 *
 * @param value current value
 * @returns previous value
 */
const usePreviousValue = <T>(value: T): T | undefined => {
    const ref = useRef<T>()

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

export { usePreviousValue }

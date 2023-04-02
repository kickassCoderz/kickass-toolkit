import { useEffect } from 'react'

import { usePreviousValueState } from '../usePreviousValueState'

/**
 * A hook that returns the previous value of a given tracked value.
 * @beta This is work in progress and may change in the future.
 * @param valueToTrack - The value to track, and return it's previous value.
 * @param shouldUpdate - An optional function that determines if the value should be updated. It is called with the previous value and the next value.
 * @returns The previous value. Value is always undefined on the first render.
 */
function usePreviousValue<T>(
    valueToTrack: T,
    shouldUpdate?: (previousValue: T | undefined, nextValue: T) => boolean
): T | undefined {
    const { previousValue, setValue } = usePreviousValueState(
        {
            currentValue: valueToTrack
        },
        shouldUpdate
    )

    useEffect(() => {
        setValue(valueToTrack)
    }, [setValue, valueToTrack])

    return previousValue
}

export { usePreviousValue }

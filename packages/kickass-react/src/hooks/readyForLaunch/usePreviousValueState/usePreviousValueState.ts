import { useCallback, useEffect, useState } from 'react'

function defaultShouldUpdate<T>(previousValue: T, nextValue: T): boolean {
    return previousValue !== nextValue
}

/**
 * A enhanced version of `useState` that also keeps track of the previous value.
 * @beta This is work in progress and may change in the future.
 * @param initialState - An object with the initial value of the state, and optional initial value for previous state. It can also be function which returns same object. If the initial value for previous state is not provided, it will be set to `undefined`.
 * @param shouldUpdate - An optional function that determines if the value should be updated. It is called with the previous value and the next value.
 * @returns An object with the current value, the previous value, and a function to set the value.
 */
function usePreviousValueState<T>(
    initialState: { currentValue: T; previousValue: T } | (() => { currentValue: T; previousValue: T }),
    shouldUpdate?: (previousValue: T, nextValue: T) => boolean
): { readonly currentValue: T; readonly previousValue: T; readonly setValue: (value: T) => void }

function usePreviousValueState<T>(
    initialState: { currentValue: T } | (() => { currentValue: T }),
    shouldUpdate?: (previousValue: T | undefined, nextValue: T) => boolean
): { readonly currentValue: T; readonly previousValue: T | undefined; readonly setValue: (value: T) => void }

function usePreviousValueState<T>(
    initialState: { currentValue: T; previousValue?: T } | (() => { currentValue: T; previousValue?: T }),
    shouldUpdate: (previousValue: T | undefined, nextValue: T) => boolean = defaultShouldUpdate
): { readonly currentValue: T; readonly previousValue: T | undefined; readonly setValue: (value: T) => void } {
    const [state, setState] = useState(initialState)

    const setValue = useCallback(
        (value: T) => {
            setState(previousState => {
                if (shouldUpdate(previousState.currentValue, value)) {
                    return {
                        previousValue: previousState.currentValue,
                        currentValue: value
                    }
                }

                return previousState
            })
        },
        [shouldUpdate]
    )

    useEffect(() => {
        console.log(state)
    }, [state])

    return { setValue, previousValue: state.previousValue, currentValue: state.currentValue }
}

export { defaultShouldUpdate, usePreviousValueState }

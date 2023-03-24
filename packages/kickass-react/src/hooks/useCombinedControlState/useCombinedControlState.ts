import { useEffect, useRef, useState } from 'react'

import { useEvent } from '../useEvent'

// @NOTE: this is here until this is fixed https://github.com/microsoft/TypeScript/issues/37663
declare type AnyFunction = (...arguments_: unknown[]) => unknown

function isFunction<T extends AnyFunction>(value: unknown): value is T {
    return typeof value === 'function'
}

export type TSetCombinedStateNextStateOrSetter<T> = ((previousState: T) => T) | T

export type TUseUncontrolledStateParams<T> = {
    initialState: T | (() => T)
    handlerFn?: (state: T) => void
}

export type TUseCombinedControlStateParams<T> = TUseUncontrolledStateParams<T> & {
    state?: T
}

const useUncontrolledState = <T>({ initialState, handlerFn }: TUseUncontrolledStateParams<T>) => {
    const uncontrolledState = useState(initialState)
    const [uncontrolledStateValue] = uncontrolledState
    const previousUncontroledValueReference = useRef(uncontrolledStateValue)
    const handleChange = useEvent(handlerFn)

    useEffect(() => {
        if (previousUncontroledValueReference.current !== uncontrolledStateValue) {
            handleChange(uncontrolledStateValue)
            previousUncontroledValueReference.current = uncontrolledStateValue
        }
    }, [uncontrolledStateValue, handleChange])

    return uncontrolledState
}

const useCombinedControlState = <T>({ state, initialState, handlerFn }: TUseCombinedControlStateParams<T>) => {
    const [uncontrolledState, setUncontrolledState] = useUncontrolledState({ initialState, handlerFn })
    const isControlled = state !== undefined && handlerFn !== undefined
    const combinedState = isControlled ? state : uncontrolledState

    const setCombinedState = useEvent((nextStateOrSetter: TSetCombinedStateNextStateOrSetter<T>) => {
        if (isControlled) {
            const nextState = isFunction(nextStateOrSetter) ? nextStateOrSetter(combinedState) : nextStateOrSetter

            if (nextState !== combinedState) {
                handlerFn(nextState as T)
            }
        } else {
            setUncontrolledState(nextStateOrSetter)
        }
    })

    return [combinedState, setCombinedState] as const
}

export { useCombinedControlState }

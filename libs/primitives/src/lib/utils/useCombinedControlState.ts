import { useEffect, useRef, useState } from 'react'

import { useEvent } from './useEvent'

type TUseCombinedControlParams<T> = {
    state?: T
    defaultState: T | (() => T)
    handler?: (state: T) => void
}

type TUseUncontrolledStateParams<T> = Omit<TUseCombinedControlParams<T>, 'value'>

const useUncontrolledState = <T>({ defaultState, handler }: TUseUncontrolledStateParams<T>) => {
    const uncontrolledState = useState<T>(defaultState)
    const [uncontrolledStateValue] = uncontrolledState
    const prevUncontroledValueRef = useRef(uncontrolledStateValue)
    const handleChange = useEvent(handler)

    useEffect(() => {
        if (prevUncontroledValueRef.current !== uncontrolledStateValue) {
            handleChange(uncontrolledStateValue as T)
            prevUncontroledValueRef.current = uncontrolledStateValue
        }
    }, [uncontrolledStateValue, handleChange])

    return uncontrolledState
}

type TSetStateFn<T> = (prevState?: T) => T

const useCombinedControlState = <T>({ state, defaultState, handler }: TUseCombinedControlParams<T>) => {
    const [uncontrolledState, setUncontrolledState] = useUncontrolledState({ defaultState, handler })
    const isControlled = state !== undefined && handler !== undefined
    const combinedState = isControlled ? state : uncontrolledState

    const setCombinedState = useEvent((nextStateOrSetter: T | TSetStateFn<T>) => {
        if (isControlled) {
            const setter = nextStateOrSetter as TSetStateFn<T>
            const nextState = typeof nextStateOrSetter === 'function' ? setter(combinedState) : nextStateOrSetter

            if (nextState !== combinedState) {
                handler(nextState as T)
            }
        } else {
            setUncontrolledState(nextStateOrSetter)
        }
    })

    return [combinedState, setCombinedState] as const
}

export type { TSetStateFn }

export { useCombinedControlState }

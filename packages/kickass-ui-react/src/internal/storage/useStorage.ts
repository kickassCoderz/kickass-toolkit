import { useEvent, useEventListener } from '@kickass-coderz/hooks'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

export type TUseStorageValue =
    | string
    | number
    | boolean
    | null
    | Array<TUseStorageValue>
    | { [key: string]: TUseStorageValue }

export type TUseStorageInitialState<T extends TUseStorageValue> = T | (() => T)

export type TUseStorageSetStorageValue<T extends TUseStorageValue> = Dispatch<SetStateAction<T>>

export enum EUseStorageEventType {
    LocalStorageEvent = 'local-storage',
    SessionStorageEvent = 'session-storage'
}

type TCustomStorageEvent = CustomEvent<{
    key: string
    oldValue: TUseStorageValue
    newValue: TUseStorageValue
}>

declare global {
    interface WindowEventMap {
        [EUseStorageEventType.LocalStorageEvent]: TCustomStorageEvent
        [EUseStorageEventType.SessionStorageEvent]: TCustomStorageEvent
    }
}

const defaultStringifyFn = <T extends TUseStorageValue>(value: T): string => {
    try {
        return JSON.stringify(value)
    } catch (error) {
        throw new Error(`[KickassHooks-useStorage]: Failed to stringify value: ${value}! ${error}`)
    }
}

const defaultParseFn = <T extends TUseStorageValue>(value: string | null): T => {
    try {
        return value === null ? null : JSON.parse(value)
    } catch (error) {
        throw new Error(`[KickassHooks-useStorage]: Failed to parse value: ${value}! ${error}`)
    }
}

const useStorage = <T extends TUseStorageValue>(
    storage: Storage,
    key: string,
    initialState: TUseStorageInitialState<T>,
    customEventKey: EUseStorageEventType,
    stringifyFn: <T extends TUseStorageValue>(value: T) => string = defaultStringifyFn,
    parseFn: <T extends TUseStorageValue>(value: string | null) => T = defaultParseFn
) => {
    const resolvedInitialState = useMemo(
        () => (typeof initialState === 'function' ? initialState() : initialState),
        [initialState]
    )

    const [state, setState] = useState<T>(() => {
        //const resolvedInitialState = typeof initialState === 'function' ? initialState() : initialState

        if (typeof storage === 'undefined') {
            return resolvedInitialState
        }

        try {
            // Try and get value from storage
            const initialStateFromStorage = storage.getItem(key)

            // If value exist parse and return it
            if (initialStateFromStorage) {
                return parseFn(initialStateFromStorage)
            }

            // Else stringify initial state, set it to storage and return it
            storage.setItem(key, stringifyFn(resolvedInitialState))

            return resolvedInitialState
        } catch (error) {
            throw new Error(
                `[KickassHooks-useStorage]: Failed to set initial state with value: ${resolvedInitialState}! ${error}`
            )
        }
    })

    const setStorageValue: TUseStorageSetStorageValue<T> = useEvent((value: SetStateAction<T>) => {
        const resolvedValue = typeof value === 'function' ? value(state) : value

        if (typeof storage === 'undefined') {
            console.error(
                `[KickassHooks-useStorage]: Tried setting value: ${resolvedValue} with key:${key} in unsuported enviroment!`
            )
            return
        }

        try {
            // @NOTE: Do I need It ?
            //storage.setItem(key, stringifyFn(resolvedValue))
            // setState(resolvedValue)

            //we dispatch a custom event with values and key
            const customStorageEvent: TCustomStorageEvent = new CustomEvent(customEventKey, {
                bubbles: true,
                detail: {
                    key,
                    oldValue: state,
                    newValue: resolvedValue
                }
            })

            window.dispatchEvent(customStorageEvent)
        } catch (error) {
            throw new Error(`[KickassHooks-useStorage]: Failed to set value:${resolvedValue} with key:${key}`)
        }
    })

    //we listen for a custom event and set state accordingly
    useEventListener(typeof window !== 'undefined' ? window : null, customEventKey, event => {
        if (!event.detail.key || event.detail.key !== key) {
            return
        }

        if (!event.detail.newValue && resolvedInitialState) {
            storage.setItem(key, stringifyFn(resolvedInitialState))
            setState(resolvedInitialState)
        } else {
            storage.setItem(key, stringifyFn(event.detail.newValue))
            setState(event.detail.newValue as T)
        }
    })

    //storage event fires a custom event which then sets the data
    useEventListener(typeof window !== 'undefined' ? window : null, 'storage', event => {
        if (!event.key || event.key !== key) {
            return
        }

        const customStorageEvent: TCustomStorageEvent = new CustomEvent(customEventKey, {
            bubbles: true,
            detail: {
                key: event.key,
                oldValue: parseFn(event.oldValue),
                newValue: parseFn(event.newValue)
            }
        })

        window.dispatchEvent(customStorageEvent)
    })

    return [state, setStorageValue] as const
}

export { useStorage }

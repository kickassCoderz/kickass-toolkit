import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useState } from 'react'

import { useEvent } from '../useEvent'
import { useGlobalObject } from '../useGlobalObject'

const useStorageState = (
    key: string,
    storage: Storage,
    initialState: string | null | (() => string | null) = null
): [string | null, Dispatch<SetStateAction<string | null>>] => {
    const mountedRef = useRef(false)

    const [value, setValue] = useState(() => {
        const initialValue = typeof initialState === 'function' ? initialState() : initialState

        if (typeof storage === 'undefined') {
            return initialValue
        }

        return storage.getItem(key) || initialValue
    })

    const setStorageValue = useEvent((valueOrSetter: SetStateAction<string | null>) => {
        setValue(valueOrSetter)

        const newValue = typeof valueOrSetter === 'function' ? valueOrSetter(value) : valueOrSetter

        if (newValue === null) {
            storage.removeItem(key)
        } else {
            storage.setItem(key, newValue)
        }
    })

    useEffect(() => {
        if (!mountedRef.current) {
            mountedRef.current = true

            return
        }

        setValue(storage.getItem(key))
    }, [key, storage])

    return [value, setStorageValue]
}

const useLocalStorageState = (key: string, initialState: string | null | (() => string | null) = null) =>
    useStorageState(key, useGlobalObject().localStorage, initialState)

const useSessionStorageState = (key: string, initialState: string | null | (() => string | null) = null) =>
    useStorageState(key, useGlobalObject().sessionStorage, initialState)

export { useLocalStorageState, useSessionStorageState, useStorageState }

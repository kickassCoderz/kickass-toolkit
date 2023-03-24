import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useState } from 'react'

import { useEvent } from '../useEvent'

export type TUseStorageStateInitalState = string | null | (() => string | null)

/**
 * useStorageState is a hook which helps persist data in chosen storage API to keep state between page
 * reloads.
 *
 * @param key A string under witch data will be saved in Storage
 * @param storage A chosen {@link Storage} API
 * @param initialState A initial state for chosen storage. Default value is null.
 * @returns a tuple of value and setterFn
 */
const useStorageState = (
    key: string,
    storage: Storage,
    initialState: TUseStorageStateInitalState = null
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

export { useStorageState }

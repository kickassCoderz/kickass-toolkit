import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useState } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'

export type TUseStorageStateInitalState = string | null | (() => string | null)

/**
 * useStorageState is a hook which helps persist data in chosen storage API to keep state between page
 * reloads.
 * @beta This hook is in beta state and can be changed in the future.
 * @param key - A string under witch data will be saved in Storage
 * @param storage - A chosen {@link Storage} API
 * @param initialState - A initial state for chosen storage. Default value is null.
 * @returns a tuple of value and setterFn
 */
function useStorageState(
    key: string,
    storage: Storage,
    // eslint-disable-next-line unicorn/no-null
    initialState: TUseStorageStateInitalState = null
): [string | null, Dispatch<SetStateAction<string | null>>] {
    const mountedReference = useRef(false)

    const [value, setValue] = useState(() => {
        const initialValue = typeof initialState === 'function' ? initialState() : initialState

        if (storage === undefined) {
            return initialValue
        }

        return storage.getItem(key) || initialValue
    })

    const setStorageValue = useEffectEvent((valueOrSetter: SetStateAction<string | null>) => {
        setValue(valueOrSetter)

        const newValue = typeof valueOrSetter === 'function' ? valueOrSetter(value) : valueOrSetter

        if (newValue === null) {
            storage.removeItem(key)
        } else {
            storage.setItem(key, newValue)
        }
    })

    useEffect(() => {
        if (!mountedReference.current) {
            mountedReference.current = true

            return
        }

        setValue(storage.getItem(key))
    }, [key, storage])

    return [value, setStorageValue]
}

export { useStorageState }

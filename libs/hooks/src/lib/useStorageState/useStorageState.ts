import { Dispatch, SetStateAction, useEffect } from 'react'
import { useState } from 'react'

import { useEvent } from '../useEvent'
import { useGlobalObject } from '../useGlobalObject'

const useStorageState = (key: string, storage: Storage): [string | null, Dispatch<SetStateAction<string | null>>] => {
    const [value, setValue] = useState(() => {
        if (typeof storage === 'undefined') {
            return null
        }

        return storage.getItem(key)
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
        setValue(storage.getItem(key))
    }, [key, storage])

    return [value, setStorageValue]
}

const useLocalStorageState = (key: string) => useStorageState(key, useGlobalObject().localStorage)

const useSessionStorageState = (key: string) => useStorageState(key, useGlobalObject().sessionStorage)

export { useLocalStorageState, useSessionStorageState, useStorageState }

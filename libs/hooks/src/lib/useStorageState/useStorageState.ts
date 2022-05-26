import { Dispatch, SetStateAction, useEffect } from 'react'
import { useState } from 'react'

import { useEvent } from '../useEvent'

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

const getGlobalObject = () => {
    if (typeof window !== 'undefined') {
        return window
    }

    if (typeof global !== 'undefined') {
        return global
    }

    if (typeof globalThis !== 'undefined') {
        return globalThis
    }

    throw new Error(
        'You are running in an unsupported environment. Make sure your environment has a global object present. More info: https://developer.mozilla.org/en-US/docs/Glossary/Global_object'
    )
}
const globalObject = getGlobalObject()

const useLocalStorageState = (key: string) => useStorageState(key, globalObject.localStorage)

const useSessionStorageState = (key: string) => useStorageState(key, globalObject.sessionStorage)

export { useLocalStorageState, useSessionStorageState }

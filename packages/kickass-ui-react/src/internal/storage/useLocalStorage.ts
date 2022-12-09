import { useGlobalObject } from '@kickass-coderz/hooks'

import { EUseStorageEventType, TUseStorageValue, useStorage } from './useStorage'

/**
 * Just like React's useState but persits into browser local storage API to keep state between page reloads.
 *
 * @param key A string under witch data will be saved in LocalStorage
 * @param initialState A initial state for chosen storage. Default value is null.
 * @returns a tuple of value and setterFn
 */
const useLocalStorage = <T extends TUseStorageValue>(key: string, initialState: T) => {
    const { localStorage } = useGlobalObject()

    return useStorage<T>(localStorage, key, initialState, EUseStorageEventType.LocalStorageEvent)
}

export { useLocalStorage }

import { useGlobalObject } from '../useGlobalObject/useGlobalObject'
import type { TUseStorageStateInitalState } from '../useStorageState/useStorageState'
import { useStorageState } from '../useStorageState/useStorageState'

/**
 * Just like React's useState but persits into browser local storage API to keep state between page reloads.
 * @beta This hook is in beta and may change in the future.
 * @param key - A string under witch data will be saved in LocalStorage
 * @param initialState - A initial state for chosen storage. Default value is null.
 * @returns a tuple of value and setterFn
 */
// eslint-disable-next-line unicorn/no-null
function useLocalStorageState(key: string, initialState: TUseStorageStateInitalState = null) {
    return useStorageState(key, useGlobalObject().localStorage, initialState)
}

export { useLocalStorageState }

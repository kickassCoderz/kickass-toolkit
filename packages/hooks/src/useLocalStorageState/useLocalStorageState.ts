import { useGlobalObject } from '../useGlobalObject'
import type { TUseStorageStateInitalState } from '../useStorageState'
import { useStorageState } from '../useStorageState'

/**
 * Just like React's useState but persits into browser local storage API to keep state between page reloads.
 *
 * @param key A string under witch data will be saved in LocalStorage
 * @param initialState A initial state for chosen storage. Default value is null.
 * @returns a tuple of value and setterFn
 */
const useLocalStorageState = (key: string, initialState: TUseStorageStateInitalState = null) =>
    useStorageState(key, useGlobalObject().localStorage, initialState)

export { useLocalStorageState }

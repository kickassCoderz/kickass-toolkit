import { createContext, useContext } from 'react'

export type TProviderProperties = {
    children?: React.ReactNode
} & Record<string, unknown>

export type TUseCreateContextValue<T, P extends TProviderProperties> = (properties: P) => T

export type TProvider<P extends TProviderProperties> = (properties: P) => JSX.Element

export type TUseProvider<T> = () => T

export type TCreateContextProviderReturnType<T, P extends TProviderProperties> = [TProvider<P>, TUseProvider<T>]

/**
 * Creates a `Provider` component and `useProvider` hook with type inference based od provided factory function.
 * @beta this is work in progress and API might change
 * @param useCreateContextValue - a factory hook which will be called on `Provider` component mount. It takes all of `Provider` component props as argument and it's return value will be available as context value via `useProvider` hook.
 * @param defaultValue - an optional fallback which is returned from `useProvider` hook if the `context` isn't provided.
 * @returns tuple of `Provider` component and `useProvider` hook(`[Provider, useProvider]`).
 */
function createContextProvider<T, P extends TProviderProperties>(
    useCreateContextValue: TUseCreateContextValue<T, P>,
    defaultValue: T
): TCreateContextProviderReturnType<T, P>

function createContextProvider<T, P extends TProviderProperties>(
    useCreateContextValue: TUseCreateContextValue<T, P>
): TCreateContextProviderReturnType<T | undefined, P>

function createContextProvider<T, P extends TProviderProperties>(
    useCreateContextValue: TUseCreateContextValue<T, P>,
    defaultValue?: T
): TCreateContextProviderReturnType<T | undefined, P> {
    const Context = createContext(defaultValue)

    function Provider(properties: P) {
        const contextValue = useCreateContextValue(properties)

        return <Context.Provider value={contextValue}>{properties.children}</Context.Provider>
    }

    function useProvider() {
        const providerContext = useContext(Context)

        return providerContext
    }

    return [Provider, useProvider]
}

export { createContextProvider }

import { assert, isUndefined } from '@kickass-coderz/utils'
import { createContext, useContext } from 'react'

export type CreateContextProviderProperties = {
    children?: React.ReactNode
} & Record<string, unknown>

export type TCreateContextProviderOptions = {
    /**
     * Name of the context. It will be used in error messages as a `scope` and as a `displayName` for the `Context`. Useful for debugging.
     */
    scope?: string
    /**
     * Error message which will be thrown by `useProvider` hook if the `context` is `undefined`. It can be a string or a function which will be called on error and it's return value will be used as an error message.
     */
    errorMessage?: string | (() => string)
}

/**
 * Creates a `Provider` component and `useProvider` hook with type inference based od provided factory function.
 * `useProvider` hook will **throw an error** if the `context` is `undefined`.
 * @param useCreateContextProviderValue - a factory hook which will be called on `Provider` component mount. It takes all of `Provider` component props as argument and it's return value will be available as context value via `useProvider` hook.
 * @param options - Additional options for `createContextProvider` function. Has `contextName` and `errorMessage` properties.
 * @returns tuple of `Provider` component and `useProvider` hook `[Provider, useProvider]`.
 */
function createContextProvider<P extends CreateContextProviderProperties, T>(
    useCreateContextProviderValue: (properties: P) => T,
    options?: TCreateContextProviderOptions
) {
    const Context = createContext<T | undefined>(undefined)

    const Provider = (properties: P) => {
        const contextValue = useCreateContextProviderValue(properties)

        return <Context.Provider value={contextValue}>{properties.children}</Context.Provider>
    }

    if (options?.scope) {
        Context.displayName = `${options.scope}Context`
        Provider.displayName = `${options.scope}Provider`
    }

    const useProvider = () => {
        const providerContext = useContext(Context)

        assert(!isUndefined(providerContext), {
            scope: options?.scope ? `${options.scope}Provider` : undefined,
            message: options?.errorMessage
        })

        return providerContext
    }

    return [Provider, useProvider] as const
}

export { createContextProvider }

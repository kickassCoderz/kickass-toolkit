import { createContext, useContext, useMemo } from 'react'

import { assert } from './assert'
import { createComponentName } from './createComponentName'

const createScopedContext = <T extends object | null>(scopeName: string, defaultValue?: T) => {
    const ScopedContext = createContext<T | undefined>(defaultValue)

    ScopedContext.displayName = createComponentName(scopeName, 'Context')

    const ScopedProvider = ({ children, ...contextProps }: T & { children: React.ReactNode }) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const contextValue = useMemo(() => contextProps, Object.values(contextProps)) as T

        return <ScopedContext.Provider value={contextValue}>{children}</ScopedContext.Provider>
    }

    ScopedProvider.displayName = createComponentName(scopeName, 'Provider')

    const useScopedContext = (consumerName: string) => {
        const context = useContext(ScopedContext)

        assert(context !== undefined, scopeName, `${consumerName} must be used within a ${scopeName}.`)

        return context
    }

    return [ScopedProvider, useScopedContext] as const
}

export { createScopedContext }

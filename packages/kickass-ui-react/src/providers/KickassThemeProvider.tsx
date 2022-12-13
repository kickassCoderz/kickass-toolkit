import { useIsomorphicLayoutEffect, useMediaQuery } from '@kickass-coderz/hooks'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react'

import {
    DARK_THEME_VALUE,
    DISABLE_CSS_TRANSITION,
    LIGHT_THEME_VALUE,
    THEME_ATTR_NAME,
    THEME_STORAGE_KEY
} from '../consts'
import { useLocalStorage } from '../internal'

export type TKAUIThemeMode = 'light' | 'dark'

const useSystemTheme = () => {
    const { matches } = useMediaQuery('(prefers-color-scheme: dark)')

    return matches ? DARK_THEME_VALUE : LIGHT_THEME_VALUE
}

const useDisableThemeTransition = (theme: TKAUIThemeMode, enabled?: boolean) => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    useIsomorphicLayoutEffect(() => {
        let timerId: ReturnType<typeof setTimeout> | undefined
        const documentNode = typeof document === 'undefined' ? undefined : document

        if (enabled && mountedRef.current && documentNode) {
            const styleNode = documentNode.createElement('style')
            styleNode.appendChild(documentNode.createTextNode(DISABLE_CSS_TRANSITION))
            documentNode.head.appendChild(styleNode)

            timerId = setTimeout(() => {
                documentNode.head.removeChild(styleNode)
            }, 1)
        }

        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    }, [enabled, theme])
}

const useThemeResolver = (mode?: TKAUIThemeMode, disableTransitionOnChange?: boolean) => {
    const systemTheme = useSystemTheme()
    const [storageState, setStorageState] = useLocalStorage(THEME_STORAGE_KEY, mode || systemTheme)

    useDisableThemeTransition(storageState, disableTransitionOnChange)

    const toggleTheme = useCallback(() => {
        setStorageState(currentTheme => (currentTheme === LIGHT_THEME_VALUE ? DARK_THEME_VALUE : LIGHT_THEME_VALUE))
    }, [setStorageState])

    const setTheme = useCallback(
        (colorMode: TKAUIThemeMode) => {
            setStorageState(colorMode)
        },
        [setStorageState]
    )

    useIsomorphicLayoutEffect(() => {
        const documentElement = typeof document === 'undefined' ? undefined : document.documentElement

        if (documentElement) {
            documentElement.setAttribute(THEME_ATTR_NAME, storageState)
        }
    }, [storageState])

    const context = useMemo(
        () => ({
            theme: storageState,
            isDark: storageState === DARK_THEME_VALUE,
            isLight: storageState === LIGHT_THEME_VALUE,
            toggleTheme,
            setTheme
        }),
        [storageState, toggleTheme, setTheme]
    )

    return context
}

type TKAUIThemeContext = {
    theme: TKAUIThemeMode
    isDark: boolean
    isLight: boolean
    setTheme: (colorMode: TKAUIThemeMode) => void
    toggleTheme: () => void
}

const KickassThemeContext = createContext<TKAUIThemeContext | undefined>(undefined)

KickassThemeContext.displayName = 'KAUI-ThemeContext'

type TKAUIThemeProviderProps = {
    children: React.ReactNode
    disableTransitionOnChange?: boolean
    mode?: TKAUIThemeMode
}

const KickassThemeProvider = ({ children, mode, disableTransitionOnChange = true }: TKAUIThemeProviderProps) => {
    const context = useThemeResolver(mode, disableTransitionOnChange)

    return <KickassThemeContext.Provider value={context}>{children}</KickassThemeContext.Provider>
}

KickassThemeProvider.displayName = 'KAUI-ThemeProvider'

const useKickassTheme = () => {
    const context = useContext(KickassThemeContext)

    if (context === undefined) {
        throw new Error('[KickassUI]: `useKickassTheme` must be used within a `KickassThemeProvider`!')
    }

    return context
}

export { KickassThemeProvider, useKickassTheme }

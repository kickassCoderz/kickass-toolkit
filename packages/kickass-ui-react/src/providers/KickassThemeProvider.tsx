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

export type TKickassThemeMode = 'light' | 'dark'

const useSystemTheme = () => {
    const { matches } = useMediaQuery('(prefers-color-scheme: dark)')

    return matches ? DARK_THEME_VALUE : LIGHT_THEME_VALUE
}

const useDisableThemeTransition = (theme: TKickassThemeMode, enabled?: boolean) => {
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

const useThemeResolver = (mode?: TKickassThemeMode, disableTransitionOnChange?: boolean) => {
    const systemTheme = useSystemTheme()
    const [storageState, setStorageState] = useLocalStorage(THEME_STORAGE_KEY, mode || systemTheme)

    useDisableThemeTransition(storageState, disableTransitionOnChange)

    const toggleTheme = useCallback(() => {
        setStorageState(currentTheme => (currentTheme === LIGHT_THEME_VALUE ? DARK_THEME_VALUE : LIGHT_THEME_VALUE))
    }, [setStorageState])

    const setTheme = useCallback(
        (colorMode: TKickassThemeMode) => {
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

type TKickassThemeContext = {
    theme: TKickassThemeMode
    isDark: boolean
    isLight: boolean
    setTheme: (colorMode: TKickassThemeMode) => void
    toggleTheme: () => void
}

const KickassThemeContext = createContext<TKickassThemeContext | undefined>(undefined)

type TKickassThemeProviderProps = {
    children: React.ReactNode
    disableTransitionOnChange?: boolean
    mode?: TKickassThemeMode
}

const KickassThemeProvider = ({ children, mode, disableTransitionOnChange = true }: TKickassThemeProviderProps) => {
    const context = useThemeResolver(mode, disableTransitionOnChange)

    return <KickassThemeContext.Provider value={context}>{children}</KickassThemeContext.Provider>
}

const useKickassTheme = () => {
    const context = useContext(KickassThemeContext)

    if (context === undefined) {
        throw new Error('[StarbaseUI]: `useStarbaseTheme` must be used within a `StarbaseThemeProvider`!')
    }

    return context
}

export { KickassThemeProvider, useKickassTheme }

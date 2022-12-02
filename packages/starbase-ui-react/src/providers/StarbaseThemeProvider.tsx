import { useMediaQuery } from '@kickass-coderz/hooks'
import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import {
    COLOR_SCHEME_STORAGE_KEY,
    DARK_THEME_VALUE,
    DISABLE_CSS_TRANSITION,
    LIGHT_THEME_VALUE,
    THEME_ATTR_NAME
} from '../consts'
import { useLocalStorage } from '../internal'

type TStarbaseThemeMode = 'light' | 'dark'

type TStarbaseThemeContext = {
    theme: TStarbaseThemeMode
    isDark: boolean
    isLight: boolean
    toggleTheme: () => void
}

const StarbaseThemeContext = createContext<TStarbaseThemeContext | undefined>(undefined)

const useSystemTheme = () => {
    const { matches } = useMediaQuery('(prefers-color-scheme: dark)')

    return matches ? DARK_THEME_VALUE : LIGHT_THEME_VALUE
}

const useDisableThemeTransition = (theme: TStarbaseThemeMode, enabled?: boolean) => {
    const mountedRef = useRef(false)

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    useLayoutEffect(() => {
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

const useThemeResolver = (mode?: TStarbaseThemeMode, disableTransitionOnChange?: boolean) => {
    const systemTheme = useSystemTheme()
    const [storageState, setStorageState] = useLocalStorage(COLOR_SCHEME_STORAGE_KEY, mode || systemTheme)

    useDisableThemeTransition(storageState, disableTransitionOnChange)

    const toggleTheme = useCallback(
        (colorMode?: TStarbaseThemeMode) => {
            if (colorMode) {
                setStorageState(colorMode)
            }

            setStorageState(currentTheme => (currentTheme === LIGHT_THEME_VALUE ? DARK_THEME_VALUE : LIGHT_THEME_VALUE))
        },
        [setStorageState]
    )

    useLayoutEffect(() => {
        const documentElement = typeof document === 'undefined' ? undefined : document.documentElement

        documentElement?.setAttribute(THEME_ATTR_NAME, storageState)
    }, [storageState])

    const context = useMemo(
        () => ({
            theme: storageState,
            isDark: storageState === DARK_THEME_VALUE,
            isLight: storageState === LIGHT_THEME_VALUE,
            toggleTheme
        }),
        [storageState, toggleTheme]
    )

    return context
}

type TStarbaseThemeProviderProps = {
    children: React.ReactNode
    disableTransitionOnChange?: boolean
    mode?: TStarbaseThemeMode
}

const StarbaseThemeProvider = ({ children, mode, disableTransitionOnChange = true }: TStarbaseThemeProviderProps) => {
    const context = useThemeResolver(mode, disableTransitionOnChange)

    return <StarbaseThemeContext.Provider value={context}>{children}</StarbaseThemeContext.Provider>
}

const useStarbaseTheme = () => {
    const context = useContext(StarbaseThemeContext)

    if (context === undefined) {
        throw new Error('[StarbaseUI]: `useStarbaseTheme` must be used within a `StarbaseThemeProvider`!')
    }

    return context
}

export { StarbaseThemeProvider, useStarbaseTheme }

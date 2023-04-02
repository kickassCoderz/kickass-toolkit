import { useEffect, useState } from 'react'

import { useIsBrowser } from '../useIsBrowser/useIsBrowser'

type TUseMediaQueryOptions = {
    /** Value that will be used for the initial render, use when evironment does not support matchMedia eg. during SSR (Server Side Rendering). If undefined is provided it will default to matchMedia.matches in Browser and to false in all other environments.*/
    initialValue?: boolean
}

type TMediaQueryPoolItem = {
    mediaQuery: MediaQueryList
    callbacks: Set<(event: MediaQueryListEvent) => void>
    removeListener: () => void
}

const mediaQueryPool: Record<string, TMediaQueryPoolItem> = {}

const getMediaQueryInstance = (query: string): TMediaQueryPoolItem => {
    if (!mediaQueryPool[query]) {
        const mediaQuery = matchMedia(query)
        const callbacks = new Set<(event: MediaQueryListEvent) => void>()
        const handleChange = (event: MediaQueryListEvent) => {
            for (const callback of callbacks) callback(event)
        }

        mediaQuery.addEventListener('change', handleChange)

        mediaQueryPool[query] = {
            mediaQuery,
            callbacks,
            removeListener: () => {
                mediaQuery.removeEventListener('change', handleChange)
            }
        }
    }

    return mediaQueryPool[query]
}

/**
 * Drop in replacement for media query detection and browser matchMedia.
 *
 * @param query - media query to detect
 * @param mediaQueryOptions - options for media query
 * @returns An object with matches boolean
 */
function useMediaQuery(query: string, mediaQueryOptions: TUseMediaQueryOptions = {}): { matches: boolean } {
    const { initialValue } = mediaQueryOptions
    const isBrowser = useIsBrowser()
    const isSSRMode = initialValue !== undefined

    const [matches, setMatches] = useState(() => {
        if (isSSRMode) {
            return initialValue
        }

        if (!isBrowser) {
            return false
        }

        return getMediaQueryInstance(query).mediaQuery.matches
    })

    useEffect(() => {
        const { mediaQuery, callbacks, removeListener } = getMediaQueryInstance(query)

        if (isSSRMode) {
            setMatches(mediaQuery.matches)
        }

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        callbacks.add(handleChange)

        return () => {
            callbacks.delete(handleChange)

            if (callbacks.size === 0) {
                removeListener()
                delete mediaQueryPool[query]
            }
        }
    }, [query, isSSRMode])

    return { matches }
}

export { useMediaQuery }

import { useState } from 'react'

import { useIsBrowser } from '../useIsBrowser'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TUseMediaQueryOptions = {
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
            callbacks.forEach(callback => callback(event))
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
 * @param {string} query
 * @param {TUseMediaQueryOptions} [{ initialValue }={}] - value that will be used for the initial render, use when evironment does not support matchMedia eg. during SSR (Server Side Rendering). If undefined is provided it will default to matchMedia.matches in Browser and to false in all other environments.
 * @return {*}  {{ matches: boolean }}
 */
const useMediaQuery = (query: string, { initialValue }: TUseMediaQueryOptions = {}): { matches: boolean } => {
    const isBrowser = useIsBrowser()
    const isSSRMode = typeof initialValue !== 'undefined'

    const [matches, setMatches] = useState(() => {
        if (isSSRMode) {
            return initialValue
        }

        if (!isBrowser) {
            return false
        }

        return getMediaQueryInstance(query).mediaQuery.matches
    })

    useIsomorphicLayoutEffect(() => {
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

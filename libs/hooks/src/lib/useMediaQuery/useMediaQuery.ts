import { useState } from 'react'

import { useIsBrowser } from '../useIsBrowser'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TUseMediaQueryOptions = {
    fallbackValue?: boolean
}

/**
 * Drop in replacement for media query detection and browser matchMedia.
 *
 * @param {string} query
 * @param {TUseMediaQueryOptions} [{ fallbackValue }={}] - fallbackValue is the value that will be used for initial render if the environment does not support matchMedia
 * @return {*}  {{ matches: boolean }}
 */
const useMediaQuery = (query: string, { fallbackValue }: TUseMediaQueryOptions = {}): { matches: boolean } => {
    const isBrowser = useIsBrowser()
    const isSSRMode = typeof fallbackValue !== 'undefined'

    const [matches, setMatches] = useState(() => {
        if (isSSRMode) {
            return fallbackValue
        }

        if (!isBrowser) {
            return false
        }

        return matchMedia(query).matches
    })

    useIsomorphicLayoutEffect(() => {
        const mediaQueryList = matchMedia(query)

        if (isSSRMode) {
            setMatches(mediaQueryList.matches)
        }

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches)
        }

        mediaQueryList.addEventListener('change', handleChange)

        return () => {
            mediaQueryList.removeEventListener('change', handleChange)
        }
    }, [query, isSSRMode])

    return { matches }
}

export { useMediaQuery }

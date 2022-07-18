import { useState } from 'react'

import { useIsBrowser } from '../useIsBrowser'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TUseMediaQueryOptions = {
    initialValue?: boolean
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

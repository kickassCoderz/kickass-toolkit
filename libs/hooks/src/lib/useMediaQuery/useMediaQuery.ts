import { useEffect, useState } from 'react'

import { useIsBrowser } from '../useIsBrowser'

const useMediaQuery = (query: string, fallbackValue?: boolean) => {
    const isBrowser = useIsBrowser()
    const isSSRMode = typeof fallbackValue !== 'undefined'

    const [matches, setMatches] = useState(() => {
        if (!isBrowser && isSSRMode) {
            return fallbackValue
        }

        return matchMedia(query).matches
    })

    useEffect(() => {
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

    return matches
}

export { useMediaQuery }

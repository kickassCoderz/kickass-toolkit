import { useEffect, useMemo } from 'react'

import { useEvent } from '../useEvent'
import { useIsBrowser } from '../useIsBrowser'

const observers: IntersectionObserver[] = []

/**
 * Drop in hook replacement for IntersectionObserver
 *
 * @param {Element} element
 * @param {IntersectionObserverCallback} callback
 * @param {IntersectionObserverInit} [options]
 * @return {*}  {(IntersectionObserver | undefined)}
 */
const useIntersectionObserver = (
    element: Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
): IntersectionObserver | undefined => {
    const isBrowser = useIsBrowser()
    const { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 } = options || {}
    const observerCallback = useEvent(callback)

    const observer = useMemo(() => {
        if (!isBrowser) {
            return undefined
        }

        const thresholds = Array.isArray(threshold) ? threshold : [threshold]

        const existingObserver = observers.find(item =>
            [
                item.root === root,
                item.rootMargin === rootMargin,
                item.thresholds.toString() === thresholds.toString()
            ].every(Boolean)
        )

        if (existingObserver) {
            return existingObserver
        }

        const newObserver = new IntersectionObserver(observerCallback, { root, rootMargin, threshold })
        observers.push(newObserver)

        return newObserver
    }, [isBrowser, root, rootMargin, threshold, observerCallback])

    useEffect(() => {
        if (!element || !observer) {
            return undefined
        }

        observer.observe(element)

        return () => {
            observer.unobserve(element)
        }
    }, [observer, element])

    return observer
}

export { useIntersectionObserver }

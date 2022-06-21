import { useEffect, useMemo } from 'react'

import { useEvent } from '../useEvent'
import { useIsBrowser } from '../useIsBrowser'

type ObserverPoolItem = { observer: IntersectionObserver; callbacks: IntersectionObserverCallback[] }
const observerPool: ObserverPoolItem[] = []

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

    const observerItem = useMemo(() => {
        if (!isBrowser) {
            return undefined
        }

        const thresholds = Array.isArray(threshold) ? threshold : [threshold]

        const existingObserver = observerPool.find(item =>
            [
                item.observer.root === root,
                item.observer.rootMargin === rootMargin,
                item.observer.thresholds.toString() === thresholds.toString()
            ].every(Boolean)
        )

        if (existingObserver) {
            return existingObserver
        }

        const partialObserverItem: Partial<ObserverPoolItem> = { observer: undefined, callbacks: [] }
        partialObserverItem.observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
                partialObserverItem.callbacks?.forEach(callbackItem => {
                    callbackItem(entries, observer)
                })
            },
            { root, rootMargin, threshold }
        )
        const observerItem = partialObserverItem as ObserverPoolItem
        observerPool.push(observerItem as ObserverPoolItem)

        return observerItem
    }, [isBrowser, root, rootMargin, threshold])

    useEffect(() => {
        if (!observerItem) {
            return
        }

        observerItem.callbacks.push(observerCallback)

        return () => {
            observerItem.callbacks = observerItem.callbacks.filter(item => item !== observerCallback)
        }
    }, [observerItem, observerCallback])

    useEffect(() => {
        if (!element || !observerItem?.observer) {
            return undefined
        }

        observerItem.observer.observe(element)

        return () => {
            observerItem.observer.unobserve(element)
        }
    }, [observerItem?.observer, element])

    return observerItem?.observer
}

export { useIntersectionObserver }

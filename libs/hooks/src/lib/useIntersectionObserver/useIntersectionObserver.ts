import { useEffect, useRef } from 'react'

import { useEvent } from '../useEvent'

type TObserverPoolItem = { observer: IntersectionObserver; callbacks: Set<IntersectionObserverCallback> }
// See this for observerPool type
// https://github.com/kickassCoderz/kickass-toolkit/pull/42#issuecomment-1169928398
const observerPool: TObserverPoolItem[] = []

/**
 * Drop in hook replacement for IntersectionObserver
 *
 * @param {Element} element element to observe
 * @param {IntersectionObserverCallback} callback callback to call when intersection changes
 * @param {IntersectionObserverInit} [options] options to pass to the observer
 */
const useIntersectionObserver = (
    element: Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
): void => {
    const { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0.0 } = options || {}
    const observerCallback = useEvent<IntersectionObserverCallback>((entries, observer) => {
        const targetEntries = entries.filter(entry => entry.target === element)

        if (targetEntries.length) {
            callback(targetEntries, observer)
        }
    })
    const observerItemRef = useRef<TObserverPoolItem | undefined>()

    useEffect(() => {
        const thresholds = Array.isArray(threshold) ? threshold : [threshold]

        let observerItem = observerPool.find(item =>
            [
                item.observer.root === root,
                item.observer.rootMargin === rootMargin,
                item.observer.thresholds.toString() === thresholds.toString()
            ].every(Boolean)
        )

        if (!observerItem) {
            const partialObserverItem: Partial<TObserverPoolItem> = {
                observer: undefined,
                callbacks: new Set([observerCallback])
            }
            partialObserverItem.observer = new IntersectionObserver(
                (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
                    partialObserverItem.callbacks?.forEach(callbackItem => {
                        callbackItem(entries, observer)
                    })
                },
                { root, rootMargin, threshold }
            )
            observerItem = partialObserverItem as TObserverPoolItem
            observerPool.push(observerItem as TObserverPoolItem)
        } else {
            observerItem.callbacks.add(observerCallback)
        }

        observerItemRef.current = observerItem

        return () => {
            if (!observerItem) {
                return
            }

            observerItem.callbacks.delete(observerCallback)

            if (observerItem.callbacks.size === 0) {
                observerItem.observer.disconnect()
                const observerIndex = observerPool.findIndex(item => item === observerItem)
                observerPool.splice(observerIndex, 1)
            }
        }
    }, [root, rootMargin, threshold, observerCallback])

    useEffect(() => {
        if (!element || !observerItemRef.current?.observer) {
            return undefined
        }

        const observerItem = observerItemRef.current?.observer

        observerItem.observe(element)

        return () => {
            observerItem.unobserve(element)
        }
    }, [element])
}

export { useIntersectionObserver }

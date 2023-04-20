import { useEffect, useRef } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'

type TObserverPoolItem = { observer: IntersectionObserver; callbacks: Set<IntersectionObserverCallback> }
// See this for observerPool type
// https://github.com/kickassCoderz/kickass-toolkit/pull/42#issuecomment-1169928398
const observerPool: TObserverPoolItem[] = []

const getTargetElement = <T extends Element>(target: React.RefObject<T> | T | null): T | null => {
    return target && 'current' in target ? target.current : target
}

/**
 * Drop in hook replacement for IntersectionObserver
 * @beta - this hook is still in development and may change in the future
 * @param target - an element to observe
 * @param callbackFn - callback to call when intersection changes
 * @param options - to pass to the observer
 */
function useIntersectionObserver<T extends Element>(
    target: React.RefObject<T> | T | null,
    callbackFunction: IntersectionObserverCallback,
    options?: IntersectionObserverInit
): void {
    // eslint-disable-next-line unicorn/no-null
    const { root = null, rootMargin = '0px 0px 0px 0px', threshold = 0 } = options || {}
    const observerCallback = useEffectEvent<IntersectionObserverCallback>((entries, observer) => {
        const element = getTargetElement(target)

        const targetEntries = entries.filter(entry => entry.target === element)

        if (targetEntries.length > 0) {
            callbackFunction(targetEntries, observer)
        }
    })
    const observerItemReference = useRef<TObserverPoolItem | undefined>()

    useEffect(() => {
        const thresholds = Array.isArray(threshold) ? threshold : [threshold]

        let observerItem = observerPool.find(item =>
            [
                item.observer.root === root,
                item.observer.rootMargin === rootMargin,
                item.observer.thresholds.toString() === thresholds.toString()
            ].every(Boolean)
        )

        if (observerItem) {
            observerItem.callbacks.add(observerCallback)
        } else {
            const partialObserverItem: Partial<TObserverPoolItem> = {
                observer: undefined,
                callbacks: new Set([observerCallback])
            }
            partialObserverItem.observer = new IntersectionObserver(
                (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
                    if (partialObserverItem.callbacks)
                        for (const callbackItem of partialObserverItem.callbacks) {
                            callbackItem(entries, observer)
                        }
                },
                { root, rootMargin, threshold }
            )
            observerItem = partialObserverItem as TObserverPoolItem
            observerPool.push(observerItem)
        }

        observerItemReference.current = observerItem

        return () => {
            if (!observerItem) {
                return
            }

            observerItem.callbacks.delete(observerCallback)

            if (observerItem.callbacks.size === 0) {
                observerItem.observer.disconnect()
                const observerIndex = observerPool.indexOf(observerItem)
                observerPool.splice(observerIndex, 1)
            }
        }
    }, [root, rootMargin, threshold, observerCallback])

    useEffect(() => {
        const element = getTargetElement(target)

        if (!element || !observerItemReference.current?.observer) {
            return
        }

        const observerItem = observerItemReference.current?.observer

        observerItem.observe(element)

        return () => {
            observerItem.unobserve(element)
        }
    }, [target])
}

export { useIntersectionObserver }

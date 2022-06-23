import { RefObject } from 'react'

import { useEvent } from '../useEvent'
import { getIsBrowser } from '../useIsBrowser'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TOnIntersectCallback = (entry: IntersectionObserverEntry) => void

type TUseIntersectionObserverOptions = {
    root?: RefObject<Element | Document> | Element | Document | null
    rootMargin?: string
    threshold?: number[]
}

const DEFAULT_INIT_OPTIONS: TUseIntersectionObserverOptions = {
    root: window.document,
    rootMargin: '0px',
    threshold: [0]
}

type TObserverInstance = {
    observer: IntersectionObserver
    subscribe: (target: Element, onIntersectCallback: TOnIntersectCallback) => void
    unsubscribe: (target: Element, onIntersectCallback: TOnIntersectCallback) => void
}

const observerInstancesMap = new Map<IntersectionObserverInit, TObserverInstance>()

const getIntersectionObserverInstance = (intersectionObserverOptions: IntersectionObserverInit) => {
    const isBrowser = getIsBrowser()

    if (!isBrowser) {
        return undefined
    }

    const onIntersectCallbacksMap = new Map<Element, Set<TOnIntersectCallback>>()

    let observerInstance = observerInstancesMap.get(intersectionObserverOptions)

    if (!observerInstance) {
        const ioObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const targetElement = entry.target
                const observedElementCallbacksSet = onIntersectCallbacksMap.get(targetElement)

                observedElementCallbacksSet?.forEach(onIntersectCallback => {
                    onIntersectCallback(entry)
                })
            })
        }, intersectionObserverOptions)

        observerInstance = {
            observer: ioObserver,
            subscribe(target, onIntersectCallback) {
                const observedElementCallbacksSet = onIntersectCallbacksMap.get(target)

                if (!observedElementCallbacksSet) {
                    const newCallbacksSet = new Set<TOnIntersectCallback>()

                    newCallbacksSet.add(onIntersectCallback)

                    onIntersectCallbacksMap.set(target, newCallbacksSet)
                } else {
                    observedElementCallbacksSet.add(onIntersectCallback)
                }

                //always observe
                ioObserver.observe(target)
            },
            unsubscribe(target, onIntersectCallback) {
                const observedElementCallbacksSet = onIntersectCallbacksMap.get(target)

                if (observedElementCallbacksSet) {
                    observedElementCallbacksSet.delete(onIntersectCallback)
                }

                if (!observedElementCallbacksSet?.size) {
                    onIntersectCallbacksMap.delete(target)

                    ioObserver.unobserve(target)
                }

                if (!onIntersectCallbacksMap.size) {
                    ioObserver.disconnect()

                    observerInstancesMap.delete(intersectionObserverOptions)
                }
            }
        }

        observerInstancesMap.set(intersectionObserverOptions, observerInstance)
    }

    return observerInstance
}

const mergeOptions = (options?: TUseIntersectionObserverOptions) => {
    const resolvedRoot = options?.root || DEFAULT_INIT_OPTIONS.root

    return {
        ...DEFAULT_INIT_OPTIONS,
        ...options,
        root: resolvedRoot && 'current' in resolvedRoot ? resolvedRoot.current : resolvedRoot
    }
}

const useIntersectionObserverPOC = <T extends Element>(
    target: RefObject<T> | T | null,
    onIntersect: TOnIntersectCallback,
    options: TUseIntersectionObserverOptions = DEFAULT_INIT_OPTIONS
) => {
    const intersectionObserver = getIntersectionObserverInstance(mergeOptions(options))

    const onIntersectCallback = useEvent(onIntersect)

    useIsomorphicLayoutEffect(() => {
        const targetElement = target && 'current' in target ? target.current : target

        if (intersectionObserver && targetElement) {
            intersectionObserver.subscribe(targetElement, onIntersectCallback)
        }

        return () => {
            if (intersectionObserver && targetElement) {
                intersectionObserver.unsubscribe(targetElement, onIntersectCallback)
            }
        }
    }, [target, onIntersectCallback, intersectionObserver])
}

export { useIntersectionObserverPOC }

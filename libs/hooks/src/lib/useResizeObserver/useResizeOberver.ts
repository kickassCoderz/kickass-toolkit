import { RefObject } from 'react'

import { useEvent } from '../useEvent'
import { getIsBrowser } from '../useIsBrowser'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

type TResizeObserverInstance = {
    observer: ResizeObserver
    subscribe: (target: Element, onResizeCallback: ResizeObserverCallback) => void
    unsubscribe: (target: Element, onResizeCallback: ResizeObserverCallback) => void
}

let resizeObserverInstance: TResizeObserverInstance

const getResizeObserverInstance = () => {
    const isBrowser = getIsBrowser()

    if (!isBrowser) {
        return undefined
    }

    if (resizeObserverInstance) {
        return resizeObserverInstance
    }

    const onResizeCallbacksMap = new Map<Element, Set<ResizeObserverCallback>>()

    const roObserver = new ResizeObserver((entries, observer) => {
        entries.forEach(entry => {
            const targetElement = entry.target
            const observedElementCallbacksSet = onResizeCallbacksMap.get(targetElement)

            observedElementCallbacksSet?.forEach(onResizeCallback => {
                onResizeCallback([entry], observer)
            })
        })
    })

    resizeObserverInstance = {
        observer: roObserver,
        subscribe(target, onResizeCallback) {
            const observedElementCallbacksSet = onResizeCallbacksMap.get(target)

            if (!observedElementCallbacksSet) {
                const newCallbacksSet = new Set<ResizeObserverCallback>()

                newCallbacksSet.add(onResizeCallback)

                onResizeCallbacksMap.set(target, newCallbacksSet)
            } else {
                observedElementCallbacksSet.add(onResizeCallback)
            }

            //always observe
            roObserver.observe(target)
        },
        unsubscribe(target, onResizeCallback) {
            const observedElementCallbacksSet = onResizeCallbacksMap.get(target)

            //if callback exists in set remove it
            if (observedElementCallbacksSet) {
                observedElementCallbacksSet.delete(onResizeCallback)
            }

            // if callbacks set is empty remove it from map and unobserve element
            if (!observedElementCallbacksSet?.size) {
                onResizeCallbacksMap.delete(target)

                roObserver.unobserve(target)
            }
        }
    }

    return resizeObserverInstance
}

/**
 * Drop in replacement for ResizeObserver.
 *
 * @template T
 * @param {(RefObject<T> | T | null)} target
 * @param {ResizeObserverCallback} onResize
 */
const useResizeObserver = <T extends Element>(target: RefObject<T> | T | null, onResize: ResizeObserverCallback) => {
    const resizeObserver = getResizeObserverInstance()

    const onResizeCallback = useEvent(onResize)

    useIsomorphicLayoutEffect(() => {
        const targetElement = target && 'current' in target ? target.current : target

        if (resizeObserver && targetElement) {
            resizeObserver.subscribe(targetElement, onResizeCallback)
        }

        return () => {
            if (resizeObserver && targetElement) {
                resizeObserver.unsubscribe(targetElement, onResizeCallback)
            }
        }
    }, [resizeObserver, onResizeCallback, target])
}

export { useResizeObserver }

import { RefObject, useEffect } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'
import { getIsBrowser } from '../useIsBrowser/useIsBrowser'

export type TResizeObserverInstance = {
    observer: ResizeObserver
    subscribe: (target: Element, onResizeCallback: ResizeObserverCallback) => void
    unsubscribe: (target: Element, onResizeCallback: ResizeObserverCallback) => void
}

let resizeObserverInstance: TResizeObserverInstance

const getResizeObserverInstance = () => {
    const isBrowser = getIsBrowser()

    if (!isBrowser) {
        return
    }

    if (resizeObserverInstance) {
        return resizeObserverInstance
    }

    const onResizeCallbacksMap = new Map<Element, Set<ResizeObserverCallback>>()

    const roObserver = new ResizeObserver((entries, observer) => {
        for (const entry of entries) {
            const targetElement = entry.target
            const observedElementCallbacksSet = onResizeCallbacksMap.get(targetElement)

            if (observedElementCallbacksSet)
                for (const onResizeCallback of observedElementCallbacksSet) {
                    onResizeCallback([entry], observer)
                }
        }
    })

    resizeObserverInstance = {
        observer: roObserver,
        subscribe(target, onResizeCallback) {
            const observedElementCallbacksSet = onResizeCallbacksMap.get(target)

            if (observedElementCallbacksSet) {
                observedElementCallbacksSet.add(onResizeCallback)
            } else {
                const newCallbacksSet = new Set<ResizeObserverCallback>()

                newCallbacksSet.add(onResizeCallback)

                onResizeCallbacksMap.set(target, newCallbacksSet)
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

export type TUseResizeObserverTarget<T extends Element> = RefObject<T> | T | null

/**
 * useResizeObserver is an drop in replacement for ResizeObserver.
 * @beta This hook is in beta and may change in the future.
 * @param target - An element to observe
 * @param callbackFn - A callback to execute on resize
 */
function useResizeObserver<T extends Element>(
    target: TUseResizeObserverTarget<T>,
    callbackFunction: ResizeObserverCallback
) {
    const resizeObserver = getResizeObserverInstance()
    const onResizeCallback = useEffectEvent(callbackFunction)

    useEffect(() => {
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

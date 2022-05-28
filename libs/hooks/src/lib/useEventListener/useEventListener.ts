import { useEffect, useMemo } from 'react'

import { useEvent } from '../useEvent/useEvent'

// function useEventListener<DET extends keyof DocumentEventMap>(
//     target: Document | null | undefined,
//     eventType: DET,
//     listener: (this: Document, evt: DocumentEventMap[DET]) => void,
//     options?: boolean | AddEventListenerOptions
// ): void

// function useEventListener<HET extends keyof HTMLElementEventMap>(
//     target: HTMLElement | null | undefined,
//     eventType: HET,
//     listener: (this: HTMLElement, evt: HTMLElementEventMap[HET]) => void,
//     options?: boolean | AddEventListenerOptions
// ): void

// function useEventListener<WET extends keyof WindowEventMap>(
//     target: Window | null | undefined,
//     eventType: WET,
//     listener: (this: Window, evt: WindowEventMap[WET]) => void,
//     options?: boolean | AddEventListenerOptions
// ): void

// function useEventListener(
//     target: Document | HTMLElement | Window | null | undefined,
//     eventType: string,
//     listener: (evt: Event) => void,
//     options?: boolean | AddEventListenerOptions
// ): void

// function useEventListener<
//     DET extends keyof DocumentEventMap,
//     HET extends keyof HTMLElementEventMap,
//     WET extends keyof WindowEventMap
// >(
//     target: Document | HTMLElement | Window | null | undefined,
//     eventType: DET | HET | WET | string,
//     listener: (
//         this: typeof target,
//         evt: DocumentEventMap[DET] | HTMLElementEventMap[HET] | WindowEventMap[WET] | Event
//     ) => void,
//     options?: boolean | AddEventListenerOptions
// ): void {
//     const eventHandler = useEvent(listener)

//     useEffect(() => {
//         if (target && eventHandler) {
//             target.addEventListener(eventType, eventHandler, options)
//         }

//         return () => {
//             if (target && eventHandler) {
//                 target.removeEventListener(eventType, eventHandler, options)
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [target, eventType, eventHandler])
// }

// export { useEventListener }

const useEventListener = <T extends EventTarget>(target: T, ...listenerParams: Parameters<T['addEventListener']>) => {
    const eventType = listenerParams[0]
    const listener = listenerParams[1]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const options = useMemo(() => listenerParams[2], [listenerParams[2]])

    const eventHandler = useEvent(function (this: T, ...args) {
        if (typeof listener === 'function') {
            Reflect.apply(listener, this, args)
        } else if (listener) {
            Reflect.apply(listener.handleEvent, this, args)
        }
    })

    useEffect(() => {
        if (target && eventType && eventHandler) {
            target.addEventListener(eventType, eventHandler, options)
        }

        return () => {
            if (target && eventType && eventHandler) {
                target.removeEventListener(eventType, eventHandler, options)
            }
        }
    }, [eventHandler, target, eventType])
}

export { useEventListener }

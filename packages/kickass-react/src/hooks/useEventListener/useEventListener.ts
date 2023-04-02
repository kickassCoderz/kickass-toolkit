import { RefObject, useEffect, useMemo } from 'react'

import { useEffectEvent } from '../useEffectEvent/useEffectEvent'

// List all `EventMap` types here.
export type DOMEventMapDefinitions = [
    [AbortSignal, AbortSignalEventMap],
    [AbstractWorker, AbstractWorkerEventMap],
    [Animation, AnimationEventMap],
    [AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap],
    [AudioWorkletNode, AudioWorkletNodeEventMap],
    [BaseAudioContext, BaseAudioContextEventMap],
    [BroadcastChannel, BroadcastChannelEventMap],
    [Document, DocumentEventMap],
    // [DocumentAndElementEventHandlers, DocumentAndElementEventHandlersEventMap],
    [Element, ElementEventMap],
    [EventSource, EventSourceEventMap],
    [FileReader, FileReaderEventMap],
    [GlobalEventHandlers, GlobalEventHandlersEventMap],
    [HTMLBodyElement, HTMLBodyElementEventMap],
    [HTMLElement, HTMLElementEventMap],
    [HTMLMediaElement, HTMLMediaElementEventMap],
    [IDBDatabase, IDBDatabaseEventMap],
    [IDBOpenDBRequest, IDBOpenDBRequestEventMap],
    [IDBRequest, IDBRequestEventMap],
    [IDBTransaction, IDBTransactionEventMap],
    [MediaDevices, MediaDevicesEventMap],
    [MediaKeySession, MediaKeySessionEventMap],
    [MediaQueryList, MediaQueryListEventMap],
    [MediaSource, MediaSourceEventMap],
    [MediaStream, MediaStreamEventMap],
    [MediaStreamTrack, MediaStreamTrackEventMap],
    [MessagePort, MessagePortEventMap],
    [Notification, NotificationEventMap],
    [OfflineAudioContext, OfflineAudioContextEventMap],
    [PaymentRequest, PaymentRequestEventMap],
    [Performance, PerformanceEventMap],
    [PermissionStatus, PermissionStatusEventMap],
    [RTCDTMFSender, RTCDTMFSenderEventMap],
    [RTCDataChannel, RTCDataChannelEventMap],
    [RTCDtlsTransport, RTCDtlsTransportEventMap],
    [RTCPeerConnection, RTCPeerConnectionEventMap],
    [SVGElement, SVGElementEventMap],
    [SVGSVGElement, SVGSVGElementEventMap],
    [ScreenOrientation, ScreenOrientationEventMap],
    [ServiceWorker, ServiceWorkerEventMap],
    [ServiceWorkerContainer, ServiceWorkerContainerEventMap],
    [ServiceWorkerRegistration, ServiceWorkerRegistrationEventMap],
    [SourceBuffer, SourceBufferEventMap],
    [SourceBufferList, SourceBufferListEventMap],
    [SpeechSynthesis, SpeechSynthesisEventMap],
    [SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap],
    [TextTrack, TextTrackEventMap],
    [TextTrackCue, TextTrackCueEventMap],
    [TextTrackList, TextTrackListEventMap],
    [WebSocket, WebSocketEventMap],
    [Window, WindowEventMap],
    [WindowEventHandlers, WindowEventHandlersEventMap],
    [Worker, WorkerEventMap],
    [XMLHttpRequest, XMLHttpRequestEventMap],
    [XMLHttpRequestEventTarget, XMLHttpRequestEventTargetEventMap]
]

type MapDefinitionToEventMap<D, T> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [K in keyof D]: D[K] extends [any, any] ? (T extends D[K][0] ? D[K][1] : never) : never
}
type GetDOMEventMaps<T> = MapDefinitionToEventMap<DOMEventMapDefinitions, T>

type MapEventMapsToKeys<D> = { [K in keyof D]: D[K] extends never ? never : keyof D[K] }
type MapEventMapsToEvent<D, T extends PropertyKey> = {
    [K in keyof D]: D[K] extends never ? never : T extends keyof D[K] ? D[K][T] : never
}

interface GenericEventListener<T> {
    (event: T): void
}

interface GenericEventListenerObject<T> {
    handleEvent(object: T): void
}

type GenericEventListenerOrEventListenerObject<T> = GenericEventListener<T> | GenericEventListenerObject<T>

export type TUseEventListenerOptions = boolean | AddEventListenerOptions | undefined

/**
 * Drop in replacement for addEventListener as a React hook
 * @beta This hook is in beta and may change in the future.
 * @param target - an EventTarget on which listener will be attached
 * @param eventType - a type of event, for example "click"
 * @param listener - an object which recieves notification when event occures. It can be a function or EventListenerObject.
 * @param options - an event listener options. {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#parameters | See on MDN}
 */
function useEventListener<
    T extends EventTarget,
    K extends MapEventMapsToKeys<M>[number] & string,
    M extends GetDOMEventMaps<T>
>(
    target: RefObject<T> | T | null | undefined,
    eventType: K,
    listener: GenericEventListenerOrEventListenerObject<MapEventMapsToEvent<M, K>[number]>,
    options?: TUseEventListenerOptions
) {
    const eventHandler = useEffectEvent(function (this: T, ...arguments_) {
        if (typeof listener === 'function') {
            Reflect.apply(listener, this, arguments_)
        } else if (typeof listener?.handleEvent === 'function') {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            Reflect.apply(listener.handleEvent, this, arguments_)
        }
    })

    const { once, passive, signal }: AddEventListenerOptions = typeof options === 'object' ? options : {}

    let eventOptions: boolean | AddEventListenerOptions | undefined = useMemo(() => {
        const computedOptions: AddEventListenerOptions = {}

        if (once !== undefined) {
            computedOptions.once = once
        }

        if (passive !== undefined) {
            computedOptions.passive = passive
        }

        if (signal !== undefined) {
            computedOptions.signal = signal
        }

        return Object.keys(computedOptions).length > 0 ? computedOptions : undefined
    }, [once, passive, signal])

    if (typeof options === 'boolean') {
        eventOptions = options
    }

    useEffect(() => {
        const targetElement = target && 'current' in target ? target.current : target

        if (targetElement && eventType && eventHandler) {
            targetElement.addEventListener(eventType, eventHandler, eventOptions)
        }

        return () => {
            if (targetElement && eventType && eventHandler) {
                targetElement.removeEventListener(eventType, eventHandler, eventOptions)
            }
        }
    }, [eventHandler, target, eventType, eventOptions])
}

export { useEventListener }

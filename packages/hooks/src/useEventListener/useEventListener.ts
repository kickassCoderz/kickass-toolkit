import { RefObject, useEffect, useMemo } from 'react'

import { useEvent } from '../useEvent/useEvent'

// List all `EventMap` types here.
type DOMEventMapDefinitions = [
    [AbortSignal, AbortSignalEventMap],
    [AbstractWorker, AbstractWorkerEventMap],
    [Animation, AnimationEventMap],
    [AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap],
    [AudioWorkletNode, AudioWorkletNodeEventMap],
    [BaseAudioContext, BaseAudioContextEventMap],
    [BroadcastChannel, BroadcastChannelEventMap],
    [Document, DocumentEventMap],
    [DocumentAndElementEventHandlers, DocumentAndElementEventHandlersEventMap],
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
    [K in keyof D]: D[K] extends [any, any] ? (T extends D[K][0] ? D[K][1] : never) : never
}
type GetDOMEventMaps<T> = MapDefinitionToEventMap<DOMEventMapDefinitions, T>

type MapEventMapsToKeys<D> = { [K in keyof D]: D[K] extends never ? never : keyof D[K] }
type MapEventMapsToEvent<D, T extends PropertyKey> = {
    [K in keyof D]: D[K] extends never ? never : T extends keyof D[K] ? D[K][T] : never
}

interface GenericEventListener<T> {
    (evt: T): void
}

interface GenericEventListenerObject<T> {
    handleEvent(object: T): void
}

type GenericEventListenerOrEventListenerObject<T> = GenericEventListener<T> | GenericEventListenerObject<T>

/**
 * Drop in replacement for addEventListener as a React hook
 *
 * @template T
 * @template K
 * @template M
 * @param {(RefObject<T> | T | null | undefined)} target
 * @param {K} eventType
 * @param {GenericEventListenerOrEventListenerObject<MapEventMapsToEvent<M, K>[number]>} listener
 * @param {(boolean | AddEventListenerOptions | undefined)} [options]
 */
const useEventListener = <
    T extends EventTarget,
    K extends MapEventMapsToKeys<M>[number] & string,
    M extends GetDOMEventMaps<T>
>(
    target: RefObject<T> | T | null | undefined,
    eventType: K,
    listener: GenericEventListenerOrEventListenerObject<MapEventMapsToEvent<M, K>[number]>,
    options?: boolean | AddEventListenerOptions | undefined
) => {
    const eventHandler = useEvent(function (this: T, ...args) {
        if (typeof listener === 'function') {
            Reflect.apply(listener, this, args)
        } else if (typeof listener?.handleEvent === 'function') {
            Reflect.apply(listener.handleEvent, this, args)
        }
    })

    const { once, passive, signal }: AddEventListenerOptions = typeof options === 'object' ? options : {}

    let eventOptions: boolean | AddEventListenerOptions | undefined = useMemo(() => {
        const computedOptions: AddEventListenerOptions = {}

        if (typeof once !== 'undefined') {
            computedOptions.once = once
        }

        if (typeof passive !== 'undefined') {
            computedOptions.passive = passive
        }

        if (typeof signal !== 'undefined') {
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

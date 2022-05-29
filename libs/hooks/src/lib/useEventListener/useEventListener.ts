import { useEffect } from 'react'

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

// Works for all types listed in `DOMEventMapDefinitions` and any types that are assingable to those types.
const useEventListener = <
    T extends EventTarget,
    K extends MapEventMapsToKeys<M>[number] & string,
    M extends GetDOMEventMaps<T>
>(
    target: T | null | undefined,
    eventType: K,
    listener: GenericEventListenerOrEventListenerObject<MapEventMapsToEvent<M, K>[number]>,
    options?: boolean | AddEventListenerOptions | undefined
) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [eventHandler, target, eventType])
}

export { useEventListener }

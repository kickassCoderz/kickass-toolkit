import { useCallback, useRef } from 'react'

export type TUseElementReferenceWithCallbackOptions<T extends Element> = {
    onMount?: (node: T) => void
    onUnmount?: (node: T) => void
}

/**
 * Sets a ref via callback and provides onMount and onUnmount subscription.
 * @beta This hook is in beta and may change in the future.
 * @param options - An object containing the `onMount` and `onUnmount` callbacks.
 * @returns A reference callback.
 */
function useElementReferenceWithCallback<T extends Element>(options: TUseElementReferenceWithCallbackOptions<T>) {
    const nodeReference = useRef<T | null>(null)

    const { onMount, onUnmount } = options || {}

    const referenceCallback = useCallback<React.RefCallback<T>>(
        node => {
            if (nodeReference.current && onUnmount) {
                onUnmount(nodeReference.current)
            }

            nodeReference.current = node

            if (nodeReference.current && onMount) {
                onMount(nodeReference.current)
            }
        },
        [onMount, onUnmount]
    )

    return referenceCallback
}
export { useElementReferenceWithCallback }

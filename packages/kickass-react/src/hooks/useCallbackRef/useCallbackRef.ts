import { useCallback, useState } from 'react'

/**
 * Set a ref via callback and provides ractive state.
 * @see {@link https://reactjs.org/docs/refs-and-the-dom.html#callback-refs| Official docs}
 *
 */
const useCallbackReference = <T extends Element>() => {
    const [reference, setReference] = useState<T | null>(null)

    const referenceCallback = useCallback<React.RefCallback<T>>(node => {
        setReference(node)
    }, [])

    return [reference, referenceCallback] as const
}

export { useCallbackReference as useCallbackRef }

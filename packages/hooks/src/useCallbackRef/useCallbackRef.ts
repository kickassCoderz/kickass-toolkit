import { useCallback, useState } from 'react'

/**
 * Set a ref via callback and provides ractive state.
 * @see {@link https://reactjs.org/docs/refs-and-the-dom.html#callback-refs| Official docs}
 *
 */
const useCallbackRef = <T extends Element>() => {
    const [ref, setRef] = useState<T | null>(null)

    const refCallback = useCallback<React.RefCallback<T>>(node => {
        setRef(node)
    }, [])

    return [ref, refCallback] as const
}

export { useCallbackRef }

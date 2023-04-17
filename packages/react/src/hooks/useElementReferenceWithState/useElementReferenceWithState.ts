import { useCallback, useState } from 'react'

/**
 * Sets a ref via callback and provides reactive node reference.
 * @beta This hook is in beta and may change in the future.
 * @returns A tuple of the reference and the reference callback.
 */
function useElementReferenceWithState<T extends Element>() {
    // eslint-disable-next-line unicorn/no-null
    const [reference, setReference] = useState<T | null>(null)

    const referenceCallback = useCallback<React.RefCallback<T>>(node => {
        setReference(node)
    }, [])

    return [reference, referenceCallback] as const
}

export { useElementReferenceWithState }

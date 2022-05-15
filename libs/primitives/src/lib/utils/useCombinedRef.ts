import { useCallback } from 'react'

const combineRefs = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
    return (node: T) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref !== null && ref !== undefined) {
                ;(ref as React.MutableRefObject<T>).current = node
            }
        })
    }
}

const useCombinedRef = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(combineRefs<T>(...refs), refs)
}

export { combineRefs, useCombinedRef }

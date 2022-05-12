import { useCallback } from 'react'

const useCombinedRef = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
    return useCallback(
        (node: T) => {
            refs.forEach(ref => {
                if (typeof ref === 'function') {
                    ref(node)
                } else if (ref !== null && ref !== undefined) {
                    ;(ref as React.MutableRefObject<T>).current = node
                }
            })
        },
        [refs]
    )
}

export { useCombinedRef }

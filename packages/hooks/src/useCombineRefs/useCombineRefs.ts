import { useEvent } from '../useEvent'

const combineRefs = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
    return (node: T) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(node)
            } else if (ref !== null && ref !== undefined) {
                const mutableRef = ref as React.MutableRefObject<T> // fuck typescript
                mutableRef.current = node
            }
        })
    }
}

/**
 * Creates a callback that combines all the given refs into single one.
 *
 * Each ref provided to this hook will be passed the ref prop on the target element.
 *
 *
 * @param refs A refs to combine
 * @returns ref callback
 */
const useCombineRefs = <T>(...refs: React.Ref<T>[]): React.RefCallback<T> => {
    return useEvent(combineRefs<T>(...refs))
}

export { combineRefs, useCombineRefs }

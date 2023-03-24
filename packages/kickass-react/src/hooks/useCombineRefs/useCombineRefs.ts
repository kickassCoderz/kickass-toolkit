import { useCallback } from 'react'

export type TCombineRefsMaybeRef<T> = React.Ref<T> | undefined

/**
 * Sets value to provided ref.
 *
 * @remarks It can handle ref callback and ref objects.
 */
const setRef = <T>(ref: TCombineRefsMaybeRef<T>, value: T): void => {
    if (typeof ref === 'function') {
        ref(value)
    } else if (ref !== null && ref !== undefined) {
        ;(ref as React.MutableRefObject<T>).current = value
    }
}

/**
 * Accepts callback refs and ref objects, combines them together, and returns single ref callback
 *
 * @remarks Each ref provided to this hook will be passed the ref prop on the target element.
 */
const combineRefs = <T>(...refs: Array<TCombineRefsMaybeRef<T>>): React.RefCallback<T> => {
    return (node: T) => refs.forEach(ref => setRef(ref, node))
}

/**
 * Accepts callback refs and ref objects, combines them together, and returns single ref callback
 *
 * @remarks Each ref provided to this hook will be passed the ref prop on the target element.
 */
const useCombineRefs = <T>(...refs: Array<TCombineRefsMaybeRef<T>>): React.RefCallback<T> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(combineRefs(...refs), refs)
}

export { combineRefs, useCombineRefs }

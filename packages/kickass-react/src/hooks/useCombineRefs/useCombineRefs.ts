import { useCallback } from 'react'

export type TCombineRefsMaybeRef<T> = React.Ref<T> | undefined

/**
 * Sets value to provided ref.
 *
 * @remarks It can handle ref callback and ref objects.
 */
const setReference = <T>(reference: TCombineRefsMaybeRef<T>, value: T): void => {
    if (typeof reference === 'function') {
        reference(value)
    } else if (reference !== null && reference !== undefined) {
        ;(reference as React.MutableRefObject<T>).current = value
    }
}

/**
 * Accepts callback refs and ref objects, combines them together, and returns single ref callback
 *
 * @remarks Each ref provided to this hook will be passed the ref prop on the target element.
 */
const combineReferences = <T>(...references: Array<TCombineRefsMaybeRef<T>>): React.RefCallback<T> => {
    return (node: T) => {
        for (const reference of references) setReference(reference, node)
    }
}

/**
 * Accepts callback refs and ref objects, combines them together, and returns single ref callback
 *
 * @remarks Each ref provided to this hook will be passed the ref prop on the target element.
 */
const useCombineReferences = <T>(...references: Array<TCombineRefsMaybeRef<T>>): React.RefCallback<T> => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(combineReferences(...references), references)
}

export { combineReferences as combineRefs, useCombineReferences as useCombineRefs }

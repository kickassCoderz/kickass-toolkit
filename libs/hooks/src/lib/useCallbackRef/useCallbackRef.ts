import { useState } from 'react'

import { useEvent } from '../useEvent'

//@TODO: find out why TS doesnt return valid tuple when calling useCallbackRef

const useCallbackRef = <T extends Element>() => {
    const [ref, setRef] = useState<T | null>(null)

    const refCallback = useEvent((node: T | null) => {
        setRef(node)
    })

    return [ref, refCallback] as const
}

export { useCallbackRef }

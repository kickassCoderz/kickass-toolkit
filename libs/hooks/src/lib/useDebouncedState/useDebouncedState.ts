import { useState } from 'react'

import { useDebouncedCallback } from '../useDebouncedCallback'

const useDebouncedState = <T>(initialState: T | (() => T), delay: number) => {
    const [state, setter] = useState(initialState)

    const [setState, clear] = useDebouncedCallback(setter, delay)

    return [state, setState, clear] as const
}

export { useDebouncedState }

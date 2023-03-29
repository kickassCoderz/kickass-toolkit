import { useCallback } from 'react'

import { useToggle } from '../useToggle/useToggle'

/**
 * A simple apstraction over `useToggle` to provide a rerender function. Useful for when you want to force a component to rerender.
 * @returns A function which can be called to force a rerender.
 */
function useRerender() {
    const toggleState = useToggle()

    const toggle = toggleState[1]

    const rerender = useCallback(() => {
        toggle()
    }, [toggle])

    return rerender
}

export { useRerender }

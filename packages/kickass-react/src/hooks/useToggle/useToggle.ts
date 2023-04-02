import { useCallback, useState } from 'react'

/**
 * A simple apstraction over `useState` to provide a toggle function. Because DRY.
 * @param defaultValue - The default value of the toggle. It can be a boolean or function which returns boolean. Defaults to false.
 * @returns A tuple of the current value and a toggle function.
 */
function useToggle(defaultValue: boolean | (() => boolean) = false) {
    const [isToggled, setIsToggled] = useState(!!defaultValue)

    const toggle = useCallback((nextValue?: boolean) => {
        if (typeof nextValue === 'boolean') {
            setIsToggled(nextValue)
        } else {
            setIsToggled(previous => !previous)
        }
    }, [])

    return [isToggled, toggle] as const
}

export { useToggle }

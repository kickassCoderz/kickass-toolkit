export type TShowProperties<T> = {
    /**
     * A provided value which will be evaluated. Must be truthy to render `children`.
     */
    when: T
    /**
     * A element which will be rendered when the `when` condition is falsy.
     */
    fallback?: JSX.Element | null
    /**
     * A element which will be rendered when the `when` condition is truthy.
     */
    children: JSX.Element
}

/**
 * Conditionally renders part of the view. It renders `children` when the `when` condition is truthy or `fallback` if provided.
 * Think of it as ternary operator(`when ? children : fallback`) but in JSX.
 *
 * @example
 * Show different screens based on some state:
 * ```tsx
 * const MyComponent = () => {
 * const [isActive,setIsActive] = useState(false)
 *
 * return <Show when={isActive} fallback={<div>Inactive screen</div>}>
 *   <div>Active screen</div>
 * </Show>
 * }
 * ```
 */

function Show<T>(properties: TShowProperties<T>) {
    // eslint-disable-next-line unicorn/no-null
    const { when, fallback = null, children } = properties

    return when ? children : fallback
}

export { Show }

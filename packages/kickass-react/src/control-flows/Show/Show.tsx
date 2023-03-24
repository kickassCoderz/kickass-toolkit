export type TShowProperties<T> = {
    /**
     * A provided value which will be evaluated.
     */
    when: T
    /**
     * A `ReactNode` which will be rendered when the `when` condition is falsy.
     */
    fallback?: React.ReactNode
    /**
     * A `ReactNode` or `renderFn` which will be called with evaluated value of `when`.
     */
    children: React.ReactNode | ((item: NonNullable<T>) => JSX.Element)
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
 *```
 * @example
 * You can use `renderFn` and scope evaluated data:
 * ```tsx
 * type TPerson = {
 *   name: string
 *   age: number
 * }
 *
 * type TProperties = {
 *   state?: {
 *   person: TPerson
 *  }
 * }
 *
 * const MyComponent = ({ state }: TProperties) => {
 *   return (
 *      <Show when={state?.person} fallback={<div>No Person</div>}>
 *          {person => {
 *             return <div>{person.age}</div>
 *        }}
 *   </Show>
 *  )
 * }
 *
 * ```
 */
function Show<T>({ when, fallback, children }: TShowProperties<T>) {
    if (when && children) {
        return typeof children === 'function' ? children(when) : <>{children}</>
    }

    //@TODO: Fix me when react fixes its types
    // eslint-disable-next-line unicorn/no-null
    return fallback ? <>{fallback}</> : null
}

export { Show }

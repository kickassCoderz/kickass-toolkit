import { resolveSwitchChildren } from './switchUtils'

export type TMatchProperties<T> = {
    /**
     * The value to match against. It has to be truthy for the child to be rendered.
     */
    when: T
    /**
     * The child to render if `when` is truthy.
     */
    children: JSX.Element
}

/**
 * A direct child of `Switch` that renders `children` if `when` is truthy.
 * @beta This component is in beta and may change in the future.
 * @param properties - Properties
 */
function Match<T>(properties: TMatchProperties<T>) {
    return properties as unknown as JSX.Element
}

export type TSwitchChild = React.ReactElement<TMatchProperties<never>, typeof Match>

export type TSwitchChildArray = Array<TSwitchChild>

export type TSwitchChildren = TSwitchChild | TSwitchChildArray

export type TSwitchProperties = {
    /**
     * The child to render if no `Match` children match. Defaults to `null`.
     */
    fallback?: JSX.Element | null
    /**
     * The children to render. To work properly it should only be `Match` components. Only the first `Match` child that matches `when` will be rendered.
     */
    children: TSwitchChildren
}

/**
 * Renders the first `Match` child that matches `when` or `fallback` if no `Match` children match.
 * @beta This component is in beta and may change in the future.
 * @param properties - Properties
 * @returns First `Match` child that matches `when` or `fallback` if no `Match` children match.
 * @example
 * Implement a simple routing:
 * ```tsx
 * <Switch fallback={<div>Not found</div>}>
 *     <Match when={path === '/'}>
 *         <Home />
 *     </Match>
 *    <Match when={path === '/about'}>
 *        <About />
 *    </Match>
 * </Switch>
 *```
 */
function Switch(properties: TSwitchProperties) {
    // eslint-disable-next-line unicorn/no-null
    const { fallback = null, children } = properties

    const match = resolveSwitchChildren(children)

    return match ?? fallback
}

export { Match, Switch }

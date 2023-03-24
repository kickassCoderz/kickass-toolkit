import  { forwardRef } from 'react'

export type MakeRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Merge<T, U> = Omit<T, keyof U> & U

export type TDynamicAsProperty<C extends React.ElementType> = {
    /**
     * Any valid `React` component or `JSX` element.
     *
     * @example
     * With native react component:
     * ```
     * <Dynamic component="a" href="https://kickass-coderz.com">Kickass Coderz</Dynamic>
     * ```
     * @example
     * With custom react component:
     * ```tsx
     * <Dynamic component={MyButton} color="red">Click me</Dynamic>
     * ```
     * @example
     * This wont render as `component` prop is not provided::
     * ```tsx
     * <Dynamic>Kickass Coderz</Dynamic>
     * ```
     *
     */
    component?: C
}

// Get the properties and omit what should be omited based on provided props
export type TDynamicProperties<C extends React.ElementType, Properties = unknown> = React.PropsWithChildren<
    Properties & TDynamicAsProperty<C>
> &
    Merge<React.ComponentPropsWithoutRef<C>, TDynamicAsProperty<C> & Properties>

// Extract ref
export type TDynamicReference<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

// Same as TDynamicProperties but extracted ref is also attached
export type TDynamicPropertiesWithReference<C extends React.ElementType, Properties = unknown> = TDynamicProperties<
    C,
    Properties
> & {
    ref?: TDynamicReference<C>
}

// Dynamic Component Types

export type TDynamicComponent = <C extends React.ElementType>(
    properties: TDynamicPropertiesWithReference<C>
) => React.ReactElement | null

/**
 * A primitive polymorphic component that can be used to render any valid react component. All `props` and `ref` are passed to the component and are properly infered.
 * @param properties - All `props` and `ref` for given `component` prop. `component` prop is required.
 *
 * @example
 * Render an `anchor` element:
 * ```tsx
 * <Dynamic component="a" href="https://kickass-coderz.com">Kickass Coderz</Dynamic>
 * ```
 *
 * @example
 * Render a custom component:
 * ```tsx
 * <Dynamic component={MyButton} color="red">Click me</Dynamic>
 * ```
 *
 *@example
 * This wont render as `component` prop is not provided:
 * ```tsx
 * <Dynamic>Kickass Coderz</Dynamic>
 * ```
 */
const _Dynamic: TDynamicComponent = forwardRef(function Dynamic<C extends React.ElementType>(
    { component, children, ...rest }: TDynamicProperties<C>,
    reference?: TDynamicReference<C>
) {
    if (!component) {
        //@TODO: Fix me when this is resolved https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/64800
        // eslint-disable-next-line unicorn/no-null
        return null
    }

    const Component = component as unknown as React.ElementType

    return (
        <Component ref={reference} {...rest}>
            {children}
        </Component>
    )
})

export { _Dynamic as Dynamic }

type Merge<T, U> = Omit<T, keyof U> & U

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T }

export type PolymorphicPropsWithoutRef<P, T extends React.ElementType> = Merge<
    T extends keyof JSX.IntrinsicElements
        ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
        : React.ComponentPropsWithoutRef<T>,
    PropsWithAs<P, T>
>

export type PolymorphicPropsWithRef<P, T extends React.ElementType> = Merge<
    T extends keyof JSX.IntrinsicElements
        ? React.PropsWithRef<JSX.IntrinsicElements[T]>
        : React.ComponentPropsWithRef<T>,
    PropsWithAs<P, T>
>

type PolymorphicExoticComponent<P = Record<string, unknown>, T extends React.ElementType = React.ElementType> = Merge<
    React.ExoticComponent<P & { [key: string]: unknown }>,
    {
        /**
         * **NOTE**: Exotic components are not callable.
         */
        <InstanceT extends React.ElementType = T>(
            props: PolymorphicPropsWithRef<P, InstanceT>
        ): React.ReactElement | null
    }
>

//@NOTE: All underneath this comment wont be required when TS team resolves https://github.com/microsoft/TypeScript/issues/30134
export type PolymorphicForwardRefExoticComponent<P, T extends React.ElementType> = Merge<
    React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
    PolymorphicExoticComponent<P, T>
>

export type PolymorphicMemoExoticComponent<P, T extends React.ElementType> = Merge<
    React.MemoExoticComponent<React.ComponentType<any>>,
    PolymorphicExoticComponent<P, T>
>

export type PolymorphicLazyExoticComponent<P, T extends React.ElementType> = Merge<
    React.LazyExoticComponent<React.ComponentType<any>>,
    PolymorphicExoticComponent<P, T>
>

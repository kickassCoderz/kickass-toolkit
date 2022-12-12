import { createElement, forwardRef } from 'react'

import { useExtractSprinklesProps } from '../../../hooks'
import { mergeClasses } from '../../../internal'
import type { TKAUISprinklesProps } from '../../../theme/createKickassSprinkles'
import type {
    PolymorphicForwardRefExoticComponent,
    PolymorphicPropsWithoutRef,
    PolymorphicPropsWithRef
} from './polymorphic-types'

const BOX_DEFAULT_ELEMENT = 'div'

type TBoxOwnProps = TKAUISprinklesProps & {
    baseClassName?: string
}

export type TKAUIBoxProps<T extends React.ElementType = typeof BOX_DEFAULT_ELEMENT> = PolymorphicPropsWithRef<
    TBoxOwnProps,
    T
>

const Box: PolymorphicForwardRefExoticComponent<TBoxOwnProps, typeof BOX_DEFAULT_ELEMENT> = forwardRef(
    <T extends React.ElementType = typeof BOX_DEFAULT_ELEMENT>(
        { as, className, baseClassName, ...restProps }: PolymorphicPropsWithoutRef<TBoxOwnProps, T>,
        ref: React.ForwardedRef<Element>
    ) => {
        const Element: React.ElementType = as || BOX_DEFAULT_ELEMENT

        const { otherProps, sprinklesClassName } = useExtractSprinklesProps(restProps)

        return createElement(Element, {
            ...otherProps,
            ref,
            className: mergeClasses(baseClassName, sprinklesClassName, className)
        })
    }
)

Box.displayName = 'KAUI-Box'

export { Box }

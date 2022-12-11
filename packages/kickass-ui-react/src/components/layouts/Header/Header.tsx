import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import type { TKAUIHeaderRecipe } from './header.css'
import { headerRecipe } from './header.css'

export type THeaderProps = Omit<React.ComponentPropsWithRef<'header'>, 'color'> & TKAUIHeaderRecipe

const Header = forwardRef<HTMLElement, THeaderProps>(
    (
        {
            children,
            className,
            position = 'static',
            isCondensed = false,
            isElevated = false,
            justifyContent = 'center',
            color = 'surface',
            ...rest
        },
        ref
    ) => {
        return (
            <header
                {...rest}
                ref={ref}
                className={mergeClasses(
                    headerRecipe({ position, isCondensed, isElevated, justifyContent, color }),
                    className
                )}
            >
                {children}
            </header>
        )
    }
)

Header.displayName = 'KAUI-Header'

export { Header }

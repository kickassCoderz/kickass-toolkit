import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import type { TKAUIFooterRecipe } from './footer.css'
import { footerRecipe } from './footer.css'

export type TFooterProps = Omit<React.ComponentPropsWithRef<'footer'>, 'color'> & TKAUIFooterRecipe

const Footer = forwardRef<HTMLElement, TFooterProps>(
    (
        {
            children,
            className,
            isCondensed = false,
            justifyContent = 'center',
            color = 'surface',
            position = 'static',
            ...rest
        },
        ref
    ) => {
        return (
            <footer
                {...rest}
                ref={ref}
                className={mergeClasses(footerRecipe({ isCondensed, justifyContent, color, position }), className)}
            >
                {children}
            </footer>
        )
    }
)

Footer.displayName = 'KAUI-Footer'

export { Footer }

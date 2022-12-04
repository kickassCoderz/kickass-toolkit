import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import type { TLinkButtonBlueprint } from './link-button.css'
import { linkButtonBlueprint } from './link-button.css'

export type TLinkButtonProps = Omit<React.ComponentPropsWithRef<'a'>, 'color'> & TLinkButtonBlueprint

const LinkButton = forwardRef<HTMLAnchorElement, TLinkButtonProps>(
    (
        {
            children,
            className,
            shape = 'rounded',
            size = 'md',
            variant = 'solid',
            color = 'primary',
            fullWidth = false,
            ...rest
        },
        ref
    ) => {
        return (
            <a
                ref={ref}
                className={mergeClasses(linkButtonBlueprint({ shape, size, variant, color, fullWidth }), className)}
                {...rest}
            >
                {children}
            </a>
        )
    }
)
LinkButton.displayName = 'LinkButton'

export { LinkButton }

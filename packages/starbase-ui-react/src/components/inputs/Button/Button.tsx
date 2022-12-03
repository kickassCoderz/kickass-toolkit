import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import type { TButtonBlueprint } from './button.css'
import { buttonBlueprint } from './button.css'

export type TButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'color'> & TButtonBlueprint

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
    (
        {
            children,
            shape = 'rounded',
            size = 'md',
            variant = 'solid',
            color = 'primary',
            fullWidth = false,
            className,
            ...rest
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={mergeClasses(buttonBlueprint({ shape, size, variant, color, fullWidth }), className)}
                {...rest}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }

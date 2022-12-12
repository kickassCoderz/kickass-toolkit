import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import type { TKAUIButtonRecipe } from './button.css'
import { buttonRecipe } from './button.css'

export type TKAUIButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'color'> & TKAUIButtonRecipe

const Button = forwardRef<HTMLButtonElement, TKAUIButtonProps>(
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
                {...rest}
                ref={ref}
                className={mergeClasses(buttonRecipe({ shape, size, variant, color, fullWidth }), className)}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'KAUI-Button'

export { Button }

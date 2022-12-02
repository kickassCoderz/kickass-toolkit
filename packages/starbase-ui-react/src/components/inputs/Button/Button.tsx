import { forwardRef } from 'react'

import type { TButtonBlueprint } from './button.css'
import { buttonBlueprint } from './button.css'

type TButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'color'> & TButtonBlueprint

const Button = forwardRef<HTMLButtonElement, TButtonProps>(
    ({ children, shape = 'rounded', size = 'md', variant = 'solid', color = 'primary', ...rest }, ref) => {
        return (
            <button ref={ref} className={buttonBlueprint({ shape, size, variant, color })} {...rest}>
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }

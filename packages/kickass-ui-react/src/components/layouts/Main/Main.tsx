import { forwardRef } from 'react'

import { TKAUISprinklesProps } from '../../../theme/createKickassSprinkles'
import { Box } from '../../surfaces'

export type TMainProps = React.ComponentPropsWithRef<'main'> & TKAUISprinklesProps

const Main = forwardRef<HTMLElement, TMainProps>(
    ({ children, className, display = 'flex', flexDirection = 'column', flex = 'flex1', ...rest }, ref) => {
        return (
            <Box
                {...rest}
                display={display}
                flexDirection={flexDirection}
                flex={flex}
                as="main"
                ref={ref}
                className={className}
            >
                {children}
            </Box>
        )
    }
)

Main.displayName = 'KAUI-Main'

export { Main }

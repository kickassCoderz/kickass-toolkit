import { forwardRef } from 'react'

import { mergeClasses } from '../../../internal'
import { appLayoutRootStyles } from './app-layout.css'

export type TAppLayoutProps = React.ComponentPropsWithRef<'div'> & {
    children: React.ReactNode
    header?: React.ReactElement
    footer?: React.ReactElement
}

const AppLayout = forwardRef<HTMLDivElement, TAppLayoutProps>(
    ({ children, className, header, footer, ...rest }, ref) => {
        return (
            <div {...rest} ref={ref} className={mergeClasses(appLayoutRootStyles, className)}>
                {header && header}
                {children}
                {footer && footer}
            </div>
        )
    }
)

AppLayout.displayName = 'AppLayout'

export { AppLayout }

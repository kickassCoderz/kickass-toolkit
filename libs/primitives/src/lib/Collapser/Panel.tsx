import React, { forwardRef } from 'react'

import { Slot } from '../Slot'
import { useCollapserContext } from './CollapserProvider'

type TCollapserPanelViewBaseProps = React.ComponentPropsWithoutRef<'div'>

type TCollapserPanelProps = TCollapserPanelViewBaseProps & {
    asController?: boolean
}

const CollapserPanelView = forwardRef<HTMLDivElement, TCollapserPanelViewBaseProps>((props, ref) => {
    return <section ref={ref} {...props} />
})

CollapserPanelView.displayName = 'CollapserPanelView'

const CollapserPanel = forwardRef<React.ElementRef<typeof CollapserPanelView>, TCollapserPanelProps>(
    ({ asController, ...restProps }, ref) => {
        const { triggerId, panelId, dataState, isOpen, dataDisabled } = useCollapserContext()

        const Component = asController ? Slot : CollapserPanelView

        return (
            <Component
                ref={ref}
                {...restProps}
                id={panelId}
                hidden={!isOpen}
                aria-labelledby={triggerId}
                data-state={dataState}
                data-disabled={dataDisabled}
            />
        )
    }
)

CollapserPanel.displayName = 'CollapserPanel'

export { CollapserPanel }

export type { TCollapserPanelProps }

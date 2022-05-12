import React, { forwardRef } from 'react'

import { useCollapserContext } from '../Collapser/CollapserProvider'
import { Slot } from '../Slot'

type TAccordionHeaderViewProps = React.ComponentPropsWithoutRef<'h3'>

type TAccordionHeaderProps = TAccordionHeaderViewProps & {
    asController?: boolean
}

const AccordionHeaderView = forwardRef<HTMLHeadingElement, TAccordionHeaderViewProps>((props, ref) => {
    // eslint-disable-next-line jsx-a11y/heading-has-content
    return <h3 ref={ref} {...props} />
})

AccordionHeaderView.displayName = 'AccordionHeaderView'

const AccordionHeader = forwardRef<React.ElementRef<typeof AccordionHeaderView>, TAccordionHeaderProps>(
    ({ asController, ...restProps }, ref) => {
        const { dataState, dataDisabled } = useCollapserContext()

        const Component = asController ? Slot : AccordionHeaderView

        return <Component ref={ref} {...restProps} data-state={dataState} data-disabled={dataDisabled} />
    }
)

AccordionHeader.displayName = 'AccordionHeader'

export { AccordionHeader }

export type { TAccordionHeaderProps }

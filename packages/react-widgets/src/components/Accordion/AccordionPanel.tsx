import { forwardRef } from 'react'

import { ACCORDION_PANEL_NAME } from './accordion-names'
import type { TAccordionItemPanelProps } from './accordion-types'
import { EAccordionItemState } from './accordion-types'
import { useAccordionItemContext } from './AccordionItemProvider'

const AccordionPanel = forwardRef<HTMLDivElement, TAccordionItemPanelProps>(({ children, ...rest }, ref) => {
    const { isExpanded, panelId, isDisabled, buttonId } = useAccordionItemContext('AccordionPanel')

    return (
        <section
            ref={ref}
            {...rest}
            id={panelId}
            hidden={!isExpanded}
            aria-labelledby={buttonId}
            data-state={`${isExpanded ? EAccordionItemState.Expanded : EAccordionItemState.Collapsed}`}
            data-disabled={isDisabled}
        >
            {children}
        </section>
    )
})

AccordionPanel.displayName = ACCORDION_PANEL_NAME

export { AccordionPanel }

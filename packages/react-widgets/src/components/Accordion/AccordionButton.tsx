import { forwardRef } from 'react'

import { useCombineEventHandlers } from '../../internal'
import { ACCORDION_BUTTON_NAME } from './accordion-names'
import type { TAccordionItemButtonProps } from './accordion-types'
import { EAccordionItemState } from './accordion-types'
import { useAccordionItemContext } from './AccordionItemProvider'

const AccordionButton = forwardRef<HTMLButtonElement, TAccordionItemButtonProps>(
    ({ children, onClick, ...rest }, ref) => {
        const { isDisabled, isExpanded, handleExpand, buttonId, panelId } = useAccordionItemContext('AccordionButton')

        const handleClick = useCombineEventHandlers(onClick, e => {
            e.preventDefault()
            handleExpand()
        })

        return (
            <button
                ref={ref}
                {...rest}
                id={buttonId}
                disabled={isDisabled}
                aria-controls={panelId}
                aria-expanded={isExpanded}
                data-state={`${isExpanded ? EAccordionItemState.Expanded : EAccordionItemState.Collapsed}`}
                data-disabled={isDisabled}
                onClick={handleClick}
            >
                {children}
            </button>
        )
    }
)

AccordionButton.displayName = ACCORDION_BUTTON_NAME

export { AccordionButton }

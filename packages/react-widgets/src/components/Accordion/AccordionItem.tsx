import { forwardRef, useCallback } from 'react'

import { createId, useId } from '../../internal'
import { ACCORDION_ITEM_NAME } from './accordion-names'
import type { TAccordionItemProps } from './accordion-types'
import { EAccordionItemState } from './accordion-types'
import { AccordionItemProvider } from './AccordionItemProvider'
import { useAccordionContext } from './AccordionProvider'

const AccordionItem = forwardRef<HTMLLIElement, TAccordionItemProps>(
    ({ children, id, isDisabled: isDisabledOverride, ...rest }, ref) => {
        const { getIsItemExpanded, handleExpand, isDisabled } = useAccordionContext('AccordionItem')
        const buttonId = useId(id) as string
        const panelId = createId('panel', buttonId)

        const resolvedIsDisabled = isDisabledOverride ?? isDisabled

        const isExpanded = getIsItemExpanded(buttonId)

        const handleExpandChange = useCallback(() => handleExpand(buttonId), [handleExpand, buttonId])

        return (
            <AccordionItemProvider
                isDisabled={resolvedIsDisabled}
                isExpanded={isExpanded}
                handleExpand={handleExpandChange}
                buttonId={buttonId}
                panelId={panelId}
            >
                <li
                    ref={ref}
                    {...rest}
                    data-state={`${isExpanded ? EAccordionItemState.Expanded : EAccordionItemState.Collapsed}`}
                    data-disabled={isDisabled}
                >
                    {children}
                </li>
            </AccordionItemProvider>
        )
    }
)

AccordionItem.displayName = ACCORDION_ITEM_NAME

export { AccordionItem }

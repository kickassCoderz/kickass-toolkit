import { forwardRef } from 'react'

import { ACCORDION_HEADER_NAME } from './accordion-names'
import type { TAccordionItemHeaderProps } from './accordion-types'
import { EAccordionItemState } from './accordion-types'
import { useAccordionItemContext } from './AccordionItemProvider'

const AccordionHeader = forwardRef<HTMLHeadingElement, TAccordionItemHeaderProps>(
    ({ children, headingLevel = 'h3', ...rest }, ref) => {
        const { isExpanded, isDisabled } = useAccordionItemContext('AccordionHeader')

        const HeadingTag = headingLevel

        return (
            <HeadingTag
                ref={ref}
                {...rest}
                data-state={`${isExpanded ? EAccordionItemState.Expanded : EAccordionItemState.Collapsed}`}
                data-disabled={isDisabled}
            >
                {children}
            </HeadingTag>
        )
    }
)

AccordionHeader.displayName = ACCORDION_HEADER_NAME

export { AccordionHeader }

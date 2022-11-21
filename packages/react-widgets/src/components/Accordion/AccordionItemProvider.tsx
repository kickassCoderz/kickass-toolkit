import { createScopedContext } from '../../internal'
import { ACCORDION_ITEM_NAME } from './accordion-names'
import type { TAccordionItemProviderProps } from './accordion-types'

const [AccordionItemProvider, useAccordionItemContext] =
    createScopedContext<TAccordionItemProviderProps>(ACCORDION_ITEM_NAME)

export { AccordionItemProvider, useAccordionItemContext }

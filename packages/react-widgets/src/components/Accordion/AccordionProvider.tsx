import { createScopedContext } from '../../internal'
import { ACCORDION_NAME } from './accordion-names'
import type { TAccordionProviderProps } from './accordion-types'

const [AccordionProvider, useAccordionContext] = createScopedContext<TAccordionProviderProps>(ACCORDION_NAME)

export { AccordionProvider, useAccordionContext }

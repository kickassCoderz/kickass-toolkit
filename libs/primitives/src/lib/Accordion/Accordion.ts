import { AccordionHeader } from './Header'
import { AccordionItem } from './Item'
import { AccordionPanel } from './Panel'
import { AccordionRoot } from './Root'
import { AccordionTrigger } from './Trigger'

type TAccordion = {
    Root: typeof AccordionRoot
    Item: typeof AccordionItem
    Header: typeof AccordionHeader
    Trigger: typeof AccordionTrigger
    Panel: typeof AccordionPanel
}

const Accordion: TAccordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Trigger: AccordionTrigger,
    Panel: AccordionPanel
}

export type { TAccordion }

export { Accordion }

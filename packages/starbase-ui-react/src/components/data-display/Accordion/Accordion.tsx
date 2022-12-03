import type {
    TAccordionItemButtonProps,
    TAccordionItemHeaderProps,
    TAccordionItemPanelProps,
    TAccordionItemProps,
    TAccordionRootProps
} from '@kickass-coderz/react-widgets'
import { Accordion as AccordionWidget, EAccordionMode } from '@kickass-coderz/react-widgets'
import { forwardRef } from 'react'

const AccordionRoot = forwardRef<HTMLUListElement, TAccordionRootProps>((props, ref) => {
    return <AccordionWidget.Root ref={ref} {...props} />
})

AccordionRoot.displayName = 'StarbaseAccordionRoot'

const AccordionItem = forwardRef<HTMLLIElement, TAccordionItemProps>((props, ref) => {
    return <AccordionWidget.Item ref={ref} {...props}></AccordionWidget.Item>
})

AccordionItem.displayName = 'StarbaseAccordionItem'

const AccordionHeader = forwardRef<HTMLHeadingElement, TAccordionItemHeaderProps>((props, ref) => {
    return <AccordionWidget.Header ref={ref} {...props}></AccordionWidget.Header>
})

AccordionHeader.displayName = 'StarbaseAccordionHeader'

const AccordionButton = forwardRef<HTMLButtonElement, TAccordionItemButtonProps>((props, ref) => {
    return <AccordionWidget.Button ref={ref} {...props}></AccordionWidget.Button>
})

AccordionButton.displayName = 'StarbaseAccordionButton'

const AccordionPanel = forwardRef<HTMLDivElement, TAccordionItemPanelProps>((props, ref) => {
    return <AccordionWidget.Panel ref={ref} {...props} />
})

AccordionPanel.displayName = 'StarbaseAccordionPanel'

const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    Header: AccordionHeader,
    Button: AccordionButton,
    Panel: AccordionPanel
}

export type {
    TAccordionItemButtonProps,
    TAccordionItemHeaderProps,
    TAccordionItemPanelProps,
    TAccordionItemProps,
    TAccordionRootProps
}

export { Accordion, EAccordionMode }

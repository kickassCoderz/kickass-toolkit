import { Accordion as AccordionWidget, EAccordionMode } from '@kickass-coderz/react-widgets'

const Accordion = () => {
    return (
        <AccordionWidget.Root mode={EAccordionMode.Single}>
            <AccordionWidget.Item></AccordionWidget.Item>
        </AccordionWidget.Root>
    )
}

export { Accordion }

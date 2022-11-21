import { Accordion, EAccordionMode, useAccordionItemContext } from '@kickass-coderz/react-widgets'

import { arrowStyle, buttonStyle, headerStyle, itemStyle, panelStyle, rootStyle } from './accordion.css'

const Arrow = () => {
    const { isExpanded } = useAccordionItemContext('Arrow')

    return isExpanded ? (
        <svg className={arrowStyle} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
        </svg>
    ) : (
        <svg className={arrowStyle} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
        </svg>
    )
}

const AccordionDemo = () => {
    return (
        <Accordion.Root className={rootStyle} mode={EAccordionMode.Multiple} isCollapsible>
            <Accordion.Item className={itemStyle}>
                <Accordion.Header className={headerStyle}>
                    <Accordion.Button className={buttonStyle}>
                        Is it accessible? <Arrow />
                    </Accordion.Button>
                </Accordion.Header>
                <Accordion.Panel className={panelStyle}>
                    Yes. It adheres to the WAI-ARIA design pattern.
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className={itemStyle}>
                <Accordion.Header className={headerStyle}>
                    <Accordion.Button className={buttonStyle}>
                        Is it unstyled?
                        <Arrow />
                    </Accordion.Button>
                </Accordion.Header>
                <Accordion.Panel className={panelStyle}>
                    Yes. Its unstyled by default, giving you freedom over the look and feel.
                </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className={itemStyle}>
                <Accordion.Header className={headerStyle}>
                    <Accordion.Button className={buttonStyle}>
                        Can it be animated?
                        <Arrow />
                    </Accordion.Button>
                </Accordion.Header>
                <Accordion.Panel className={panelStyle}>
                    Yes! You can animate the Accordion with CSS or JavaScript.
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion.Root>
    )
}

export { AccordionDemo }

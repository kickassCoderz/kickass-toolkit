import {
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
    AccordionRoot,
    AccordionTrigger
} from '@kickass-coderz/primitives'

const Accordion = () => {
    return (
        <div>
            <AccordionRoot mode="multiple">
                <AccordionItem value="item1">
                    <AccordionHeader>
                        <AccordionTrigger>Im trigger</AccordionTrigger>
                        <AccordionPanel>Im a panel</AccordionPanel>
                    </AccordionHeader>
                </AccordionItem>
                <AccordionItem value="item2">
                    <AccordionHeader>
                        <AccordionTrigger>Im trigger</AccordionTrigger>
                        <AccordionPanel>
                            <AccordionRoot mode="single">
                                <AccordionItem value="item1">
                                    <AccordionHeader>
                                        <AccordionTrigger>Im trigger</AccordionTrigger>
                                        <AccordionPanel>Im a panel</AccordionPanel>
                                    </AccordionHeader>
                                </AccordionItem>
                                <AccordionItem value="item2">
                                    <AccordionHeader>
                                        <AccordionTrigger>Im trigger</AccordionTrigger>
                                        <AccordionPanel>Im a panel</AccordionPanel>
                                    </AccordionHeader>
                                </AccordionItem>
                            </AccordionRoot>
                        </AccordionPanel>
                    </AccordionHeader>
                </AccordionItem>
            </AccordionRoot>
        </div>
    )
}

export default Accordion

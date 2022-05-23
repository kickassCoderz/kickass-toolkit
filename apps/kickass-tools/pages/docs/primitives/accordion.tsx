import { Accordion } from '@kickass-coderz/primitives'
import Link from 'next/link'

const AccordionPage = () => {
    return (
        <div>
            <nav>
                <Link href="/docs">
                    <a style={{ color: 'blue' }}>Docs</a>
                </Link>
            </nav>
            <h1>Accordion</h1>
            <pre>
                <code>{`Import { Accordion } from "@kickass-coderz/primitives"`}</code>
            </pre>
            <pre>
                <code>{`Import {  AccordionPanel, AccordionRoot, AccordionHeader, AccordionItem, AccordionTrigger } from "@kickass-coderz/primitives"`}</code>
            </pre>
            <h1>Modes</h1>
            <h2>Single</h2>
            <Accordion.Root mode="single">
                <Accordion.Item value="item1">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im a panel 1</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item2">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im panel 2</Accordion.Panel>
                </Accordion.Item>
            </Accordion.Root>
            <hr />
            <h2>Single Collapsible</h2>
            <Accordion.Root mode="singleCollapsible">
                <Accordion.Item value="item1">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im a panel 1</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item2">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im panel 2</Accordion.Panel>
                </Accordion.Item>
            </Accordion.Root>
            <hr />
            <h2>Multiple</h2>
            <Accordion.Root mode="multiple">
                <Accordion.Item value="item1">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im a panel 1</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item2">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im panel 2</Accordion.Panel>
                </Accordion.Item>
            </Accordion.Root>
            <hr />
            <h2>Multiple Collapsible</h2>
            <Accordion.Root mode="multipleCollapsible">
                <Accordion.Item value="item1">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 1</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im a panel 1</Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="item2">
                    <Accordion.Header>
                        <Accordion.Trigger>Im trigger 2</Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Panel>Im panel 2</Accordion.Panel>
                </Accordion.Item>
            </Accordion.Root>
        </div>
    )
}

export default AccordionPage

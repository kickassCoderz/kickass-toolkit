import { Collapser } from '@kickass-coderz/primitives'
import Link from 'next/link'

const CollapserPage = () => {
    return (
        <div>
            <nav>
                <Link href="/docs">
                    <a style={{ color: 'blue' }}>Docs</a>
                </Link>
            </nav>
            <h1>Collapser</h1>
            <h2>Import</h2>
            <pre>
                <code>{`Import { Collapser } from "@kickass-coderz/primitives"`}</code>
            </pre>
            <pre>
                <code>{`Import {  CollapserPanel, CollapserRoot, CollapserTrigger } from "@kickass-coderz/primitives"`}</code>
            </pre>
            <Collapser.Root>
                <Collapser.Trigger>Im a Trigger</Collapser.Trigger>
                <Collapser.Panel>Im a Panel</Collapser.Panel>
            </Collapser.Root>
        </div>
    )
}

export default CollapserPage

import Link from 'next/link'

const DocsPage = () => {
    return (
        <div>
            <h1>Docs</h1>
            <Link href="/docs/primitives">
                <a style={{ color: 'blue' }}>Primitives</a>
            </Link>
            <Link href="/docs/hooks">
                <a style={{ color: 'blue' }}>Hooks</a>
            </Link>
        </div>
    )
}

export default DocsPage

import Link from 'next/link'

const DocsPage = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href="/docs/collapser">
                            <a style={{ color: 'blue' }}>Collapser</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/accordion">
                            <a style={{ color: 'blue' }}>Accordion</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default DocsPage

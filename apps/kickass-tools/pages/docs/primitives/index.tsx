import Link from 'next/link'

const PrimitivesPage = () => {
    return (
        <div>
            <h1>Primitives</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/docs/primitives/collapser">
                            <a style={{ color: 'blue' }}>Collapser</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/docs/primitives/accordion">
                            <a style={{ color: 'blue' }}>Accordion</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default PrimitivesPage

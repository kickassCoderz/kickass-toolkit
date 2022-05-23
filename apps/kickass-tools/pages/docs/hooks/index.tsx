import Link from 'next/link'

const HooksPage = () => {
    return (
        <div>
            <h1>Hooks</h1>
            <Link href="/docs/hooks/use-resize-observer">
                <a style={{ color: 'blue' }}>useResizeObserver</a>
            </Link>
            <Link href="/docs/hooks/use-intersection-observer">
                <a style={{ color: 'blue' }}>useIntersectionObserver</a>
            </Link>
        </div>
    )
}

export default HooksPage

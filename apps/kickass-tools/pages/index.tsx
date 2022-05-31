import Link from 'next/link'

import { LandingLayout } from '../components'

const Home = () => {
    return (
        <LandingLayout>
            <h1>Hello world</h1>
            <Link href="/docs">
                <a>Docs</a>
            </Link>
        </LandingLayout>
    )
}

export default Home

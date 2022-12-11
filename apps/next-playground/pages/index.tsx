import { LandingHero, LandingLayout } from '../components/landing'
import type { TNextPageWithLayout } from '../types'

const HomePage: TNextPageWithLayout = () => {
    return <LandingHero />
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
    return <LandingLayout>{page}</LandingLayout>
}

export default HomePage

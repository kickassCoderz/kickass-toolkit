import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React from 'react'

import { HomepageFeatures } from '../components/HomepageFeatures'
import { HomepageHeader } from '../components/HomepageHeader'

const Home = (): JSX.Element => {
    const { siteConfig } = useDocusaurusContext()
    return (
        <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
            </main>
        </Layout>
    )
}

export default Home

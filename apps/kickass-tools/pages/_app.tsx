import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

import defaultSeoConfig from '../next-seo.config'
import { injectGlobalStyles } from '../stitches.config'

const App = ({ Component, pageProps }: AppProps) => {
    injectGlobalStyles()

    return (
        <>
            <DefaultSeo {...defaultSeoConfig} />
            <Component {...pageProps} />
        </>
    )
}

export default App

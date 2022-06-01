import { AppProps } from 'next/app'
import Head from 'next/head'

import { injectGlobalStyles } from '../stitches.config'

const App = ({ Component, pageProps }: AppProps) => {
    injectGlobalStyles()

    return (
        <>
            <Head>
                <title>Welcome to kickass-tools!</title>
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default App

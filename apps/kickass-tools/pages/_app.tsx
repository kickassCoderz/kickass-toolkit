import './styles.css'

import { AppProps } from 'next/app'
import Head from 'next/head'

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Welcome to kickass-tools!</title>
            </Head>
            <main className="app">
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default CustomApp

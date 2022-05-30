import { AppProps } from 'next/app'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
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

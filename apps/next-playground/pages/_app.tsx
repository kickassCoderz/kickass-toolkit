import { KickassThemeProvider } from '@kickass-coderz/kickass-ui-react'
import Head from 'next/head'

import type { TNextAppPropsWithLayout } from '../types'

const App = ({ Component, pageProps }: TNextAppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? (page => page)

    return (
        <>
            <Head>
                <title>Next playground</title>
            </Head>
            <KickassThemeProvider mode="dark">{getLayout(<Component {...pageProps} />)}</KickassThemeProvider>
        </>
    )
}

export default App

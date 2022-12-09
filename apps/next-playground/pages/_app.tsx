import { KickassThemeProvider } from '@kickass-coderz/kickass-ui-react'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <KickassThemeProvider mode="dark">
                <Component {...pageProps} />
            </KickassThemeProvider>
        </>
    )
}

export default App

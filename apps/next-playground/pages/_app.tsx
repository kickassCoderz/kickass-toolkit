import { StarbaseThemeProvider } from '@kickass-coderz/starbase-ui-react'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <StarbaseThemeProvider mode="dark">
                <Component {...pageProps} />
            </StarbaseThemeProvider>
        </>
    )
}

export default App

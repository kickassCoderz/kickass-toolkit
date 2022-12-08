import { createStarbaseSSRColorSchemeScript } from '@kickass-coderz/starbase-ui-react'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const Document = () => {
    return (
        <Html>
            <Head />
            <body>
                <Script
                    id="starbase-ssr"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: createStarbaseSSRColorSchemeScript({ defaultMode: 'dark' })
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document

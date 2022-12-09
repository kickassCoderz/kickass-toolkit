import { createKickassUISSRColorSchemeScript } from '@kickass-coderz/kickass-ui-react'
import { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

const Document = () => {
    return (
        <Html lang="en">
            <Head />
            <body>
                {/* This script is required for KickassUI to work properly. */}
                <Script
                    id="kickass-ui-ssr"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: createKickassUISSRColorSchemeScript({ defaultMode: 'dark' })
                    }}
                />
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document

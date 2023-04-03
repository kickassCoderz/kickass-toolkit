import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
    docsRepositoryBase: 'https://github.com/kickassCoderz/kickass-toolkit/tree/master/apps/toolkit-docs/src/pages',

    project: {
        link: 'https://github.com/kickassCoderz/kickass-toolkit'
        // icon: ''
    },
    useNextSeoProps() {
        return {
            titleTemplate: '%s – Kickass Toolkit'
        }
    },
    logoLink: '/',
    logo: (
        <>
            <span>😎</span>
            <span>Kickass Toolkit</span>
        </>
    ),
    footer: {
        text: (
            <>
                <a href="https://github.com/kickassCoderz" rel="noopener noreferrer" target="_blank">
                    ©KickassCoderz
                </a>
                &nbsp;
                {`${new Date().getFullYear()}`}
            </>
        )
    }
}

export default config

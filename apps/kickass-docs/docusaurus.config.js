// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const npm2yarn = require('@docusaurus/remark-plugin-npm2yarn')

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Kickass Toolkit',
    tagline: 'Set of curated tools for kickass projects. Focus on code let us take care of chores!',
    url: 'https://kickass.codes',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'kickassCoderz', // Usually your GitHub org/user name.
    projectName: 'kickass-toolkit',
    // Even if you don't use internalization, you can use this field to set useful
    // metadata like html lang. For example, if your site is Chinese, you may want
    // to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en']
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    editUrl: 'https://github.com/kickass-toolkit/tree/master/apps/kickass-toolkit/docs/',
                    remarkPlugins: [[npm2yarn, { sync: true }]]
                },
                blog: {
                    showReadingTime: true,
                    editUrl: 'https://github.com/kickass-toolkit/tree/master/apps/kickass-toolkit/blog/'
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            })
        ]
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                respectPrefersColorScheme: true
            },
            navbar: {
                title: 'Kickass Toolkit',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg'
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'intro',
                        position: 'left',
                        label: 'Docs'
                    },
                    // { to: '/blog', label: 'Blog', position: 'left' }, // enable if we use the blog
                    {
                        href: 'https://github.com/kickassCoderz/kickass-toolkit',
                        label: 'GitHub',
                        position: 'right'
                    }
                ]
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Docs',
                        items: [
                            {
                                label: 'Introduction',
                                to: '/docs/intro'
                            },
                            {
                                label: 'Quick Start',
                                to: '/docs/quick-start'
                            },
                            {
                                label: 'Hooks',
                                to: '/docs/hooks/overview'
                            },
                            {
                                label: 'Data service',
                                to: '/docs/data-service/overview'
                            },
                            {
                                label: 'Auth service',
                                to: '/docs/auth-service/overview'
                            },
                            {
                                label: 'Subscription service',
                                to: '/docs/subscription-service/overview'
                            }
                        ]
                    },
                    {
                        title: 'Community',
                        items: [
                            // TODO add links
                        ]
                    },
                    {
                        title: 'More',
                        items: [
                            // TODO add more
                        ]
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Kickass Toolkit.`
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme
            }
        })
}

module.exports = config

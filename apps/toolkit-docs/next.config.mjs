/* eslint-disable tsdoc/syntax */
import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './nextra-docs.config.tsx'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true
}

export default withNextra(nextConfig)

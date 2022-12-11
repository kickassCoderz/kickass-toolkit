// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const withVanillaExtract = createVanillaExtractPlugin({ identifiers: 'short' })

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        transpilePackages: ['@kickass-coderz/kickass-ui-react']
    }
}

module.exports = withVanillaExtract(nextConfig)

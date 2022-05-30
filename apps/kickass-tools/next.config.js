// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const { remarkMdxCodeMeta } = require('remark-mdx-code-meta')

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkMdxCodeMeta],
        rehypePlugins: [],
        // If we dont use `MDXProvider`, comment the following line.
        providerImportSource: '@mdx-js/react'
    }
})

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
    pageExtensions: ['tsx', 'mdx'],
    nx: {
        // Set this to true if you would like to to use SVGR
        // See: https://github.com/gregberge/svgr
        svgr: false
    }
}

module.exports = withMDX(withNx(nextConfig))

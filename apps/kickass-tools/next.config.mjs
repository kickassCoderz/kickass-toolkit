import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import { remarkMdxCodeMeta } from 'remark-mdx-code-meta'
import withNx from '@nrwl/next/plugins/with-nx.js'

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkMdxCodeMeta, remarkGfm],
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

export default withMDX(withNx(nextConfig))

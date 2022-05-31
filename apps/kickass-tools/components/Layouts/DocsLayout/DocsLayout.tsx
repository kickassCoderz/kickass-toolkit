import { MDXProvider } from '@mdx-js/react'
import { styled } from '@stitches/react'
import { MDXComponents } from 'mdx/types'

import { CodeBlock } from '../../CodeBlock'

const preToCodeBlock = preProps => {
    if (
        // children is MDXTag
        preProps.children &&
        // MDXTag props
        preProps.children?.props &&
        // if MDXTag is going to render a <code>
        preProps.children?.type === 'code'
    ) {
        // we have a <pre><code> situation

        const language = preProps.children.props?.className?.replace(/language-/, '')
        const codeString = preProps.children.props?.children?.trim()
        const isInteractive = preProps.interactive
        const className = preProps.children.props?.className || ''

        return {
            language,
            codeString,
            isInteractive,
            className
        }
    }
    return undefined
}

//@NOTE: Here we have to map all our custom components to override mdx defaults
//@NOTE: That is the reason why the layouts are split, it would be ridiculous to import all components in _App.tsx

const mdxComponents: MDXComponents = {
    pre: preProps => {
        const codeBlockProps = preToCodeBlock(preProps)
        if (codeBlockProps) {
            return <CodeBlock {...codeBlockProps} />
        }

        return <pre {...preProps} />
    }
}

const Root = styled('div', {
    display: 'flex',
    minHeight: '100vh'
})

const Sidebar = styled('aside', {
    maxWidth: '320px',
    width: '100%',
    borderRight: '1px solid black'
})

const Main = styled('main', {
    padding: '20px'
})

const DocsLayout = ({ children, meta }) => {
    return (
        <MDXProvider components={mdxComponents}>
            <Root>
                <Sidebar>Sidebar</Sidebar>
                <Main>{children}</Main>
            </Root>
        </MDXProvider>
    )
}

export { DocsLayout }

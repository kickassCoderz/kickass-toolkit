import { MDXProvider } from '@mdx-js/react'
import { MDXComponents } from 'mdx/types'
import { NextSeo } from 'next-seo'
import { useMemo } from 'react'

import { CodeBlock } from '../../CodeBlock'
import { Container } from '../../Container'
import { Text } from '../../Text'

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
    h1: ({ children }) => {
        return (
            <Text as="h1" variant="h1">
                {children}
            </Text>
        )
    },
    h2: ({ children }) => {
        return (
            <Text as="h2" variant="h2">
                {children}
            </Text>
        )
    },
    h3: ({ children }) => {
        return (
            <Text as="h3" variant="h3">
                {children}
            </Text>
        )
    },
    h4: ({ children }) => {
        return (
            <Text as="h4" variant="h4">
                {children}
            </Text>
        )
    },
    h5: ({ children }) => {
        return (
            <Text as="h5" variant="h5">
                {children}
            </Text>
        )
    },
    h6: ({ children }) => {
        return (
            <Text as="h6" variant="h6">
                {children}
            </Text>
        )
    },
    p: ({ children }) => {
        return <Text variant="paragraph">{children}</Text>
    },
    pre: preProps => {
        const codeBlockProps = preToCodeBlock(preProps)
        if (codeBlockProps) {
            return <CodeBlock {...codeBlockProps} />
        }

        return <pre {...preProps} />
    }
}

const getSeoTitle = (title: string, repository?: string) => {
    return [repository, title].filter(Boolean).join(' | ')
}

type TDocsMeta = {
    repository?: string
    title: string
    description: string
}

type TDocsLayoutProps = {
    children: React.ReactNode
    meta: TDocsMeta
}

const DocsLayout = ({ children, meta }: TDocsLayoutProps) => {
    const { title, repository, description } = meta

    const seoTitle = useMemo(() => getSeoTitle(title, repository), [title, repository])

    return (
        <>
            <NextSeo title={seoTitle} description={description} />
            <MDXProvider components={mdxComponents}>
                <Container>
                    <Container maxWidth="320" as="aside">
                        SIDEBAR
                    </Container>
                    <Container as="main" direction="column">
                        {children}
                    </Container>
                </Container>
            </MDXProvider>
        </>
    )
}

export { DocsLayout }

/* eslint-disable react/jsx-key */
import Highlight, { defaultProps } from 'prism-react-renderer'
import draculaTheme from 'prism-react-renderer/themes/dracula'

import { Line, LineContent, LineNum, Pre } from './styles'

const CodeBlock = ({ isInteractive, language, codeString }) => {
    return (
        <Highlight {...defaultProps} theme={draculaTheme} code={codeString} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <Pre className={className} style={style}>
                    {tokens.map((line, i) => (
                        <Line {...getLineProps({ line, key: i })}>
                            <LineNum>{i + 1}</LineNum>
                            <LineContent>
                                {line.map((token, key) => (
                                    <span {...getTokenProps({ token, key })} />
                                ))}
                            </LineContent>
                        </Line>
                    ))}
                </Pre>
            )}
        </Highlight>
    )
}

export { CodeBlock }

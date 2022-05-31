import { styled } from '@stitches/react'

const Pre = styled('pre', {
    textAlign: 'left',
    margin: '1em 0',
    padding: '24px 16px', //0.5em
    borderRadius: 4,
    overflow: 'scroll',

    ' & .token-line': {
        lineHeight: '1.3em',
        height: '1.3em'
    }
})

const Line = styled('code', {
    display: 'table-row'
})

const LineNum = styled('span', {
    display: 'table-cell',
    textAlign: 'right',
    paddingRight: '1em',
    userSelect: 'none',
    opacity: 0.5
})

const LineContent = styled('span', {
    display: 'table-cell'
})

export { Line, LineContent, LineNum, Pre }

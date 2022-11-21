import { style } from '@vanilla-extract/css'

const rootStyle = style({
    overflow: 'hidden',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '320px',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'hsl(0deg 0% 52%)',
    backgroundColor: '#FAFAFC',

    ':focus-within': {
        borderColor: 'rgb(7, 89, 213)'
    }
})

const itemStyle = style({
    width: '100%',
    selectors: {
        '&:not(:last-of-type)': {
            borderBottom: '1px solid black'
        }
    }
})

const arrowStyle = style({
    width: '24px',
    height: '24px'
})

const headerStyle = style({
    width: '100%',
    margin: 0,
    selectors: {
        '&:not(:last-of-type)': {
            borderBottom: '1px solid black'
        }
    }
})

const buttonStyle = style({
    appearance: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    border: 'none',
    width: '100%',

    fontSize: '18px',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    padding: '24px 16px 24px 16px',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ':hover': {
        backgroundColor: 'hsl(216deg 94% 94%)'
    },
    ':focus': {
        backgroundColor: 'hsl(216deg 94% 94%)'
    }
})

const panelStyle = style({
    padding: '16px',
    fontSize: '16px',
    fontFamily: 'Arial'
})

export { arrowStyle, buttonStyle, headerStyle, itemStyle, panelStyle, rootStyle }

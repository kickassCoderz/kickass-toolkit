import { style } from '@vanilla-extract/css'

const rootStyles = style({
    width: '320px'
})

const iconStyles = style({
    width: '24px',
    height: '24px'
})

const buttonStyles = style({
    appearance: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid black',
    borderRadius: '100%',
    height: '40px',
    width: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const headerStyles = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'Arial',
    fontSize: '16px',
    marginBottom: '16px'
})

const listStyles = style({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
})

const itemStyles = style({
    padding: '16px 24px',
    borderRadius: 6,
    fontFamily: 'Arial',
    // border: '1px solid black',
    // backgroundColor: '#FAFAFC',
    boxShadow: 'rgba(0, 0, 0, 0.14) 0px 2px 10px'
})

export { buttonStyles, headerStyles, iconStyles, itemStyles, listStyles, rootStyles }

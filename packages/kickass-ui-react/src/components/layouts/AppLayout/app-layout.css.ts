import { style } from '@vanilla-extract/css'

import { sprinkles } from '../../../theme'

const appLayoutRootStyles = sprinkles({
    boxSizing: 'border-box',
    backgroundColor: 'appBackground',
    minHeight: 'full',
    display: 'flex',
    flexDirection: 'column'
})

export { appLayoutRootStyles }

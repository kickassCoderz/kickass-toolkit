import { globalStyle } from '@vanilla-extract/css'

import type { TStarbaseUIThemeVars } from './createStarbaseThemeVars'
import type { TStarbaseUIThemeColorTokens } from './types'

const createStarbaseGlobalStyles = (themeVars: TStarbaseUIThemeVars, darkThemeColors?: TStarbaseUIThemeColorTokens) => {
    globalStyle('*,*::before,*::after', {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    })

    globalStyle('html,body', {
        height: '100%'
    })

    globalStyle('html', {
        fontSize: themeVars.fontSizes.html
    })

    globalStyle('body', {
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        fontFamily: themeVars.fonts.body,
        fontSize: themeVars.fontSizes.body
    })

    globalStyle('#root, #__next', {
        isolation: 'isolate',
        height: '100%'
    })
}

export { createStarbaseGlobalStyles }

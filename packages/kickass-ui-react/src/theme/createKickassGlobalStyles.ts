import { globalStyle } from '@vanilla-extract/css'

import { THEME_ATTR_SELECTOR_DARK, THEME_ATTR_SELECTOR_LIGHT } from '../consts'
import type { TKAUIThemeVars } from './createKickassThemeVars'

const createKickassGlobalStyles = (themeVars: TKAUIThemeVars) => {
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
        overscrollBehavior: 'none',
        fontFamily: themeVars.fonts.body,
        fontSize: themeVars.fontSizes.body,
        backgroundColor: themeVars.colors.appBackground
    })

    globalStyle('#root, #__next', {
        isolation: 'isolate',
        height: '100%',
        position: 'relative'
    })

    globalStyle(THEME_ATTR_SELECTOR_LIGHT, {
        colorScheme: 'light'
    })

    globalStyle(THEME_ATTR_SELECTOR_DARK, {
        colorScheme: 'dark'
    })
}

export { createKickassGlobalStyles }

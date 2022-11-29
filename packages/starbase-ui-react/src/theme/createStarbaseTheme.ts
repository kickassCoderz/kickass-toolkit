import { createGlobalTheme } from '@vanilla-extract/css'

import type { TStarbaseUIThemeVars } from './createStarbaseThemeVars'
import { TStarbaseUIThemeTokens } from './types'

const createStarbaseTheme = (themeVars: TStarbaseUIThemeVars, themeTokens: TStarbaseUIThemeTokens) => {
    createGlobalTheme(':root', themeVars, themeTokens)
}

export { createStarbaseTheme }

import { createStarbaseGlobalStyles } from './createStarbaseGlobalStyles'
import { createStarbaseStardust } from './createStarbaseStardust'
import { createStarbaseTheme } from './createStarbaseTheme'
import { createStarbaseThemeVars } from './createStarbaseThemeVars'
import { TCreateStarbaseUIConfigTokens } from './types'

const createStarbaseUIModules = (themeTokens: TCreateStarbaseUIConfigTokens) => {
    const themeVars = createStarbaseThemeVars()

    const { lightThemeColors, darkThemeColors, breakpoints, ...restThemeTokens } = themeTokens

    createStarbaseTheme(themeVars, { colors: lightThemeColors, ...restThemeTokens })

    createStarbaseGlobalStyles(themeVars, darkThemeColors)

    const stardust = createStarbaseStardust(themeVars, breakpoints)

    return { themeVars, stardust }
}

export { createStarbaseUIModules }

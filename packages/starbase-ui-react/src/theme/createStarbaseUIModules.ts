import { createStarbaseGlobalStyles } from './createStarbaseGlobalStyles'
import { createStarbaseSprinkles } from './createStarbaseSprinkles'
import { createStarbaseTheme } from './createStarbaseTheme'
import { createStarbaseThemeVars } from './createStarbaseThemeVars'
import { TCreateStarbaseUIConfigTokens } from './types'

const createStarbaseUIModules = (themeTokens: TCreateStarbaseUIConfigTokens) => {
    const themeVars = createStarbaseThemeVars()

    const { lightThemeColors, darkThemeColors, breakpoints, ...restThemeTokens } = themeTokens

    createStarbaseTheme(themeVars, { colors: lightThemeColors, ...restThemeTokens })

    createStarbaseGlobalStyles(themeVars, darkThemeColors)

    const sprinkles = createStarbaseSprinkles(themeVars, breakpoints)

    return { themeVars, sprinkles }
}

export { createStarbaseUIModules }

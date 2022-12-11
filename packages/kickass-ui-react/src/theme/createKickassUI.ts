import { createKickassGlobalStyles } from './createKickassGlobalStyles'
import { createKickassSprinkles } from './createKickassSprinkles'
import { createKickassTheme } from './createKickassTheme'
import { createKickassThemeVars } from './createKickassThemeVars'
import { loadKickassUIConfig } from './loadKickassUIConfig'

const createKickassUI = () => {
    const { breakpoints, ...themeTokens } = loadKickassUIConfig()

    const themeVars = createKickassThemeVars()

    createKickassTheme(themeVars, themeTokens)

    createKickassGlobalStyles(themeVars)

    const sprinkles = createKickassSprinkles(themeVars, breakpoints)

    return { themeVars, sprinkles }
}

export { createKickassUI }

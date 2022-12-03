import { createStarbaseUIModules } from './createStarbaseUIModules'
import { themeFactoryTokens } from './defaultThemeTokens'
import { loadStarbaseUIConfig } from './loadStarbaseUIConfig'
import type { TCreateStarbaseUIConfigTokens } from './types'

const mergeConfigs = (
    defaultTokens: TCreateStarbaseUIConfigTokens,
    configTokens?: Partial<TCreateStarbaseUIConfigTokens>
) => {
    if (!configTokens) {
        return defaultTokens
    }

    return Object.entries(configTokens).reduce((acc, entry) => {
        const key = entry[0] as keyof typeof configTokens
        const value = entry[1]

        return {
            ...acc,
            [key]: {
                ...acc[key],
                ...value
            }
        }
    }, defaultTokens)
}

const createStarbaseUI = () => {
    const externalConfig = loadStarbaseUIConfig()
    const mergedConfig = mergeConfigs(themeFactoryTokens, externalConfig)

    const { stardust, themeVars } = createStarbaseUIModules(mergedConfig)

    return { stardust, themeVars }
}

export { createStarbaseUI }

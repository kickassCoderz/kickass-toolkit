// const mergeConfigs = (
//     defaultTokens: TCreateKickassUIConfigTokens,
//     configTokens?: Partial<TCreateKickassUIConfigTokens>
// ) => {
//     if (!configTokens) {
//         return defaultTokens
//     }

import { themeFactoryTokens } from './defaultThemeTokens'

//     return Object.entries(configTokens).reduce((acc, entry) => {
//         const key = entry[0] as keyof typeof configTokens
//         const value = entry[1]

//         return {
//             ...acc,
//             [key]: {
//                 ...acc[key],
//                 ...value
//             }
//         }
//     }, defaultTokens)
// }

// const loadKickassUIConfig = () => {
//     try {
//         const CONFIG_FILE_NAME = 'Kickass-ui.json'
//         const workdir = process.cwd()

//         const configPath = `${workdir}/${CONFIG_FILE_NAME}`

//         if (!fs.existsSync(configPath)) {
//             return undefined
//         }

//         const { $schema, ...parsedTokens } = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }))

//         if (!$schema) {
//             console.info('You can define Kickass UI config schema with: some urls')
//         }

//         return parsedTokens as TCreateKickassUIConfigTokens
//     } catch (error) {
//         throw new Error(`[Kickass-UI]: Something is wrong with provided config file:${error}`)
//     }
// }

//@TODO: This should load external config,merge it and return merged config
//@NOTE: Maybe we should explore initiating theme inside users css.ts file via exposed function
const loadKickassUIConfig = () => {
    return themeFactoryTokens
}

export { loadKickassUIConfig }

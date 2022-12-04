import fs from 'fs'

import type { TCreateStarbaseUIConfigTokens } from './types'

const loadStarbaseUIConfig = (): Partial<TCreateStarbaseUIConfigTokens> | undefined => {
    try {
        const CONFIG_FILE_NAME = 'starbase-ui.json'
        const workdir = process.cwd()

        const configPath = `${workdir}/${CONFIG_FILE_NAME}`

        if (!fs.existsSync(configPath)) {
            return undefined
        }

        const { $schema, ...parsedTokens } = JSON.parse(fs.readFileSync(configPath, { encoding: 'utf-8' }))

        if (!$schema) {
            console.info('You can define Starbase UI config schema with: some urls')
        }

        return parsedTokens as TCreateStarbaseUIConfigTokens
    } catch (error) {
        throw new Error(`[Starbase-UI]: Something is wrong with provided config file:${error}`)
    }
}

export { loadStarbaseUIConfig }

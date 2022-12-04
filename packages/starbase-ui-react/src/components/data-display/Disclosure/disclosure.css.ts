import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

import { stardust } from '../../../theme'

const disclosureRootBlueprint = recipe({
    base: stardust({ boxSizing: 'border-box' })
})

type TDisclosureRootBlueprint = RecipeVariants<typeof disclosureRootBlueprint>

export type { TDisclosureRootBlueprint }

export { disclosureRootBlueprint }

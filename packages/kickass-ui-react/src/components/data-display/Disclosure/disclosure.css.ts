import type { RecipeVariants } from '@vanilla-extract/recipes'
import { recipe } from '@vanilla-extract/recipes'

import { sprinkles } from '../../../theme'

const disclosureRootBlueprint = recipe({
    base: sprinkles({ boxSizing: 'border-box' })
})

type TDisclosureRootBlueprint = RecipeVariants<typeof disclosureRootBlueprint>

export type { TDisclosureRootBlueprint }

export { disclosureRootBlueprint }

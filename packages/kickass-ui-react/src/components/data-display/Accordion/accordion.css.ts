import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { sprinkles } from '../../../theme'

const accordionRootBlueprint = recipe({
    base: sprinkles({
        boxSizing: 'border-box'
    })
})

const accordionItemBlueprint = recipe({
    base: sprinkles({
        boxSizing: 'border-box'
    })
})

const accordionHeaderBlueprint = recipe({
    base: sprinkles({
        boxSizing: 'border-box'
    })
})

const accordionButtonBlueprint = recipe({
    base: sprinkles({
        boxSizing: 'border-box'
    })
})

const accordionPanelBlueprint = recipe({
    base: sprinkles({
        boxSizing: 'border-box'
    })
})

type TAccordionRootBlueprint = RecipeVariants<typeof accordionRootBlueprint>

type TAccordionItemBlueprint = RecipeVariants<typeof accordionItemBlueprint>

type TAccordionHeaderBlueprint = RecipeVariants<typeof accordionHeaderBlueprint>

type TAccordionButtonBlueprint = RecipeVariants<typeof accordionButtonBlueprint>

type TAccordionPanelBlueprint = RecipeVariants<typeof accordionPanelBlueprint>

export type {
    TAccordionButtonBlueprint,
    TAccordionHeaderBlueprint,
    TAccordionItemBlueprint,
    TAccordionPanelBlueprint,
    TAccordionRootBlueprint
}

export {
    accordionButtonBlueprint,
    accordionHeaderBlueprint,
    accordionItemBlueprint,
    accordionPanelBlueprint,
    accordionRootBlueprint
}

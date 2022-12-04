import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { stardust } from '../../../theme'

const accordionRootBlueprint = recipe({
    base: stardust({
        boxSizing: 'border-box'
    })
})

const accordionItemBlueprint = recipe({
    base: stardust({
        boxSizing: 'border-box'
    })
})

const accordionHeaderBlueprint = recipe({
    base: stardust({
        boxSizing: 'border-box'
    })
})

const accordionButtonBlueprint = recipe({
    base: stardust({
        boxSizing: 'border-box'
    })
})

const accordionPanelBlueprint = recipe({
    base: stardust({
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

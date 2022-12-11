import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { sprinkles } from '../../../theme'

const footerRecipe = recipe({
    base: sprinkles({
        boxSizing: 'border-box',
        // borderTopColor: 'separatorColor',
        // borderTopStyle: 'solid',
        // borderTopWidth: 'sm',
        display: 'flex',
        alignItems: 'center'
    }),
    variants: {
        isCondensed: {
            true: sprinkles({ padding: 'md' }),
            false: sprinkles({ padding: 'xl' })
        },

        position: {
            static: sprinkles({ position: 'static' }),
            sticky: sprinkles({ position: 'sticky', bottom: 'none', left: 'none', zIndex: 'xl' }),
            fixed: sprinkles({ position: 'fixed', bottom: 'none', left: 'none', zIndex: 'xl' })
        },
        justifyContent: {
            center: sprinkles({ justifyContent: 'center' }),
            'space-around': sprinkles({ justifyContent: 'space-around' }),
            'space-between': sprinkles({ justifyContent: 'space-between' }),
            'space-evenly': sprinkles({ justifyContent: 'space-evenly' }),
            'flex-start': sprinkles({ justifyContent: 'flex-start' }),
            'flex-end': sprinkles({ justifyContent: 'flex-end' })
        },
        color: {
            surface: sprinkles({ backgroundColor: 'surfaceBackground' }),
            appBackground: sprinkles({ backgroundColor: 'appBackground' })
        }
    }
})

export type TKAUIFooterRecipe = RecipeVariants<typeof footerRecipe>

export { footerRecipe }

import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { sprinkles } from '../../../theme'

const headerRecipe = recipe({
    base: sprinkles({
        boxSizing: 'border-box',

        borderBottomColor: 'separatorColor',
        borderBottomStyle: 'solid',
        borderBottomWidth: 'sm',
        display: 'flex',
        alignItems: 'center',
        paddingX: 'md'
    }),
    variants: {
        isCondensed: {
            true: sprinkles({ height: 'xl6' }),
            false: sprinkles({ height: 'xl7' })
        },
        isElevated: {
            true: sprinkles({ boxShadow: 'lg' })
        },
        position: {
            static: sprinkles({ position: 'static' }),
            sticky: sprinkles({ position: 'sticky', top: 'none', left: 'none', zIndex: 'xl' }),
            fixed: sprinkles({ position: 'fixed', top: 'none', left: 'none', zIndex: 'xl' })
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

export type TKAUIHeaderRecipe = RecipeVariants<typeof headerRecipe>

export { headerRecipe }

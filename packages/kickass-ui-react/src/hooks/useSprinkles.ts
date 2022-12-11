import { sprinkles } from '../theme'
import type { TKAUISprinklesProps } from '../theme/createKickassSprinkles'

const useSprinkles = (sprinklesStyleProps: TKAUISprinklesProps): string => {
    return sprinkles(sprinklesStyleProps)
}

export { useSprinkles }

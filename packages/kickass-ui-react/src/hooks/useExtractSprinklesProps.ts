import { extractSprinklesProps } from '../internal'
import { sprinkles } from '../theme'

const useExtractSprinklesProps = <T extends Record<string, unknown>>(props: T) => {
    const { sprinklesProps, otherProps } = extractSprinklesProps(props, sprinkles)
    const sprinklesClassName = sprinkles(sprinklesProps)

    return {
        otherProps,
        sprinklesProps,
        sprinklesClassName
    }
}

export { useExtractSprinklesProps }

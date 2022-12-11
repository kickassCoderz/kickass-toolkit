type TSprinklesFnBase = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (...args: any): string
    properties: Set<string>
}

type TResolvedProps = {
    sprinklesProps: Record<string, unknown>
    otherProps: Record<string, unknown>
}

//@TODO: find way to infer types of resolvedProps

const extractSprinklesProps = <P extends Record<string, unknown>, S extends TSprinklesFnBase>(
    allProps: P,
    sprinklesFn: S
) => {
    const resolvedProps: TResolvedProps = {
        sprinklesProps: {},
        otherProps: {}
    }

    for (const key in allProps) {
        if (sprinklesFn.properties.has(key)) {
            resolvedProps.sprinklesProps[key] = allProps[key]
        } else {
            resolvedProps.otherProps[key] = allProps[key]
        }
    }

    return resolvedProps
}

export { extractSprinklesProps }

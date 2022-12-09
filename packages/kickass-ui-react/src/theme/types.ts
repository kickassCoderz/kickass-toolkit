// type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>

export type TKickassUIThemeBreakpointTokens = {
    xs: number
    sm: number
    md: number
    lg: number
    xl: number
}

export type TKickassUIThemeColorTokens = {
    neutral50: string
    neutral100: string
    neutral200: string
    neutral300: string
    neutral400: string
    neutral500: string
    neutral600: string
    neutral700: string
    neutral800: string
    neutral900: string
    primary50: string
    primary100: string
    primary200: string
    primary300: string
    primary400: string
    primary500: string
    primary600: string
    primary700: string
    primary800: string
    primary900: string
    success50: string
    success100: string
    success200: string
    success300: string
    success400: string
    success500: string
    success600: string
    success700: string
    success800: string
    success900: string
    danger50: string
    danger100: string
    danger200: string
    danger300: string
    danger400: string
    danger500: string
    danger600: string
    danger700: string
    danger800: string
    danger900: string
    warning50: string
    warning100: string
    warning200: string
    warning300: string
    warning400: string
    warning500: string
    warning600: string
    warning700: string
    warning800: string
    warning900: string
    info50: string
    info100: string
    info200: string
    info300: string
    info400: string
    info500: string
    info600: string
    info700: string
    info800: string
    info900: string
}

export type TKickassUIThemeFontTokens = {
    heading: string
    body: string
    code: string
}

export type TKickassUIThemeFontSizeTokens = {
    html: string
    body: string
    xs3: string
    xs2: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xl2: string
    xl3: string
    xl4: string
    xl5: string
    xl6: string
}

export type TKickassUIThemeFontWeightTokens = {
    regular: string
    medium: string
    semiBold: string
    bold: string
}

export type TKickassUIThemeLineHeightTokens = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

export type TKickassUIThemeLetterSpacingTokens = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

export type TKickassUIThemeRadiiTokens = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    circular: string
}

export type TKickassUIThemeStrokeWidthTokens = {
    sm: string
    md: string
    lg: string
}

export type TKickassUIThemeSizeTokens = {
    xs6: string
    xs5: string
    xs4: string
    xs3: string
    xs2: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xl2: string
    xl3: string
    xl4: string
    xl5: string
    xl6: string
}
export type TKickassUIThemeSpaceTokens = {
    xs6: string
    xs5: string
    xs4: string
    xs3: string
    xs2: string
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xl2: string
    xl3: string
    xl4: string
    xl5: string
    xl6: string
}

export type TKickassUIThemeShadowTokens = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xl2: string
}

export type TKickassUIThemeTransitionTokens = {
    timingAccelerateMax: string
    timingAccelerateMid: string
    timingAccelerateMin: string
    timingDecelerateMax: string
    timingDecelerateMid: string
    timingDecelerateMin: string
    timingEaseMax: string
    timingEase: string
    timingLinear: string
    durationFastest: string
    durationFaster: string
    durationFast: string
    durationNormal: string
    durationSlow: string
    durationSlower: string
    durationSlowest: string
}

export type TKickassUIThemeZIndexTokens = {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
}

export type TKickassUIThemeTokens = {
    colors: TKickassUIThemeColorTokens
    fonts: TKickassUIThemeFontTokens
    fontSizes: TKickassUIThemeFontSizeTokens
    fontWeights: TKickassUIThemeFontWeightTokens
    lineHeights: TKickassUIThemeLineHeightTokens
    letterSpacings: TKickassUIThemeLetterSpacingTokens
    radii: TKickassUIThemeRadiiTokens
    strokeWidths: TKickassUIThemeStrokeWidthTokens
    sizes: TKickassUIThemeSizeTokens
    space: TKickassUIThemeSpaceTokens
    shadows: TKickassUIThemeShadowTokens
    transitions: TKickassUIThemeTransitionTokens
    zIndices: TKickassUIThemeZIndexTokens
}

export type TCreateKickassUIConfigTokens = Omit<TKickassUIThemeTokens, 'colors'> & {
    lightThemeColors: TKickassUIThemeColorTokens
    darkThemeColors: TKickassUIThemeColorTokens
    breakpoints: TKickassUIThemeBreakpointTokens
}

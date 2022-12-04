import type {
    TCreateStarbaseUIConfigTokens,
    TStarbaseUIThemeBreakpointTokens,
    TStarbaseUIThemeColorTokens,
    TStarbaseUIThemeFontSizeTokens,
    TStarbaseUIThemeFontTokens,
    TStarbaseUIThemeFontWeightTokens,
    TStarbaseUIThemeLetterSpacingTokens,
    TStarbaseUIThemeLineHeightTokens,
    TStarbaseUIThemeRadiiTokens,
    TStarbaseUIThemeShadowTokens,
    TStarbaseUIThemeSizeTokens,
    TStarbaseUIThemeSpaceTokens,
    TStarbaseUIThemeStrokeWidthTokens,
    TStarbaseUIThemeTransitionTokens,
    TStarbaseUIThemeZIndexTokens
} from './types'

const defaultBreakpoints: TStarbaseUIThemeBreakpointTokens = {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536
}

const defaultLightThemeColors: TStarbaseUIThemeColorTokens = {
    neutral50: '#f9fafb',
    neutral100: '#f3f4f6',
    neutral200: '#e5e7eb',
    neutral300: '#d1d5db',
    neutral400: '#9ca3af',
    neutral500: '#6b7280',
    neutral600: '#4b5563',
    neutral700: '#374151',
    neutral800: '#1f2937',
    neutral900: '#111827',
    primary50: '#eef2ff',
    primary100: '#e0e7ff',
    primary200: '#c7d2fe',
    primary300: '#a5b4fc',
    primary400: '#818cf8',
    primary500: '#6366f1',
    primary600: '#4f46e5',
    primary700: '#4338ca',
    primary800: '#3730a3',
    primary900: '#312e81',
    secondary50: '#fdf4ff',
    secondary100: '#fae8ff',
    secondary200: '#f5d0fe',
    secondary300: '#f0abfc',
    secondary400: '#e879f9',
    secondary500: '#d946ef',
    secondary600: '#c026d3',
    secondary700: '#a21caf',
    secondary800: '#86198f',
    secondary900: '#701a75',
    success50: '#f0fdf4',
    success100: '#dcfce7',
    success200: '#bbf7d0',
    success300: '#86efac',
    success400: '#4ade80',
    success500: '#22c55e',
    success600: '#16a34a',
    success700: '#15803d',
    success800: '#166534',
    success900: '#14532d',
    danger50: '#fff1f2',
    danger100: '#ffe4e6',
    danger200: '#fecdd3',
    danger300: '#fda4af',
    danger400: '#fb7185',
    danger500: '#f43f5e',
    danger600: '#e11d48',
    danger700: '#be123c',
    danger800: '#9f1239',
    danger900: '#881337',
    warning50: '#fffbeb',
    warning100: '#fef3c7',
    warning200: '#fde68a',
    warning300: '#fcd34d',
    warning400: '#fbbf24',
    warning500: '#f59e0b',
    warning600: '#d97706',
    warning700: '#b45309',
    warning800: '#92400e',
    warning900: '#78350f',
    info50: '#f0f9ff',
    info100: '#e0f2fe',
    info200: '#bae6fd',
    info300: '#7dd3fc',
    info400: '#38bdf8',
    info500: '#0ea5e9',
    info600: '#0284c7',
    info700: '#0369a1',
    info800: '#075985',
    info900: '#0c4a6e'
}
const defaultDarkThemeColors: TStarbaseUIThemeColorTokens = {
    neutral50: '#fafafa',
    neutral100: '#f5f5f5',
    neutral200: '#e5e5e5',
    neutral300: '#d4d4d4',
    neutral400: '#a3a3a3',
    neutral500: '#737373',
    neutral600: '#525252',
    neutral700: '#404040',
    neutral800: '#262626',
    neutral900: '#171717',
    primary50: '#eef2ff',
    primary100: '#e0e7ff',
    primary200: '#c7d2fe',
    primary300: '#a5b4fc',
    primary400: '#818cf8',
    primary500: '#6366f1',
    primary600: '#4f46e5',
    primary700: '#4338ca',
    primary800: '#3730a3',
    primary900: '#312e81',
    secondary50: '#fdf4ff',
    secondary100: '#fae8ff',
    secondary200: '#f5d0fe',
    secondary300: '#f0abfc',
    secondary400: '#e879f9',
    secondary500: '#d946ef',
    secondary600: '#c026d3',
    secondary700: '#a21caf',
    secondary800: '#86198f',
    secondary900: '#701a75',
    success50: '#f0fdf4',
    success100: '#dcfce7',
    success200: '#bbf7d0',
    success300: '#86efac',
    success400: '#4ade80',
    success500: '#22c55e',
    success600: '#16a34a',
    success700: '#15803d',
    success800: '#166534',
    success900: '#14532d',
    danger50: '#fff1f2',
    danger100: '#ffe4e6',
    danger200: '#fecdd3',
    danger300: '#fda4af',
    danger400: '#fb7185',
    danger500: '#f43f5e',
    danger600: '#e11d48',
    danger700: '#be123c',
    danger800: '#9f1239',
    danger900: '#881337',
    warning50: '#fffbeb',
    warning100: '#fef3c7',
    warning200: '#fde68a',
    warning300: '#fcd34d',
    warning400: '#fbbf24',
    warning500: '#f59e0b',
    warning600: '#d97706',
    warning700: '#b45309',
    warning800: '#92400e',
    warning900: '#78350f',
    info50: '#f0f9ff',
    info100: '#e0f2fe',
    info200: '#bae6fd',
    info300: '#7dd3fc',
    info400: '#38bdf8',
    info500: '#0ea5e9',
    info600: '#0284c7',
    info700: '#0369a1',
    info800: '#075985',
    info900: '#0c4a6e'
}

const defaultFonts: TStarbaseUIThemeFontTokens = {
    heading:
        'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    body: 'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    code: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
}

const defaultFontSizes: TStarbaseUIThemeFontSizeTokens = {
    html: '16px',
    body: '1rem',
    xs3: '0.5rem', //8px
    xs2: '0.625rem', //10px
    xs: '0.75rem', //12px
    sm: '0.865rem', //14px
    md: '1rem', //16px
    lg: '1.125rem', //18px
    xl: '1.25rem', //20px
    xl2: '1.5rem', //24px
    xl3: '1.75rem', //28px
    xl4: '2rem', //32px
    xl5: '2.5rem', //40px
    xl6: '3rem' //48px
}

const defaultFontWeights: TStarbaseUIThemeFontWeightTokens = {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700'
}

const defaultLineHeights: TStarbaseUIThemeLineHeightTokens = {
    xs: '1.25',
    sm: '1.375',
    md: '1.5',
    lg: '1.625',
    xl: '2'
}

const defaultLetterSpacings: TStarbaseUIThemeLetterSpacingTokens = {
    xs: '-0.05em',
    sm: '-0.025em',
    md: '0.025em',
    lg: '0.05em',
    xl: '0.1em'
}

const defaultRadii: TStarbaseUIThemeRadiiTokens = {
    xs: '2px',
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    circular: '10000px'
}

const defaultStrokeWidths: TStarbaseUIThemeStrokeWidthTokens = {
    sm: '1px',
    md: '2px',
    lg: '4px'
}

const defaultSizes: TStarbaseUIThemeSizeTokens = {
    xs6: '0.125rem', //2px
    xs5: '0.25rem', //4px
    xs4: '0.375rem', //6px
    xs3: '0.5rem', //8px,
    xs2: '0.625rem', //10px
    xs: '0.75rem', //12px
    sm: '0.875rem', //14px
    md: '1rem', //16px
    lg: '1.125rem', //18px
    xl: '1.25rem', //20px,
    xl2: '1.5rem', //24px
    xl3: '1.75rem', //28px
    xl4: '2rem', //32px
    xl5: '2.5rem', //40px
    xl6: '3rem' //48px
}

const defaultSpaces: TStarbaseUIThemeSpaceTokens = {
    ...defaultSizes
}

const defaultShadows: TStarbaseUIThemeShadowTokens = {
    xs: '0 0 2px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.14)',
    sm: '0 0 2px rgba(0,0,0,0.12),0 2px 4px rgba(0,0,0,0.14)',
    md: '0 0 2px rgba(0,0,0,0.12),0 4px 8px rgba(0,0,0,0.14)',
    lg: '0 0 2px rgba(0,0,0,0.12),0 8px 16px rgba(0,0,0,0.14)',
    xl: '0 0 8px rgba(0,0,0,0.12),0 14px 28px rgba(0,0,0,0.14)',
    xl2: '0 0 8px rgba(0,0,0,0.12),0 32px 64px rgba(0,0,0,0.14)'
}

const defaultTransitions: TStarbaseUIThemeTransitionTokens = {
    timingAccelerateMax: 'cubic-bezier(1,0,1,1)',
    timingAccelerateMid: 'cubic-bezier(0.7,0,1,0.5)',
    timingAccelerateMin: 'cubic-bezier(0.8,0,1,1)',
    timingDecelerateMax: 'cubic-bezier(0,0,0,1)',
    timingDecelerateMid: 'cubic-bezier(0.1,0.9,0.2,1)',
    timingDecelerateMin: 'cubic-bezier(0.33,0,0.1,1)',
    timingEaseMax: 'cubic-bezier(0.8,0,0.1,1)',
    timingEase: 'cubic-bezier(0.33,0,0.67,1)',
    timingLinear: 'cubic-bezier(0,0,1,1)',
    durationFastest: '50ms',
    durationFaster: '100ms',
    durationFast: '150ms',
    durationNormal: '200ms',
    durationSlow: '300ms',
    durationSlower: '400ms',
    durationSlowest: '500ms'
}

const defaultZindices: TStarbaseUIThemeZIndexTokens = {
    xs: '10',
    sm: '20',
    md: '30',
    lg: '40',
    xl: '50'
}

const themeFactoryTokens: TCreateStarbaseUIConfigTokens = {
    lightThemeColors: defaultLightThemeColors,
    darkThemeColors: defaultDarkThemeColors,
    breakpoints: defaultBreakpoints,
    fonts: defaultFonts,
    fontSizes: defaultFontSizes,
    fontWeights: defaultFontWeights,
    lineHeights: defaultLineHeights,
    letterSpacings: defaultLetterSpacings,
    radii: defaultRadii,
    strokeWidths: defaultStrokeWidths,
    sizes: defaultSizes,
    space: defaultSpaces,
    shadows: defaultShadows,
    transitions: defaultTransitions,
    zIndices: defaultZindices
}

export {
    defaultBreakpoints,
    defaultDarkThemeColors,
    defaultFonts,
    defaultFontSizes,
    defaultFontWeights,
    defaultLetterSpacings,
    defaultLightThemeColors,
    defaultLineHeights,
    defaultRadii,
    defaultShadows,
    defaultSizes,
    defaultSpaces,
    defaultStrokeWidths,
    defaultTransitions,
    defaultZindices,
    themeFactoryTokens
}

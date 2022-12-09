import { createGlobalThemeContract } from '@vanilla-extract/css'

const createKickassThemeVars = () => {
    const sharedVars = createGlobalThemeContract({
        fonts: {
            heading: 'fonts-heading',
            body: 'fonts-body',
            code: 'fonts-code'
        },
        fontSizes: {
            html: 'fontSizes-html',
            body: 'fontSizes-body',
            xs3: 'fontSizes-xs3',
            xs2: 'fontSizes-xs2',
            xs: 'fontSizes-xs',
            sm: 'fontSizes-sm',
            md: 'fontSizes-md',
            lg: 'fontSizes-lg',
            xl: 'fontSizes-xl',
            xl2: 'fontSizes-xl2',
            xl3: 'fontSizes-xl3',
            xl4: 'fontSizes-xl4',
            xl5: 'fontSizes-xl5',
            xl6: 'fontSizes-xl6'
        },
        fontWeights: {
            regular: 'fontWeights-regular',
            medium: 'fontWeights-medium',
            semiBold: 'fontWeights-semiBold',
            bold: 'fontWeights-bold'
        },
        lineHeights: {
            xs: 'lineHeights-xs',
            sm: 'lineHeights-sm',
            md: 'lineHeights-md',
            lg: 'lineHeights-lg',
            xl: 'lineHeights-xl'
        },
        letterSpacings: {
            xs: 'letterSpacings-xs',
            sm: 'letterSpacings-sm',
            md: 'letterSpacings-md',
            lg: 'letterSpacings-lg',
            xl: 'letterSpacings-xl'
        },
        radii: {
            xs: 'radii-xs',
            sm: 'radii-sm',
            md: 'radii-md',
            lg: 'radii-lg',
            xl: 'radii-xl',
            circular: 'radii-circular'
        },
        strokeWidths: {
            sm: 'strokeWidths-sm',
            md: 'strokeWidths-md',
            lg: 'strokeWidths-lg'
        },
        sizes: {
            xs6: 'sizes-xs6',
            xs5: 'sizes-xs5',
            xs4: 'sizes-xs4',
            xs3: 'sizes-xs3',
            xs2: 'sizes-xs2',
            xs: 'sizes-xs',
            sm: 'sizes-sm',
            md: 'sizes-md',
            lg: 'sizes-lg',
            xl: 'sizes-xl',
            xl2: 'sizes-xl2',
            xl3: 'sizes-xl3',
            xl4: 'sizes-xl4',
            xl5: 'sizes-xl5',
            xl6: 'sizes-xl6'
        },
        space: {
            xs6: 'space-xs6',
            xs5: 'space-xs5',
            xs4: 'space-xs4',
            xs3: 'space-xs3',
            xs2: 'space-xs2',
            xs: 'space-xs',
            sm: 'space-sm',
            md: 'space-md',
            lg: 'space-lg',
            xl: 'space-xl',
            xl2: 'space-xl2',
            xl3: 'space-xl3',
            xl4: 'space-xl4',
            xl5: 'space-xl5',
            xl6: 'space-xl6'
        },
        shadows: {
            xs: 'shadows-xs',
            sm: 'shadows-sm',
            md: 'shadows-md',
            lg: 'shadows-lg',
            xl: 'shadows-xl',
            xl2: 'shadows-xl2'
        },
        transitions: {
            timingAccelerateMax: 'transitions-timing-accelerateMax',
            timingAccelerateMid: 'transitions-timing-accelerateMid',
            timingAccelerateMin: 'transitions-timing-accelerateMin',
            timingDecelerateMax: 'transitions-timing-decelerateMax',
            timingDecelerateMid: 'transitions-timing-decelerateMid',
            timingDecelerateMin: 'transitions-timing-decelerateMin',
            timingEaseMax: 'transitions-timing-easeMax',
            timingEase: 'transitions-timing-ease',
            timingLinear: 'transitions-timing-linear',
            durationFastest: 'transitions-duration-fastest',
            durationFaster: 'transitions-duration-faster',
            durationFast: 'transitions-duration-fast',
            durationNormal: 'transitions-duration-normal',
            durationSlow: 'transitions-duration-slow',
            durationSlower: 'transitions-duration-slower',
            durationSlowest: 'transitions-duration-slowest'
        },
        zIndices: {
            xs: 'zIndices-xs',
            sm: 'zIndices-sm',
            md: 'zIndices-md',
            lg: 'zIndices-lg',
            xl: 'zIndices-xl'
        }
    })

    const colorModeVars = createGlobalThemeContract({
        colors: {
            neutral50: 'colors-neutral-50',
            neutral100: 'colors-neutral-100',
            neutral200: 'colors-neutral-200',
            neutral300: 'colors-neutral-300',
            neutral400: 'colors-neutral-400',
            neutral500: 'colors-neutral-500',
            neutral600: 'colors-neutral-600',
            neutral700: 'colors-neutral-700',
            neutral800: 'colors-neutral-800',
            neutral900: 'colors-neutral-900',
            primary50: 'colors-primary-50',
            primary100: 'colors-primary-100',
            primary200: 'colors-primary-200',
            primary300: 'colors-primary-300',
            primary400: 'colors-primary-400',
            primary500: 'colors-primary-500',
            primary600: 'colors-primary-600',
            primary700: 'colors-primary-700',
            primary800: 'colors-primary-800',
            primary900: 'colors-primary-900',
            success50: 'colors-success-50',
            success100: 'colors-success-100',
            success200: 'colors-success-200',
            success300: 'colors-success-300',
            success400: 'colors-success-400',
            success500: 'colors-success-500',
            success600: 'colors-success-600',
            success700: 'colors-success-700',
            success800: 'colors-success-800',
            success900: 'colors-success-900',
            danger50: 'colors-danger-50',
            danger100: 'colors-danger-100',
            danger200: 'colors-danger-200',
            danger300: 'colors-danger-300',
            danger400: 'colors-danger-400',
            danger500: 'colors-danger-500',
            danger600: 'colors-danger-600',
            danger700: 'colors-danger-700',
            danger800: 'colors-danger-800',
            danger900: 'colors-danger-900',
            warning50: 'colors-warning-50',
            warning100: 'colors-warning-100',
            warning200: 'colors-warning-200',
            warning300: 'colors-warning-300',
            warning400: 'colors-warning-400',
            warning500: 'colors-warning-500',
            warning600: 'colors-warning-600',
            warning700: 'colors-warning-700',
            warning800: 'colors-warning-800',
            warning900: 'colors-warning-900',
            info50: 'colors-info-50',
            info100: 'colors-info-100',
            info200: 'colors-info-200',
            info300: 'colors-info-300',
            info400: 'colors-info-400',
            info500: 'colors-info-500',
            info600: 'colors-info-600',
            info700: 'colors-info-700',
            info800: 'colors-info-800',
            info900: 'colors-info-900',
            appBackground: 'colors-appBg',
            surfaceBackground: 'colors-surfaceBg',
            separatorColor: 'colors-separator',
            //neutral
            //solid
            neutralSolidColor: 'colors-neutral-solidColor',
            neutralSolidColorDisabled: 'colors-neutral-solidColorDisabled',
            neutralSolidBgColor: 'colors-neutral-solidBgColor',
            neutralSolidBgColorHover: 'colors-neutral-solidBgColorHover',
            neutralSolidBgColorActive: 'colors-neutral-solidBgColorActive',
            neutralSolidBgColorDisabled: 'colors-neutral-solidBgColorDisabled',
            //soft
            neutralSoftColor: 'colors-neutral-softColor',
            neutralSoftColorDisabled: 'colors-neutral-softColorDisabled',
            neutralSoftBgColor: 'colors-neutral-softBgColor',
            neutralSoftBgColorHover: 'colors-neutral-softBgColorHover',
            neutralSoftBgColorActive: 'colors-neutral-softBgColorActive',
            neutralSoftBgColorDisabled: 'colors-neutral-softBgColorDisabled',
            //outlined
            neutralOutlinedColor: 'colors-neutral-outlinedColor',
            neutralOutlinedColorDisabled: 'colors-neutral-outlinedColorDisabled',
            neutralOutlinedBgColorHover: 'colors-neutral-outlinedBgColorHover',
            neutralOutlinedBgColorActive: 'colors-neutral-outlinedBgColorActive',
            neutralOutlinedBorderColor: 'colors-neutral-outlinedBorderColor',
            neutralOutlinedBorderColorHover: 'colors-neutral-outlinedBorderColorHover',
            neutralOutlinedBorderColorActive: 'colors-neutral-outlinedBorderColorActive',
            neutralOutlinedBorderColorDisabled: 'colors-neutral-outlinedBorderColorDisabled',
            //subtle
            neutralSubtleColor: 'colors-neutral-subtleColor',
            neutralSubtleColorDisabled: 'colors-neutral-subtleColorDisabled',
            neutralSubtleBgColorHover: 'colors-neutral-subtleBgColorHover',
            neutralSubtleBgColorActive: 'colors-neutral-subtleBgColorActive',

            //primary
            //solid
            primarySolidColor: 'colors-primary-solidColor',
            primarySolidColorDisabled: 'colors-primary-solidColorDisabled',
            primarySolidBgColor: 'colors-primary-solidBgColor',
            primarySolidBgColorHover: 'colors-primary-solidBgColorHover',
            primarySolidBgColorActive: 'colors-primary-solidBgColorActive',
            primarySolidBgColorDisabled: 'colors-primary-solidBgColorDisabled',
            //soft
            primarySoftColor: 'colors-primary-softColor',
            primarySoftColorDisabled: 'colors-primary-softColorDisabled',
            primarySoftBgColor: 'colors-primary-softBgColor',
            primarySoftBgColorHover: 'colors-primary-softBgColorHover',
            primarySoftBgColorActive: 'colors-primary-softBgColorActive',
            primarySoftBgColorDisabled: 'colors-primary-softBgColorDisabled',
            //outlined
            primaryOutlinedColor: 'colors-primary-outlinedColor',
            primaryOutlinedColorDisabled: 'colors-primary-outlinedColorDisabled',
            primaryOutlinedBgColorHover: 'colors-primary-outlinedBgColorHover',
            primaryOutlinedBgColorActive: 'colors-primary-outlinedBgColorActive',
            primaryOutlinedBorderColor: 'colors-primary-outlinedBorderColor',
            primaryOutlinedBorderColorHover: 'colors-primary-outlinedBorderColorHover',
            primaryOutlinedBorderColorActive: 'colors-primary-outlinedBorderColorActive',
            primaryOutlinedBorderColorDisabled: 'colors-primary-outlinedBorderColorDisabled',
            //subtle
            primarySubtleColor: 'colors-primary-subtleColor',
            primarySubtleColorDisabled: 'colors-primary-subtleColorDisabled',
            primarySubtleBgColorHover: 'colors-primary-subtleBgColorHover',
            primarySubtleBgColorActive: 'colors-primary-subtleBgColorActive',

            //success
            //solid
            successSolidColor: 'colors-success-solidColor',
            successSolidColorDisabled: 'colors-success-solidColorDisabled',
            successSolidBgColor: 'colors-success-solidBgColor',
            successSolidBgColorHover: 'colors-success-solidBgColorHover',
            successSolidBgColorActive: 'colors-success-solidBgColorActive',
            successSolidBgColorDisabled: 'colors-success-solidBgColorDisabled',
            //soft
            successSoftColor: 'colors-success-softColor',
            successSoftColorDisabled: 'colors-success-softColorDisabled',
            successSoftBgColor: 'colors-success-softBgColor',
            successSoftBgColorHover: 'colors-success-softBgColorHover',
            successSoftBgColorActive: 'colors-success-softBgColorActive',
            successSoftBgColorDisabled: 'colors-success-softBgColorDisabled',
            //outlined
            successOutlinedColor: 'colors-success-outlinedColor',
            successOutlinedColorDisabled: 'colors-success-outlinedColorDisabled',
            successOutlinedBgColorHover: 'colors-success-outlinedBgColorHover',
            successOutlinedBgColorActive: 'colors-success-outlinedBgColorActive',
            successOutlinedBorderColor: 'colors-success-outlinedBorderColor',
            successOutlinedBorderColorHover: 'colors-success-outlinedBorderColorHover',
            successOutlinedBorderColorActive: 'colors-success-outlinedBorderColorActive',
            successOutlinedBorderColorDisabled: 'colors-success-outlinedBorderColorDisabled',
            //subtle
            successSubtleColor: 'colors-success-subtleColor',
            successSubtleColorDisabled: 'colors-success-subtleColorDisabled',
            successSubtleBgColorHover: 'colors-success-subtleBgColorHover',
            successSubtleBgColorActive: 'colors-success-subtleBgColorActive',
            //danger
            //solid
            dangerSolidColor: 'colors-danger-solidColor',
            dangerSolidColorDisabled: 'colors-danger-solidColorDisabled',
            dangerSolidBgColor: 'colors-danger-solidBgColor',
            dangerSolidBgColorHover: 'colors-danger-solidBgColorHover',
            dangerSolidBgColorActive: 'colors-danger-solidBgColorActive',
            dangerSolidBgColorDisabled: 'colors-danger-solidBgColorDisabled',
            //soft
            dangerSoftColor: 'colors-danger-softColor',
            dangerSoftColorDisabled: 'colors-danger-softColorDisabled',
            dangerSoftBgColor: 'colors-danger-softBgColor',
            dangerSoftBgColorHover: 'colors-danger-softBgColorHover',
            dangerSoftBgColorActive: 'colors-danger-softBgColorActive',
            dangerSoftBgColorDisabled: 'colors-danger-softBgColorDisabled',
            //outlined
            dangerOutlinedColor: 'colors-danger-outlinedColor',
            dangerOutlinedColorDisabled: 'colors-danger-outlinedColorDisabled',
            dangerOutlinedBgColorHover: 'colors-danger-outlinedBgColorHover',
            dangerOutlinedBgColorActive: 'colors-danger-outlinedBgColorActive',
            dangerOutlinedBorderColor: 'colors-danger-outlinedBorderColor',
            dangerOutlinedBorderColorHover: 'colors-danger-outlinedBorderColorHover',
            dangerOutlinedBorderColorActive: 'colors-danger-outlinedBorderColorActive',
            dangerOutlinedBorderColorDisabled: 'colors-danger-outlinedBorderColorDisabled',
            //subtle
            dangerSubtleColor: 'colors-danger-subtleColor',
            dangerSubtleColorDisabled: 'colors-danger-subtleColorDisabled',
            dangerSubtleBgColorHover: 'colors-danger-subtleBgColorHover',
            dangerSubtleBgColorActive: 'colors-danger-subtleBgColorActive',

            //warning
            //solid
            warningSolidColor: 'colors-warning-solidColor',
            warningSolidColorDisabled: 'colors-warning-solidColorDisabled',
            warningSolidBgColor: 'colors-warning-solidBgColor',
            warningSolidBgColorHover: 'colors-warning-solidBgColorHover',
            warningSolidBgColorActive: 'colors-warning-solidBgColorActive',
            warningSolidBgColorDisabled: 'colors-warning-solidBgColorDisabled',
            //soft
            warningSoftColor: 'colors-warning-softColor',
            warningSoftColorDisabled: 'colors-warning-softColorDisabled',
            warningSoftBgColor: 'colors-warning-softBgColor',
            warningSoftBgColorHover: 'colors-warning-softBgColorHover',
            warningSoftBgColorActive: 'colors-warning-softBgColorActive',
            warningSoftBgColorDisabled: 'colors-warning-softBgColorDisabled',
            //outlined
            warningOutlinedColor: 'colors-warning-outlinedColor',
            warningOutlinedColorDisabled: 'colors-warning-outlinedColorDisabled',
            warningOutlinedBgColorHover: 'colors-warning-outlinedBgColorHover',
            warningOutlinedBgColorActive: 'colors-warning-outlinedBgColorActive',
            warningOutlinedBorderColor: 'colors-warning-outlinedBorderColor',
            warningOutlinedBorderColorHover: 'colors-warning-outlinedBorderColorHover',
            warningOutlinedBorderColorActive: 'colors-warning-outlinedBorderColorActive',
            warningOutlinedBorderColorDisabled: 'colors-warning-outlinedBorderColorDisabled',
            //subtle
            warningSubtleColor: 'colors-warning-subtleColor',
            warningSubtleColorDisabled: 'colors-warning-subtleColorDisabled',
            warningSubtleBgColorHover: 'colors-warning-subtleBgColorHover',
            warningSubtleBgColorActive: 'colors-warning-subtleBgColorActive',

            //info
            //solid
            infoSolidColor: 'colors-info-solidColor',
            infoSolidColorDisabled: 'colors-info-solidColorDisabled',
            infoSolidBgColor: 'colors-info-solidBgColor',
            infoSolidBgColorHover: 'colors-info-solidBgColorHover',
            infoSolidBgColorActive: 'colors-info-solidBgColorActive',
            infoSolidBgColorDisabled: 'colors-info-solidBgColorDisabled',
            //soft
            infoSoftColor: 'colors-info-softColor',
            infoSoftColorDisabled: 'colors-info-softColorDisabled',
            infoSoftBgColor: 'colors-info-softBgColor',
            infoSoftBgColorHover: 'colors-info-softBgColorHover',
            infoSoftBgColorActive: 'colors-info-softBgColorActive',
            infoSoftBgColorDisabled: 'colors-info-softBgColorDisabled',
            //outlined
            infoOutlinedColor: 'colors-info-outlinedColor',
            infoOutlinedColorDisabled: 'colors-info-outlinedColorDisabled',
            infoOutlinedBgColorHover: 'colors-info-outlinedBgColorHover',
            infoOutlinedBgColorActive: 'colors-info-outlinedBgColorActive',
            infoOutlinedBorderColor: 'colors-info-outlinedBorderColor',
            infoOutlinedBorderColorHover: 'colors-info-outlinedBorderColorHover',
            infoOutlinedBorderColorActive: 'colors-info-outlinedBorderColorActive',
            infoOutlinedBorderColorDisabled: 'colors-info-outlinedBorderColorDisabled',
            //subtle
            infoSubtleColor: 'colors-info-subtleColor',
            infoSubtleColorDisabled: 'colors-info-subtleColorDisabled',
            infoSubtleBgColorHover: 'colors-info-subtleBgColorHover',
            infoSubtleBgColorActive: 'colors-info-subtleBgColorActive'
        }
    })

    return { ...sharedVars, ...colorModeVars }
}

export type TKickassUIThemeVars = ReturnType<typeof createKickassThemeVars>

export { createKickassThemeVars }

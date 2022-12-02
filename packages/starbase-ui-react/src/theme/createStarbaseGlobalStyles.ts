import { assignVars, globalStyle } from '@vanilla-extract/css'

import { THEME_ATTR_SELECTOR_DARK, THEME_ATTR_SELECTOR_LIGHT } from '../consts'
import type { TStarbaseUIThemeVars } from './createStarbaseThemeVars'
import type { TStarbaseUIThemeColorTokens } from './types'

const createStarbaseGlobalStyles = (themeVars: TStarbaseUIThemeVars, darkThemeColors?: TStarbaseUIThemeColorTokens) => {
    globalStyle('*,*::before,*::after', {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0
    })

    globalStyle('html,body', {
        height: '100%'
    })

    globalStyle('html', {
        fontSize: themeVars.fontSizes.html
    })

    globalStyle('body', {
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        fontFamily: themeVars.fonts.body,
        fontSize: themeVars.fontSizes.body,
        backgroundColor: themeVars.colors.appBackground
    })

    globalStyle('#root, #__next', {
        isolation: 'isolate',
        height: '100%'
    })

    globalStyle(THEME_ATTR_SELECTOR_LIGHT, {
        colorScheme: 'light'
    })

    if (darkThemeColors) {
        globalStyle(THEME_ATTR_SELECTOR_DARK, {
            vars: assignVars(themeVars.colors, {
                ...darkThemeColors,
                appBackground: themeVars.colors.neutral900,
                surfaceBackground: themeVars.colors.neutral800,
                separatorColor: themeVars.colors.neutral700,
                //neutral
                //solid
                neutralSolidColor: '#fff',
                neutralSolidColorDisabled: themeVars.colors.neutral700,
                neutralSolidBgColor: themeVars.colors.neutral500,
                neutralSolidBgColorHover: themeVars.colors.neutral600,
                neutralSolidBgColorActive: themeVars.colors.neutral700,
                neutralSolidBgColorDisabled: themeVars.colors.neutral900,
                //soft
                neutralSoftColor: themeVars.colors.neutral200,
                neutralSoftColorDisabled: themeVars.colors.neutral800,
                neutralSoftBgColor: themeVars.colors.neutral700,
                neutralSoftBgColorHover: themeVars.colors.neutral600,
                neutralSoftBgColorActive: themeVars.colors.neutral500,
                neutralSoftBgColorDisabled: themeVars.colors.neutral900,
                //outlined
                neutralOutlinedColor: themeVars.colors.neutral200,
                neutralOutlinedColorDisabled: themeVars.colors.neutral800,
                neutralOutlinedBgColorHover: themeVars.colors.neutral600,
                neutralOutlinedBgColorActive: themeVars.colors.neutral700,
                neutralOutlinedBorderColor: themeVars.colors.neutral600,
                neutralOutlinedBorderColorHover: themeVars.colors.neutral500,
                neutralOutlinedBorderColorActive: themeVars.colors.neutral400,
                neutralOutlinedBorderColorDisabled: themeVars.colors.neutral800,
                //subtle
                neutralSubtleColor: themeVars.colors.neutral300,
                neutralSubtleColorDisabled: themeVars.colors.neutral800,
                neutralSubtleBgColorHover: themeVars.colors.neutral700,
                neutralSubtleBgColorActive: themeVars.colors.neutral600,
                //primary
                //sold
                primarySolidColor: '#fff',
                primarySolidColorDisabled: themeVars.colors.primary700,
                primarySolidBgColor: themeVars.colors.primary600,
                primarySolidBgColorHover: themeVars.colors.primary700,
                primarySolidBgColorActive: themeVars.colors.primary800,
                primarySolidBgColorDisabled: themeVars.colors.primary900,
                //soft
                primarySoftColor: themeVars.colors.primary200,
                primarySoftColorDisabled: themeVars.colors.primary800,
                primarySoftBgColor: themeVars.colors.primary900,
                primarySoftBgColorHover: themeVars.colors.primary800,
                primarySoftBgColorActive: themeVars.colors.primary700,
                primarySoftBgColorDisabled: themeVars.colors.primary900,
                //outlined
                primaryOutlinedColor: themeVars.colors.primary200,
                primaryOutlinedColorDisabled: themeVars.colors.primary800,
                primaryOutlinedBgColorHover: themeVars.colors.primary800,
                primaryOutlinedBgColorActive: themeVars.colors.primary900,
                primaryOutlinedBorderColor: themeVars.colors.primary700,
                primaryOutlinedBorderColorHover: themeVars.colors.primary600,
                primaryOutlinedBorderColorActive: themeVars.colors.primary500,
                primaryOutlinedBorderColorDisabled: themeVars.colors.primary800,
                //subtle
                primarySubtleColor: themeVars.colors.primary300,
                primarySubtleColorDisabled: themeVars.colors.primary800,
                primarySubtleBgColorHover: themeVars.colors.primary800,
                primarySubtleBgColorActive: themeVars.colors.primary700,
                //secondary
                //sold
                secondarySolidColor: '#fff',
                secondarySolidColorDisabled: themeVars.colors.secondary700,
                secondarySolidBgColor: themeVars.colors.secondary600,
                secondarySolidBgColorHover: themeVars.colors.secondary700,
                secondarySolidBgColorActive: themeVars.colors.secondary800,
                secondarySolidBgColorDisabled: themeVars.colors.secondary900,
                //soft
                secondarySoftColor: themeVars.colors.secondary200,
                secondarySoftColorDisabled: themeVars.colors.secondary800,
                secondarySoftBgColor: themeVars.colors.secondary900,
                secondarySoftBgColorHover: themeVars.colors.secondary800,
                secondarySoftBgColorActive: themeVars.colors.secondary700,
                secondarySoftBgColorDisabled: themeVars.colors.secondary900,
                //outlined
                secondaryOutlinedColor: themeVars.colors.secondary200,
                secondaryOutlinedColorDisabled: themeVars.colors.secondary800,
                secondaryOutlinedBgColorHover: themeVars.colors.secondary800,
                secondaryOutlinedBgColorActive: themeVars.colors.secondary900,
                secondaryOutlinedBorderColor: themeVars.colors.secondary700,
                secondaryOutlinedBorderColorHover: themeVars.colors.secondary600,
                secondaryOutlinedBorderColorActive: themeVars.colors.secondary500,
                secondaryOutlinedBorderColorDisabled: themeVars.colors.secondary800,
                //subtle
                secondarySubtleColor: themeVars.colors.secondary300,
                secondarySubtleColorDisabled: themeVars.colors.secondary800,
                secondarySubtleBgColorHover: themeVars.colors.secondary800,
                secondarySubtleBgColorActive: themeVars.colors.secondary700,
                //success
                //sold
                successSolidColor: '#fff',
                successSolidColorDisabled: themeVars.colors.success700,
                successSolidBgColor: themeVars.colors.success600,
                successSolidBgColorHover: themeVars.colors.success700,
                successSolidBgColorActive: themeVars.colors.success800,
                successSolidBgColorDisabled: themeVars.colors.success900,
                //soft
                successSoftColor: themeVars.colors.success200,
                successSoftColorDisabled: themeVars.colors.success800,
                successSoftBgColor: themeVars.colors.success900,
                successSoftBgColorHover: themeVars.colors.success800,
                successSoftBgColorActive: themeVars.colors.success700,
                successSoftBgColorDisabled: themeVars.colors.success900,
                //outlined
                successOutlinedColor: themeVars.colors.success200,
                successOutlinedColorDisabled: themeVars.colors.success800,
                successOutlinedBgColorHover: themeVars.colors.success800,
                successOutlinedBgColorActive: themeVars.colors.success900,
                successOutlinedBorderColor: themeVars.colors.success700,
                successOutlinedBorderColorHover: themeVars.colors.success600,
                successOutlinedBorderColorActive: themeVars.colors.success500,
                successOutlinedBorderColorDisabled: themeVars.colors.success800,
                //subtle
                successSubtleColor: themeVars.colors.success300,
                successSubtleColorDisabled: themeVars.colors.success800,
                successSubtleBgColorHover: themeVars.colors.success800,
                successSubtleBgColorActive: themeVars.colors.success700,
                //danger
                //sold
                dangerSolidColor: '#fff',
                dangerSolidColorDisabled: themeVars.colors.danger700,
                dangerSolidBgColor: themeVars.colors.danger600,
                dangerSolidBgColorHover: themeVars.colors.danger700,
                dangerSolidBgColorActive: themeVars.colors.danger800,
                dangerSolidBgColorDisabled: themeVars.colors.danger900,
                //soft
                dangerSoftColor: themeVars.colors.danger200,
                dangerSoftColorDisabled: themeVars.colors.danger800,
                dangerSoftBgColor: themeVars.colors.danger900,
                dangerSoftBgColorHover: themeVars.colors.danger800,
                dangerSoftBgColorActive: themeVars.colors.danger700,
                dangerSoftBgColorDisabled: themeVars.colors.danger900,
                //outlined
                dangerOutlinedColor: themeVars.colors.danger200,
                dangerOutlinedColorDisabled: themeVars.colors.danger800,
                dangerOutlinedBgColorHover: themeVars.colors.danger800,
                dangerOutlinedBgColorActive: themeVars.colors.danger900,
                dangerOutlinedBorderColor: themeVars.colors.danger700,
                dangerOutlinedBorderColorHover: themeVars.colors.danger600,
                dangerOutlinedBorderColorActive: themeVars.colors.danger500,
                dangerOutlinedBorderColorDisabled: themeVars.colors.danger800,
                //subtle
                dangerSubtleColor: themeVars.colors.danger300,
                dangerSubtleColorDisabled: themeVars.colors.danger800,
                dangerSubtleBgColorHover: themeVars.colors.danger800,
                dangerSubtleBgColorActive: themeVars.colors.danger700,
                //warning
                //sold
                warningSolidColor: '#fff',
                warningSolidColorDisabled: themeVars.colors.warning700,
                warningSolidBgColor: themeVars.colors.warning600,
                warningSolidBgColorHover: themeVars.colors.warning700,
                warningSolidBgColorActive: themeVars.colors.warning800,
                warningSolidBgColorDisabled: themeVars.colors.warning900,
                //soft
                warningSoftColor: themeVars.colors.warning200,
                warningSoftColorDisabled: themeVars.colors.warning800,
                warningSoftBgColor: themeVars.colors.warning900,
                warningSoftBgColorHover: themeVars.colors.warning800,
                warningSoftBgColorActive: themeVars.colors.warning700,
                warningSoftBgColorDisabled: themeVars.colors.warning900,
                //outlined
                warningOutlinedColor: themeVars.colors.warning200,
                warningOutlinedColorDisabled: themeVars.colors.warning800,
                warningOutlinedBgColorHover: themeVars.colors.warning800,
                warningOutlinedBgColorActive: themeVars.colors.warning900,
                warningOutlinedBorderColor: themeVars.colors.warning700,
                warningOutlinedBorderColorHover: themeVars.colors.warning600,
                warningOutlinedBorderColorActive: themeVars.colors.warning500,
                warningOutlinedBorderColorDisabled: themeVars.colors.warning800,
                //subtle
                warningSubtleColor: themeVars.colors.warning300,
                warningSubtleColorDisabled: themeVars.colors.warning800,
                warningSubtleBgColorHover: themeVars.colors.warning800,
                warningSubtleBgColorActive: themeVars.colors.warning700,
                //info
                //sold
                infoSolidColor: '#fff',
                infoSolidColorDisabled: themeVars.colors.info700,
                infoSolidBgColor: themeVars.colors.info600,
                infoSolidBgColorHover: themeVars.colors.info700,
                infoSolidBgColorActive: themeVars.colors.info800,
                infoSolidBgColorDisabled: themeVars.colors.info900,
                //soft
                infoSoftColor: themeVars.colors.info200,
                infoSoftColorDisabled: themeVars.colors.info800,
                infoSoftBgColor: themeVars.colors.info900,
                infoSoftBgColorHover: themeVars.colors.info800,
                infoSoftBgColorActive: themeVars.colors.info700,
                infoSoftBgColorDisabled: themeVars.colors.info900,
                //outlined
                infoOutlinedColor: themeVars.colors.info200,
                infoOutlinedColorDisabled: themeVars.colors.info800,
                infoOutlinedBgColorHover: themeVars.colors.info800,
                infoOutlinedBgColorActive: themeVars.colors.info900,
                infoOutlinedBorderColor: themeVars.colors.info700,
                infoOutlinedBorderColorHover: themeVars.colors.info600,
                infoOutlinedBorderColorActive: themeVars.colors.info500,
                infoOutlinedBorderColorDisabled: themeVars.colors.info800,
                //subtle
                infoSubtleColor: themeVars.colors.info300,
                infoSubtleColorDisabled: themeVars.colors.info800,
                infoSubtleBgColorHover: themeVars.colors.info800,
                infoSubtleBgColorActive: themeVars.colors.info700
            }),
            colorScheme: 'dark'
        })
    }
}

export { createStarbaseGlobalStyles }

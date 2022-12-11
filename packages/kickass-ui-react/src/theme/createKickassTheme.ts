import { createGlobalTheme } from '@vanilla-extract/css'

import { THEME_ATTR_SELECTOR_DARK, THEME_ATTR_SELECTOR_LIGHT } from '../consts'
import type { TKickassUIThemeVars } from './createKickassThemeVars'
import type { TCreateKickassUIConfigTokens } from './types'

const createKickassTheme = (
    themeVars: TKickassUIThemeVars,
    themeTokens: Omit<TCreateKickassUIConfigTokens, 'breakpoints'>
) => {
    const { colors: colorVars, ...sharedVars } = themeVars
    const { darkThemeColors, lightThemeColors, ...sharedTokens } = themeTokens

    createGlobalTheme(':root', sharedVars, sharedTokens)

    //light theme
    createGlobalTheme(THEME_ATTR_SELECTOR_LIGHT, colorVars, {
        ...lightThemeColors,
        appBackground: themeVars.colors.neutral100,
        surfaceBackground: themeVars.colors.neutral50,
        separatorColor: themeVars.colors.neutral200,
        //solid
        neutralSolidColor: '#fff',
        neutralSolidColorDisabled: '#fff',
        neutralSolidBgColor: themeVars.colors.neutral500,
        neutralSolidBgColorHover: themeVars.colors.neutral600,
        neutralSolidBgColorActive: themeVars.colors.neutral700,
        neutralSolidBgColorDisabled: themeVars.colors.neutral200,
        //soft
        neutralSoftColor: themeVars.colors.neutral600,
        neutralSoftColorDisabled: themeVars.colors.neutral300,
        neutralSoftBgColor: themeVars.colors.neutral100,
        neutralSoftBgColorHover: themeVars.colors.neutral200,
        neutralSoftBgColorActive: themeVars.colors.neutral300,
        neutralSoftBgColorDisabled: themeVars.colors.neutral50,
        //outlined
        neutralOutlinedColor: themeVars.colors.neutral500,
        neutralOutlinedColorDisabled: themeVars.colors.neutral100,
        // neutralOutlinedBgColor: 'transparent',
        neutralOutlinedBgColorHover: themeVars.colors.neutral100,
        neutralOutlinedBgColorActive: themeVars.colors.neutral200,
        neutralOutlinedBorderColor: themeVars.colors.neutral200,
        neutralOutlinedBorderColorHover: themeVars.colors.neutral300,
        neutralOutlinedBorderColorActive: themeVars.colors.neutral400,
        neutralOutlinedBorderColorDisabled: themeVars.colors.neutral100,
        //subtle
        neutralSubtleColor: themeVars.colors.neutral600,
        neutralSubtleColorDisabled: themeVars.colors.neutral200,
        neutralSubtleBgColorHover: themeVars.colors.neutral100,
        neutralSubtleBgColorActive: themeVars.colors.neutral200,
        primarySolidColor: '#fff',
        primarySolidColorDisabled: '#fff',
        primarySolidBgColor: themeVars.colors.primary500,
        primarySolidBgColorHover: themeVars.colors.primary600,
        primarySolidBgColorActive: themeVars.colors.primary700,
        primarySolidBgColorDisabled: themeVars.colors.primary200,
        //soft
        primarySoftColor: themeVars.colors.primary600,
        primarySoftColorDisabled: themeVars.colors.primary300,
        primarySoftBgColor: themeVars.colors.primary100,
        primarySoftBgColorHover: themeVars.colors.primary200,
        primarySoftBgColorActive: themeVars.colors.primary300,
        primarySoftBgColorDisabled: themeVars.colors.primary50,
        //outlined
        primaryOutlinedColor: themeVars.colors.primary500,
        primaryOutlinedColorDisabled: themeVars.colors.primary100,
        primaryOutlinedBgColorHover: themeVars.colors.primary100,
        primaryOutlinedBgColorActive: themeVars.colors.primary200,
        primaryOutlinedBorderColor: themeVars.colors.primary200,
        primaryOutlinedBorderColorHover: themeVars.colors.primary300,
        primaryOutlinedBorderColorActive: themeVars.colors.primary400,
        primaryOutlinedBorderColorDisabled: themeVars.colors.primary100,
        //subtle
        primarySubtleColor: themeVars.colors.primary600,
        primarySubtleColorDisabled: themeVars.colors.primary200,
        primarySubtleBgColorHover: themeVars.colors.primary100,
        primarySubtleBgColorActive: themeVars.colors.primary200,
        //succses
        // solid
        successSolidColor: '#fff',
        successSolidColorDisabled: '#fff',
        successSolidBgColor: themeVars.colors.success500,
        successSolidBgColorHover: themeVars.colors.success600,
        successSolidBgColorActive: themeVars.colors.success700,
        successSolidBgColorDisabled: themeVars.colors.success200,
        //soft
        successSoftColor: themeVars.colors.success600,
        successSoftColorDisabled: themeVars.colors.success300,
        successSoftBgColor: themeVars.colors.success100,
        successSoftBgColorHover: themeVars.colors.success200,
        successSoftBgColorActive: themeVars.colors.success300,
        successSoftBgColorDisabled: themeVars.colors.success50,
        //outlined
        successOutlinedColor: themeVars.colors.success500,
        successOutlinedColorDisabled: themeVars.colors.success100,
        successOutlinedBgColorHover: themeVars.colors.success100,
        successOutlinedBgColorActive: themeVars.colors.success200,
        successOutlinedBorderColor: themeVars.colors.success200,
        successOutlinedBorderColorHover: themeVars.colors.success300,
        successOutlinedBorderColorActive: themeVars.colors.success400,
        successOutlinedBorderColorDisabled: themeVars.colors.success100,
        //subtle
        successSubtleColor: themeVars.colors.success600,
        successSubtleColorDisabled: themeVars.colors.success200,
        successSubtleBgColorHover: themeVars.colors.success100,
        successSubtleBgColorActive: themeVars.colors.success200,
        dangerSolidColor: '#fff',
        dangerSolidColorDisabled: '#fff',
        dangerSolidBgColor: themeVars.colors.danger500,
        dangerSolidBgColorHover: themeVars.colors.danger600,
        dangerSolidBgColorActive: themeVars.colors.danger700,
        dangerSolidBgColorDisabled: themeVars.colors.danger200,
        //soft
        dangerSoftColor: themeVars.colors.danger600,
        dangerSoftColorDisabled: themeVars.colors.danger300,
        dangerSoftBgColor: themeVars.colors.danger100,
        dangerSoftBgColorHover: themeVars.colors.danger200,
        dangerSoftBgColorActive: themeVars.colors.danger300,
        dangerSoftBgColorDisabled: themeVars.colors.danger50,
        //outlined
        dangerOutlinedColor: themeVars.colors.danger500,
        dangerOutlinedColorDisabled: themeVars.colors.danger100,
        dangerOutlinedBgColorHover: themeVars.colors.danger100,
        dangerOutlinedBgColorActive: themeVars.colors.danger200,
        dangerOutlinedBorderColor: themeVars.colors.danger200,
        dangerOutlinedBorderColorHover: themeVars.colors.danger300,
        dangerOutlinedBorderColorActive: themeVars.colors.danger400,
        dangerOutlinedBorderColorDisabled: themeVars.colors.danger100,
        //subtle
        dangerSubtleColor: themeVars.colors.danger600,
        dangerSubtleColorDisabled: themeVars.colors.danger200,
        dangerSubtleBgColorHover: themeVars.colors.danger100,
        dangerSubtleBgColorActive: themeVars.colors.danger200,
        warningSolidColor: '#fff',
        warningSolidColorDisabled: '#fff',
        warningSolidBgColor: themeVars.colors.warning500,
        warningSolidBgColorHover: themeVars.colors.warning600,
        warningSolidBgColorActive: themeVars.colors.warning700,
        warningSolidBgColorDisabled: themeVars.colors.warning200,
        //soft
        warningSoftColor: themeVars.colors.warning600,
        warningSoftColorDisabled: themeVars.colors.warning300,
        warningSoftBgColor: themeVars.colors.warning100,
        warningSoftBgColorHover: themeVars.colors.warning200,
        warningSoftBgColorActive: themeVars.colors.warning300,
        warningSoftBgColorDisabled: themeVars.colors.warning50,
        //outlined
        warningOutlinedColor: themeVars.colors.warning500,
        warningOutlinedColorDisabled: themeVars.colors.warning100,
        warningOutlinedBgColorHover: themeVars.colors.warning100,
        warningOutlinedBgColorActive: themeVars.colors.warning200,
        warningOutlinedBorderColor: themeVars.colors.warning200,
        warningOutlinedBorderColorHover: themeVars.colors.warning300,
        warningOutlinedBorderColorActive: themeVars.colors.warning400,
        warningOutlinedBorderColorDisabled: themeVars.colors.warning100,
        //subtle
        warningSubtleColor: themeVars.colors.warning600,
        warningSubtleColorDisabled: themeVars.colors.warning200,
        warningSubtleBgColorHover: themeVars.colors.warning100,
        warningSubtleBgColorActive: themeVars.colors.warning200,
        infoSolidColor: '#fff',
        infoSolidColorDisabled: '#fff',
        infoSolidBgColor: themeVars.colors.info500,
        infoSolidBgColorHover: themeVars.colors.info600,
        infoSolidBgColorActive: themeVars.colors.info700,
        infoSolidBgColorDisabled: themeVars.colors.info200,
        //soft
        infoSoftColor: themeVars.colors.info600,
        infoSoftColorDisabled: themeVars.colors.info300,
        infoSoftBgColor: themeVars.colors.info100,
        infoSoftBgColorHover: themeVars.colors.info200,
        infoSoftBgColorActive: themeVars.colors.info300,
        infoSoftBgColorDisabled: themeVars.colors.info50,
        //outlined
        infoOutlinedColor: themeVars.colors.info500,
        infoOutlinedColorDisabled: themeVars.colors.info100,
        infoOutlinedBgColorHover: themeVars.colors.info100,
        infoOutlinedBgColorActive: themeVars.colors.info200,
        infoOutlinedBorderColor: themeVars.colors.info200,
        infoOutlinedBorderColorHover: themeVars.colors.info300,
        infoOutlinedBorderColorActive: themeVars.colors.info400,
        infoOutlinedBorderColorDisabled: themeVars.colors.info100,
        //subtle
        infoSubtleColor: themeVars.colors.info600,
        infoSubtleColorDisabled: themeVars.colors.info200,
        infoSubtleBgColorHover: themeVars.colors.info100,
        infoSubtleBgColorActive: themeVars.colors.info200
    })

    //dark theme
    createGlobalTheme(THEME_ATTR_SELECTOR_DARK, colorVars, {
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
    })
}

export { createKickassTheme }

import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'

import type { TStarbaseUIThemeVars } from './createStarbaseThemeVars'
import type { TStarbaseUIThemeBreakpointTokens } from './types'

const createStarbaseStardust = (themeVars: TStarbaseUIThemeVars, breakpoints: TStarbaseUIThemeBreakpointTokens) => {
    const commonColors = {
        currentColor: 'currentColor',
        inherit: 'inherit',
        transparent: 'transparent',
        black: '#000',
        white: '#fff'
    }
    const baseColors = {
        neutral50: themeVars.colors.neutral50,
        neutral100: themeVars.colors.neutral100,
        neutral200: themeVars.colors.neutral200,
        neutral300: themeVars.colors.neutral300,
        neutral400: themeVars.colors.neutral400,
        neutral500: themeVars.colors.neutral500,
        neutral600: themeVars.colors.neutral600,
        neutral700: themeVars.colors.neutral700,
        neutral800: themeVars.colors.neutral800,
        neutral900: themeVars.colors.neutral900,
        primary50: themeVars.colors.primary50,
        primary100: themeVars.colors.primary100,
        primary200: themeVars.colors.primary200,
        primary300: themeVars.colors.primary300,
        primary400: themeVars.colors.primary400,
        primary500: themeVars.colors.primary500,
        primary600: themeVars.colors.primary600,
        primary700: themeVars.colors.primary700,
        primary800: themeVars.colors.primary800,
        primary900: themeVars.colors.primary900,
        secondary50: themeVars.colors.secondary50,
        secondary100: themeVars.colors.secondary100,
        secondary200: themeVars.colors.secondary200,
        secondary300: themeVars.colors.secondary300,
        secondary400: themeVars.colors.secondary400,
        secondary500: themeVars.colors.secondary500,
        secondary600: themeVars.colors.secondary600,
        secondary700: themeVars.colors.secondary700,
        secondary800: themeVars.colors.secondary800,
        secondary900: themeVars.colors.secondary900,
        success50: themeVars.colors.success50,
        success100: themeVars.colors.success100,
        success200: themeVars.colors.success200,
        success300: themeVars.colors.success300,
        success400: themeVars.colors.success400,
        success500: themeVars.colors.success500,
        success600: themeVars.colors.success600,
        success700: themeVars.colors.success700,
        success800: themeVars.colors.success800,
        success900: themeVars.colors.success900,
        danger50: themeVars.colors.danger50,
        danger100: themeVars.colors.danger100,
        danger200: themeVars.colors.danger200,
        danger300: themeVars.colors.danger300,
        danger400: themeVars.colors.danger400,
        danger500: themeVars.colors.danger500,
        danger600: themeVars.colors.danger600,
        danger700: themeVars.colors.danger700,
        danger800: themeVars.colors.danger800,
        danger900: themeVars.colors.danger900,
        warning50: themeVars.colors.warning50,
        warning100: themeVars.colors.warning100,
        warning200: themeVars.colors.warning200,
        warning300: themeVars.colors.warning300,
        warning400: themeVars.colors.warning400,
        warning500: themeVars.colors.warning500,
        warning600: themeVars.colors.warning600,
        warning700: themeVars.colors.warning700,
        warning800: themeVars.colors.warning800,
        warning900: themeVars.colors.warning900,
        info50: themeVars.colors.info50,
        info100: themeVars.colors.info100,
        info200: themeVars.colors.info200,
        info300: themeVars.colors.info300,
        info400: themeVars.colors.info400,
        info500: themeVars.colors.info500,
        info600: themeVars.colors.info600,
        info700: themeVars.colors.info700,
        info800: themeVars.colors.info800,
        info900: themeVars.colors.info900
    }

    const colors = {
        ...commonColors,
        ...baseColors,
        neutralSolidColor: themeVars.colors.neutralSolidColor,
        neutralSolidColorDisabled: themeVars.colors.neutralSolidColorDisabled,
        neutralSoftColor: themeVars.colors.neutralSoftColor,
        neutralSoftColorDisabled: themeVars.colors.neutralSoftColorDisabled,
        neutralOutlinedColor: themeVars.colors.neutralOutlinedColor,
        neutralOutlinedColorDisabled: themeVars.colors.neutralOutlinedColorDisabled,
        neutralSubtleColor: themeVars.colors.neutralSubtleColor,
        neutralSubtleColorDisabled: themeVars.colors.neutralSubtleColorDisabled,
        primarySolidColor: themeVars.colors.primarySolidColor,
        primarySolidColorDisabled: themeVars.colors.primarySolidColorDisabled,
        primarySoftColor: themeVars.colors.primarySoftColor,
        primarySoftColorDisabled: themeVars.colors.primarySoftColorDisabled,
        primaryOutlinedColor: themeVars.colors.primaryOutlinedColor,
        primaryOutlinedColorDisabled: themeVars.colors.primaryOutlinedColorDisabled,
        primarySubtleColor: themeVars.colors.primarySubtleColor,
        primarySubtleColorDisabled: themeVars.colors.primarySubtleColorDisabled,
        secondarySolidColor: themeVars.colors.secondarySolidColor,
        secondarySolidColorDisabled: themeVars.colors.secondarySolidColorDisabled,
        secondarySoftColor: themeVars.colors.secondarySoftColor,
        secondarySoftColorDisabled: themeVars.colors.secondarySoftColorDisabled,
        secondaryOutlinedColor: themeVars.colors.secondaryOutlinedColor,
        secondaryOutlinedColorDisabled: themeVars.colors.secondaryOutlinedColorDisabled,
        secondarySubtleColor: themeVars.colors.secondarySubtleColor,
        secondarySubtleColorDisabled: themeVars.colors.secondarySubtleColorDisabled,
        successSolidColor: themeVars.colors.successSolidColor,
        successSolidColorDisabled: themeVars.colors.successSolidColorDisabled,
        successSoftColor: themeVars.colors.successSoftColor,
        successSoftColorDisabled: themeVars.colors.successSoftColorDisabled,
        successOutlinedColor: themeVars.colors.successOutlinedColor,
        successOutlinedColorDisabled: themeVars.colors.successOutlinedColorDisabled,
        successSubtleColor: themeVars.colors.successSubtleColor,
        successSubtleColorDisabled: themeVars.colors.successSubtleColorDisabled,
        dangerSolidColor: themeVars.colors.dangerSolidColor,
        dangerSolidColorDisabled: themeVars.colors.dangerSolidColorDisabled,
        dangerSoftColor: themeVars.colors.dangerSoftColor,
        dangerSoftColorDisabled: themeVars.colors.dangerSoftColorDisabled,
        dangerOutlinedColor: themeVars.colors.dangerOutlinedColor,
        dangerOutlinedColorDisabled: themeVars.colors.dangerOutlinedColorDisabled,
        dangerSubtleColor: themeVars.colors.dangerSubtleColor,
        dangerSubtleColorDisabled: themeVars.colors.dangerSubtleColorDisabled,
        warningSolidColor: themeVars.colors.warningSolidColor,
        warningSolidColorDisabled: themeVars.colors.warningSolidColorDisabled,
        warningSoftColor: themeVars.colors.warningSoftColor,
        warningSoftColorDisabled: themeVars.colors.warningSoftColorDisabled,
        warningOutlinedColor: themeVars.colors.warningOutlinedColor,
        warningOutlinedColorDisabled: themeVars.colors.warningOutlinedColorDisabled,
        warningSubtleColor: themeVars.colors.warningSubtleColor,
        warningSubtleColorDisabled: themeVars.colors.warningSubtleColorDisabled,
        infoSolidColor: themeVars.colors.infoSolidColor,
        infoSolidColorDisabled: themeVars.colors.infoSolidColorDisabled,
        infoSoftColor: themeVars.colors.infoSoftColor,
        infoSoftColorDisabled: themeVars.colors.infoSoftColorDisabled,
        infoOutlinedColor: themeVars.colors.infoOutlinedColor,
        infoOutlinedColorDisabled: themeVars.colors.infoOutlinedColorDisabled,
        infoSubtleColor: themeVars.colors.infoSubtleColor,
        infoSubtleColorDisabled: themeVars.colors.infoSubtleColorDisabled
    }

    const backgroundColors = {
        ...commonColors,
        ...baseColors,
        appBackground: themeVars.colors.appBackground,
        surfaceBackground: themeVars.colors.surfaceBackground,
        neutralSolidBgColor: themeVars.colors.neutralSolidBgColor,
        neutralSolidBgColorHover: themeVars.colors.neutralSolidBgColorHover,
        neutralSolidBgColorActive: themeVars.colors.neutralSolidBgColorActive,
        neutralSolidBgColorDisabled: themeVars.colors.neutralSolidBgColorDisabled,
        neutralSoftBgColor: themeVars.colors.neutralSoftBgColor,
        neutralSoftBgColorHover: themeVars.colors.neutralSoftBgColorHover,
        neutralSoftBgColorActive: themeVars.colors.neutralSoftBgColorActive,
        neutralSoftBgColorDisabled: themeVars.colors.neutralSoftBgColorDisabled,
        neutralOutlinedBgColorHover: themeVars.colors.neutralOutlinedBgColorHover,
        neutralOutlinedBgColorActive: themeVars.colors.neutralOutlinedBgColorActive,
        neutralSubtleBgColorHover: themeVars.colors.neutralSubtleBgColorHover,
        neutralSubtleBgColorActive: themeVars.colors.neutralSubtleBgColorActive,
        primarySolidBgColor: themeVars.colors.primarySolidBgColor,
        primarySolidBgColorHover: themeVars.colors.primarySolidBgColorHover,
        primarySolidBgColorActive: themeVars.colors.primarySolidBgColorActive,
        primarySolidBgColorDisabled: themeVars.colors.primarySolidBgColorDisabled,
        primarySoftBgColor: themeVars.colors.primarySoftBgColor,
        primarySoftBgColorHover: themeVars.colors.primarySoftBgColorHover,
        primarySoftBgColorActive: themeVars.colors.primarySoftBgColorActive,
        primarySoftBgColorDisabled: themeVars.colors.primarySoftBgColorDisabled,
        primaryOutlinedBgColorHover: themeVars.colors.primaryOutlinedBgColorHover,
        primaryOutlinedBgColorActive: themeVars.colors.primaryOutlinedBgColorActive,
        primarySubtleBgColorHover: themeVars.colors.primarySubtleBgColorHover,
        primarySubtleBgColorActive: themeVars.colors.primarySubtleBgColorActive,
        secondarySolidBgColor: themeVars.colors.secondarySolidBgColor,
        secondarySolidBgColorHover: themeVars.colors.secondarySolidBgColorHover,
        secondarySolidBgColorActive: themeVars.colors.secondarySolidBgColorActive,
        secondarySolidBgColorDisabled: themeVars.colors.secondarySolidBgColorDisabled,
        secondarySoftBgColor: themeVars.colors.secondarySoftBgColor,
        secondarySoftBgColorHover: themeVars.colors.secondarySoftBgColorHover,
        secondarySoftBgColorActive: themeVars.colors.secondarySoftBgColorActive,
        secondarySoftBgColorDisabled: themeVars.colors.secondarySoftBgColorDisabled,
        secondaryOutlinedBgColorHover: themeVars.colors.secondaryOutlinedBgColorHover,
        secondaryOutlinedBgColorActive: themeVars.colors.secondaryOutlinedBgColorActive,
        secondarySubtleBgColorHover: themeVars.colors.secondarySubtleBgColorHover,
        secondarySubtleBgColorActive: themeVars.colors.secondarySubtleBgColorActive,
        successSolidBgColor: themeVars.colors.successSolidBgColor,
        successSolidBgColorHover: themeVars.colors.successSolidBgColorHover,
        successSolidBgColorActive: themeVars.colors.successSolidBgColorActive,
        successSolidBgColorDisabled: themeVars.colors.successSolidBgColorDisabled,
        successSoftBgColor: themeVars.colors.successSoftBgColor,
        successSoftBgColorHover: themeVars.colors.successSoftBgColorHover,
        successSoftBgColorActive: themeVars.colors.successSoftBgColorActive,
        successSoftBgColorDisabled: themeVars.colors.successSoftBgColorDisabled,
        successOutlinedBgColorHover: themeVars.colors.successOutlinedBgColorHover,
        successOutlinedBgColorActive: themeVars.colors.successOutlinedBgColorActive,
        successSubtleBgColorHover: themeVars.colors.successSubtleBgColorHover,
        successSubtleBgColorActive: themeVars.colors.successSubtleBgColorActive,
        dangerSolidBgColor: themeVars.colors.dangerSolidBgColor,
        dangerSolidBgColorHover: themeVars.colors.dangerSolidBgColorHover,
        dangerSolidBgColorActive: themeVars.colors.dangerSolidBgColorActive,
        dangerSolidBgColorDisabled: themeVars.colors.dangerSolidBgColorDisabled,
        dangerSoftBgColor: themeVars.colors.dangerSoftBgColor,
        dangerSoftBgColorHover: themeVars.colors.dangerSoftBgColorHover,
        dangerSoftBgColorActive: themeVars.colors.dangerSoftBgColorActive,
        dangerSoftBgColorDisabled: themeVars.colors.dangerSoftBgColorDisabled,
        dangerOutlinedBgColorHover: themeVars.colors.dangerOutlinedBgColorHover,
        dangerOutlinedBgColorActive: themeVars.colors.dangerOutlinedBgColorActive,
        dangerSubtleBgColorHover: themeVars.colors.dangerSubtleBgColorHover,
        dangerSubtleBgColorActive: themeVars.colors.dangerSubtleBgColorActive,
        warningSolidBgColor: themeVars.colors.warningSolidBgColor,
        warningSolidBgColorHover: themeVars.colors.warningSolidBgColorHover,
        warningSolidBgColorActive: themeVars.colors.warningSolidBgColorActive,
        warningSolidBgColorDisabled: themeVars.colors.warningSolidBgColorDisabled,
        warningSoftBgColor: themeVars.colors.warningSoftBgColor,
        warningSoftBgColorHover: themeVars.colors.warningSoftBgColorHover,
        warningSoftBgColorActive: themeVars.colors.warningSoftBgColorActive,
        warningSoftBgColorDisabled: themeVars.colors.warningSoftBgColorDisabled,
        warningOutlinedBgColorHover: themeVars.colors.warningOutlinedBgColorHover,
        warningOutlinedBgColorActive: themeVars.colors.warningOutlinedBgColorActive,
        warningSubtleBgColorHover: themeVars.colors.warningSubtleBgColorHover,
        warningSubtleBgColorActive: themeVars.colors.warningSubtleBgColorActive,
        infoSolidBgColor: themeVars.colors.infoSolidBgColor,
        infoSolidBgColorHover: themeVars.colors.infoSolidBgColorHover,
        infoSolidBgColorActive: themeVars.colors.infoSolidBgColorActive,
        infoSolidBgColorDisabled: themeVars.colors.infoSolidBgColorDisabled,
        infoSoftBgColor: themeVars.colors.infoSoftBgColor,
        infoSoftBgColorHover: themeVars.colors.infoSoftBgColorHover,
        infoSoftBgColorActive: themeVars.colors.infoSoftBgColorActive,
        infoSoftBgColorDisabled: themeVars.colors.infoSoftBgColorDisabled,
        infoOutlinedBgColorHover: themeVars.colors.infoOutlinedBgColorHover,
        infoOutlinedBgColorActive: themeVars.colors.infoOutlinedBgColorActive,
        infoSubtleBgColorHover: themeVars.colors.infoSubtleBgColorHover,
        infoSubtleBgColorActive: themeVars.colors.infoSubtleBgColorActive
    }

    const borderColors = {
        ...commonColors,
        ...baseColors,
        separatorColor: themeVars.colors.separatorColor,
        neutralOutlinedBorderColor: themeVars.colors.neutralOutlinedBorderColor,
        neutralOutlinedBorderColorHover: themeVars.colors.neutralOutlinedBorderColorHover,
        neutralOutlinedBorderColorActive: themeVars.colors.neutralOutlinedBorderColorActive,
        neutralOutlinedBorderColorDisabled: themeVars.colors.neutralOutlinedBorderColorDisabled,
        primaryOutlinedBorderColor: themeVars.colors.primaryOutlinedBorderColor,
        primaryOutlinedBorderColorHover: themeVars.colors.primaryOutlinedBorderColorHover,
        primaryOutlinedBorderColorActive: themeVars.colors.primaryOutlinedBorderColorActive,
        primaryOutlinedBorderColorDisabled: themeVars.colors.primaryOutlinedBorderColorDisabled,
        secondaryOutlinedBorderColor: themeVars.colors.secondaryOutlinedBorderColor,
        secondaryOutlinedBorderColorHover: themeVars.colors.secondaryOutlinedBorderColorHover,
        secondaryOutlinedBorderColorActive: themeVars.colors.secondaryOutlinedBorderColorActive,
        secondaryOutlinedBorderColorDisabled: themeVars.colors.secondaryOutlinedBorderColorDisabled,
        successOutlinedBorderColor: themeVars.colors.successOutlinedBorderColor,
        successOutlinedBorderColorHover: themeVars.colors.successOutlinedBorderColorHover,
        successOutlinedBorderColorActive: themeVars.colors.successOutlinedBorderColorActive,
        successOutlinedBorderColorDisabled: themeVars.colors.successOutlinedBorderColorDisabled,
        dangerOutlinedBorderColor: themeVars.colors.dangerOutlinedBorderColor,
        dangerOutlinedBorderColorHover: themeVars.colors.dangerOutlinedBorderColorHover,
        dangerOutlinedBorderColorActive: themeVars.colors.dangerOutlinedBorderColorActive,
        dangerOutlinedBorderColorDisabled: themeVars.colors.dangerOutlinedBorderColorDisabled,
        warningOutlinedBorderColor: themeVars.colors.warningOutlinedBorderColor,
        warningOutlinedBorderColorHover: themeVars.colors.warningOutlinedBorderColorHover,
        warningOutlinedBorderColorActive: themeVars.colors.warningOutlinedBorderColorActive,
        warningOutlinedBorderColorDisabled: themeVars.colors.warningOutlinedBorderColorDisabled,
        infoOutlinedBorderColor: themeVars.colors.infoOutlinedBorderColor,
        infoOutlinedBorderColorHover: themeVars.colors.infoOutlinedBorderColorHover,
        infoOutlinedBorderColorActive: themeVars.colors.infoOutlinedBorderColorActive,
        infoOutlinedBorderColorDisabled: themeVars.colors.infoOutlinedBorderColorDisabled
    }

    const colorProperties = defineProperties({
        conditions: {
            default: {},
            active: { selector: '&:active' },
            hover: { selector: '&:hover' },
            hoverActive: { selector: '&:hover:active' },
            focus: { selector: '&:focus' },
            focusWithin: { selector: '&:focus-within' },
            focusVisible: { selector: '&:focus-visible' }
        },
        defaultCondition: 'default',
        properties: {
            color: colors,
            backgroundColor: backgroundColors,
            textDecorationColor: colors,
            borderTopColor: borderColors,
            borderRightColor: borderColors,
            borderBottomColor: borderColors,
            borderLeftColor: borderColors,
            fill: colors
        },
        shorthands: {
            borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
            borderColorY: ['borderTopColor', 'borderBottomColor'],
            borderColorX: ['borderLeftColor', 'borderRightColor']
        }
    })

    const effectsProperties = defineProperties({
        conditions: {
            default: {},
            hover: { selector: '&:hover' }
        },
        defaultCondition: 'default',
        properties: {
            boxShadow: themeVars.shadows,
            opacity: {
                '0': '0',
                '5': '0.05',
                '10': '0.1',
                '20': '0.2',
                '25': '0.25',
                '30': '0.3',
                '40': '0.4',
                '50': '0.5',
                '60': '0.6',
                '70': '0.7',
                '75': '0.75',
                '80': '0.8',
                '90': '0.9',
                '95': '0.95',
                '100': '1'
            },

            backdropFilter: {
                'blur-0': 'blur(0px)',
                'blur-4': 'blur(4px)',
                'blur-8': 'blur(8px)',
                'blur-12': 'blur(12px)',
                'blur-16': 'blur(16px)',
                'blur-24': 'blur(24px)',
                'blur-40': 'blur(40px)',
                'blur-64': 'blur(64px)'
            }
        }
    })

    const staticProperties = defineProperties({
        properties: {
            boxSizing: ['border-box', 'content-box'],
            isolation: ['auto', 'isolate'],
            visibility: ['visible', 'hidden'],
            overflow: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
            overflowX: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
            overflowY: ['auto', 'hidden', 'clip', 'visible', 'scroll'],
            overscrollBehavior: ['auto', 'contain', 'none'],
            overscrollBehaviorX: ['auto', 'contain', 'none'],
            overscrollBehaviorY: ['auto', 'contain', 'none'],
            zIndex: themeVars.zIndices,
            appearance: ['none'],
            pointerEvents: ['none', 'auto'],
            resize: ['none', 'vertical', 'horizontal', 'both'],
            userSelect: ['none', 'text', 'auto', 'all'],
            cursor: [
                'auto',
                'default',
                'pointer',
                'wait',
                'text',
                'move',
                'help',
                'not-allowed',
                'none',
                'context-menu',
                'progress',
                'cell',
                'crosshair',
                'vertical-text',
                'alias',
                'copy',
                'no-drop',
                'grab',
                'grabbing',
                'all-scroll',
                'col-resize',
                'row-resize',
                'n-resize',
                'e-resize',
                's-resize',
                'w-resize',
                'ne-resize',
                'nw-resize',
                'se-resize',
                'sw-resize',
                'ew-resize',
                'ns-resize',
                'nesw-resize',
                'nwse-resize',
                'nwse-resize',
                'zoom-in',
                'zoom-out'
            ],
            borderTopLeftRadius: { ...themeVars.radii, none: '0px' },
            borderTopRightRadius: { ...themeVars.radii, none: '0px' },
            borderBottomRightRadius: { ...themeVars.radii, none: '0px' },
            borderBottomLeftRadius: { ...themeVars.radii, none: '0px' },
            borderTopWidth: themeVars.strokeWidths,
            borderRightWidth: themeVars.strokeWidths,
            borderBottomWidth: themeVars.strokeWidths,
            borderLeftWidth: themeVars.strokeWidths,
            borderTopStyle: ['solid', 'dotted', 'dashed', 'none'],
            borderRightStyle: ['solid', 'dotted', 'dashed', 'none'],
            borderBottomStyle: ['solid', 'dotted', 'dashed', 'none'],
            borderLeftStyle: ['solid', 'dotted', 'dashed', 'none'],
            outlineWidth: themeVars.strokeWidths,
            outlineStyle: ['none', 'solid'],
            outlineOffset: themeVars.strokeWidths,
            listStyleType: ['none', 'disc', 'decimal'],
            listStylePosition: ['inside', 'outside'],
            fontVariantNumeric: [
                'normal',
                'ordinal',
                'slashed-zero',
                'liniang-nums',
                'oldstyle-nums',
                'proprtional-nums',
                'tabular-nums',
                'diagonal-fractions',
                'stacked-fractions'
            ],
            transitionTimingFunction: {
                accelerateMax: themeVars.transitions.timingAccelerateMax,
                accelerateMid: themeVars.transitions.timingAccelerateMid,
                accelerateMin: themeVars.transitions.timingAccelerateMin,
                decelerateMax: themeVars.transitions.timingDecelerateMax,
                decelerateMid: themeVars.transitions.timingDecelerateMid,
                decelerateMin: themeVars.transitions.timingDecelerateMin,
                easeMax: themeVars.transitions.timingEaseMax,
                ease: themeVars.transitions.timingEase,
                linear: themeVars.transitions.timingLinear
            },

            transitionDuration: {
                fastest: themeVars.transitions.durationFastest,
                faster: themeVars.transitions.durationFaster,
                fast: themeVars.transitions.durationFast,
                normal: themeVars.transitions.durationNormal,
                slow: themeVars.transitions.durationSlow,
                slower: themeVars.transitions.durationSlower,
                slowest: themeVars.transitions.durationSlowest
            }
        },
        shorthands: {
            borderRadius: [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomRightRadius',
                'borderBottomLeftRadius'
            ],
            borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
            borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
            borderLeftRadius: ['borderTopLeftRadius', 'borderBottomLeftRadius'],
            borderRightRadius: ['borderTopRightRadius', 'borderBottomRightRadius'],
            borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
            borderWidthX: ['borderTopWidth', 'borderBottomWidth'],
            borderWidthY: ['borderLeftWidth', 'borderRightWidth'],
            borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
            borderStyleX: ['borderTopStyle', 'borderBottomStyle'],
            borderStyleY: ['borderLeftStyle', 'borderRightStyle']
        }
    })

    const responsiveProperties = defineProperties({
        conditions: {
            mobile: {},
            xs: { '@media': `screen and (min-width: ${breakpoints.xs}px)` },
            sm: { '@media': `screen and (min-width: ${breakpoints.sm}px)` },
            md: { '@media': `screen and (min-width: ${breakpoints.md}px)` },
            lg: { '@media': `screen and (min-width: ${breakpoints.lg}px)` },
            xl: { '@media': `screen and (min-width: ${breakpoints.xl}px)` }
        },
        defaultCondition: 'mobile',
        responsiveArray: ['mobile', 'xs', 'sm', 'md', 'lg', 'xl'],
        //https://github.com/seek-oss/vanilla-extract/issues/728
        properties: {
            /**LAYOUT PROPERTIES START**/

            position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            display: ['none', 'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid'],
            objectFit: ['contain', 'cover', 'fill', 'none', 'scale-down'],
            objectPosition: {
                bottom: 'bottom',
                center: 'center',
                left: 'left',
                leftBottom: 'left bottom',
                leftTop: 'left top',
                right: 'right',
                rightBottom: 'right bottom',
                rightTop: 'right top',
                top: 'top'
            },

            top: { ...themeVars.space, none: '0px' },
            right: { ...themeVars.space, none: '0px' },
            bottom: { ...themeVars.space, none: '0px' },
            left: { ...themeVars.space, none: '0px' },

            flexBasis: {
                full: '100%',
                '1/2': '50%',
                '1/3': '33.333333%',
                '2/3': '66.666667%',
                '1/4': '25%',
                '2/4': '50%',
                '3/4': '75%',
                '1/5': '20%',
                '2/5': '40%',
                '3/5': '60%',
                '4/5': '80%',
                '1/6': '16.666667%',
                '2/6': '33.333333%',
                '3/6': '50%',
                '4/6': '66.666667%',
                '5/6': '83.333333%',
                '1/12': '8.333333%',
                '2/12': '16.666667%',
                '3/12': '25%',
                '4/12': '33.333333%',
                '5/12': '41.666667%',
                '6/12': '50%',
                '7/12': '58.333333%',
                '8/12': '66.666667%',
                '9/12': '75%',
                '10/12': '83.333333%',
                '11/12': '91.666667%'
            },
            flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
            flexWrap: ['wrap', 'wrap-reverse', 'nowrap'],
            flex: {
                flex1: '1 1 0%',
                auto: '1 1 auto',
                initial: '0 1 auto',
                none: 'none'
            },
            flexGrow: ['1', '0'],
            flexShrink: ['1', '0'],
            justifyContent: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
            justifyItems: ['start', 'end', 'center', 'stretch'],
            justifySelf: ['auto', 'start', 'end', 'center', 'stretch'],
            alignContent: ['center', 'flex-start', 'flex-end', 'space-around', 'space-between', 'space-evenly'],
            alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
            alignSelf: ['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
            placeContent: ['center', 'start', 'end', 'stretch', 'space-between', 'space-around', 'space-evenly'],
            placeItems: ['start', 'end', 'center', 'stretch'],
            placeSelf: ['auto', 'start', 'end', 'center', 'stretch'],
            order: {
                '0': '0',
                '1': '1',
                '2': '2',
                '3': '3',
                '4': '4',
                '5': '5',
                '6': '6',
                '7': '7',
                '8': '8',
                '9': '9',
                '10': '10',
                '11': '11',
                '12': '12',
                first: '-9999',
                last: '9999'
            },
            gridTemplateColumns: {
                none: 'none',
                '1': 'repeat(1, minmax(0, 1fr))',
                '2': 'repeat(2, minmax(0, 1fr))',
                '3': 'repeat(3, minmax(0, 1fr))',
                '4': 'repeat(4, minmax(0, 1fr))',
                '5': 'repeat(5, minmax(0, 1fr))',
                '6': 'repeat(6, minmax(0, 1fr))',
                '7': 'repeat(7, minmax(0, 1fr))',
                '8': 'repeat(8, minmax(0, 1fr))',
                '9': 'repeat(9, minmax(0, 1fr))',
                '10': 'repeat(10, minmax(0, 1fr))',
                '11': 'repeat(11, minmax(0, 1fr))',
                '12': 'repeat(12, minmax(0, 1fr))'
            },
            gridColumnStart: [
                'auto',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                'span 1',
                'span 2',
                'span 3',
                'span 4',
                'span 5',
                'span 6',
                'span 7',
                'span 8',
                'span 9',
                'span 10',
                'span 11',
                'span 12'
            ],
            gridColumnEnd: [
                'auto',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13',
                'span 1',
                'span 2',
                'span 3',
                'span 4',
                'span 5',
                'span 6',
                'span 7',
                'span 8',
                'span 9',
                'span 10',
                'span 11',
                'span 12'
            ],
            gridTemplateRows: {
                none: 'none',
                '1': 'repeat(1, minmax(0, 1fr))',
                '2': 'repeat(2, minmax(0, 1fr))',
                '3': 'repeat(3, minmax(0, 1fr))',
                '4': 'repeat(4, minmax(0, 1fr))',
                '5': 'repeat(5, minmax(0, 1fr))',
                '6': 'repeat(6, minmax(0, 1fr))'
            },
            gridRowStart: [
                'auto',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                'span 1',
                'span 2',
                'span 3',
                'span 4',
                'span 5',
                'span 6'
            ],
            gridRowEnd: [
                'auto',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                'span 1',
                'span 2',
                'span 3',
                'span 4',
                'span 5',
                'span 6'
            ],
            gridAutoFlow: {
                row: 'row',
                column: 'column',
                dense: 'dense',
                rowDense: 'row dense',
                columnDense: 'column dense'
            },
            gridAutoColumns: {
                auto: 'auto',
                min: 'min-content',
                max: 'max-content',
                fr: 'minmax(0, 1fr)'
            },
            gridAutoRows: {
                auto: 'auto',
                min: 'min-content',
                max: 'max-content',
                fr: 'minmax(0, 1fr)'
            },
            columnGap: themeVars.space,
            rowGap: themeVars.space,

            paddingTop: themeVars.space,
            paddingBottom: themeVars.space,
            paddingLeft: themeVars.space,
            paddingRight: themeVars.space,
            paddingBlockStart: themeVars.space,
            paddingBlockEnd: themeVars.space,
            paddingInlineStart: themeVars.space,
            paddingInlineEnd: themeVars.space,
            marginTop: themeVars.space,
            marginRight: themeVars.space,
            marginBottom: themeVars.space,
            marginLeft: themeVars.space,
            width: { ...themeVars.sizes, full: '100%', fit: 'fit-content', em: '1em' },
            minWidth: { ...themeVars.sizes, full: '100%' },
            maxWidth: { ...themeVars.sizes, full: '100%' },
            height: { ...themeVars.sizes, full: '100%', fit: 'fit-content', em: '1em' },
            minHeight: { ...themeVars.sizes, full: '100%' },
            maxHeight: { ...themeVars.sizes, full: '100%' },

            fontFamily: { ...themeVars.fonts, inherit: 'inherit' },
            fontWeight: { ...themeVars.fontWeights, inherit: 'inherit' },
            fontSize: { ...themeVars.fontSizes, inherit: 'inherit' },
            lineHeight: { ...themeVars.lineHeights, inherit: 'inherit' },
            letterSpacing: themeVars.letterSpacings,
            fontStyle: ['italic', 'normal', 'inherit'],

            textAlign: ['left', 'center', 'right', 'justify', 'start', 'end'],
            textDecoration: ['underline', 'overline', 'line-through', 'none'],
            textDecorationStyle: ['solid', 'double', 'dotted', 'dashed', 'wavy'],
            textDecorationThickness: themeVars.sizes,
            textUnderlineOffset: themeVars.space,
            textTransform: ['none', 'uppercase', 'lowercase', 'capitalize'],
            textOverflow: ['clip', 'elipsis'],
            textIndent: themeVars.space,
            verticalAlign: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
            whiteSpace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap'],
            wordBreak: ['normal', 'break-word', 'keep-all', 'break-all'],

            backgroundAttachment: ['fixed', 'local', 'scroll'],
            backgroundClip: ['border-box', 'padding-box', 'content-box', 'text'],
            backgroundPosition: {
                center: 'center',
                bottom: 'bottom',
                top: 'top',
                left: 'left',
                right: 'right',
                leftBottom: 'left bottom',
                leftTop: 'left top',
                rightBottom: 'right bottom',
                rightTop: 'right top'
            },
            backgroundRepeat: ['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'round', 'space'],
            backgroundSize: ['auto', 'cover', 'contain'],
            backgroundImage: ['none']
        },
        shorthands: {
            inset: ['top', 'right', 'bottom', 'left'],
            insetX: ['left', 'right'],
            insetY: ['top', 'bottom'],

            gridColumn: ['gridColumnStart', 'gridColumnEnd'],
            gridRow: ['gridRowStart', 'gridRowEnd'],
            gap: ['rowGap', 'columnGap'],

            padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
            paddingX: ['paddingLeft', 'paddingRight'],
            paddingY: ['paddingTop', 'paddingBottom'],
            paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
            paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],
            margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
            marginX: ['marginLeft', 'marginRight'],
            marginY: ['marginTop', 'marginBottom'],
            size: ['width', 'height']
        }
    })

    const stardust = createSprinkles(responsiveProperties, colorProperties, staticProperties, effectsProperties)

    return stardust
}

export { createStarbaseStardust }

import type * as Stitches from '@stitches/react'
import { createStitches } from '@stitches/react'

const { styled, globalCss, keyframes, getCssText } = createStitches({
    media: {
        bp1: '(min-width: 320px)',
        bp2: '(min-width: 480px)',
        bp3: '(min-width: 640px)',
        bp4: '(min-width: 960px)',
        bp5: '(min-width: 1280px)',
        bp6: '(min-width: 1400px)',
        bp7: '(min-width: 1920px)'
    },
    theme: {
        fonts: {
            primary: 'Arial'
        },
        fontSizes: {
            htmlFontSize: '62.5%',
            bodyFontSize: '1.6rem',
            1: '1rem', //10px
            2: '1.2rem', //12px
            3: '1.4rem', //14px
            4: '1.6rem', //16px
            5: '1.8rem', //18px
            6: '2rem', //20px
            7: '2.4rem', //24px
            8: '2.8rem', //28px
            9: '3.2rem', //32px
            10: '4.2rem', //42px
            11: '6.8rem' //68px
        },
        fontWeights: {
            regular: 400,
            semiBold: 600,
            bold: 700
        },

        space: {
            1: '0.2rem', //2px
            2: '0.4rem', //4px
            3: '0.8rem', //8px
            4: '1.2rem', //12px
            5: '1.6rem', //16px
            6: '2rem', //20px
            7: '2.4rem', //24px
            8: '3.2rem', //32px
            9: '3.6rem', //36px
            10: '4.8rem', //48px
            11: '5.6rem', //56px
            12: '6.4rem', //64px
            13: '8.0rem' //80px
        },
        sizes: {
            1: '0.2rem', //2px
            2: '0.4rem', //4px
            3: '0.8rem', //8px
            4: '1.2rem', //12px
            5: '1.6rem', //16px
            6: '2rem', //20px
            7: '2.4rem', //24px
            8: '3.2rem', //32px
            9: '3.6rem', //36px
            10: '4.8rem', //48px
            11: '5.6rem', //56px
            12: '6.4rem', //64px
            13: '8.0rem' //80px
        },
        radii: {
            1: '4px',
            2: '6px',
            3: '8px',
            4: '12px',
            round: '50%',
            pill: '9999px'
        },
        shadows: {
            elevation1: '2px 4px 24px rgba(0, 0, 0, 0.1)'
        },
        colors: {
            white: '#fff',
            background: '$white'
        }
    },
    utils: {
        p: (value: Stitches.PropertyValue<'padding'>) => ({
            padding: value
        }),
        pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingTop: value
        }),
        pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
            paddingRight: value
        }),
        pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
            paddingBottom: value
        }),
        pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
            paddingLeft: value
        }),
        px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
            paddingLeft: value,
            paddingRight: value
        }),
        py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
            paddingTop: value,
            paddingBottom: value
        }),

        m: (value: Stitches.PropertyValue<'margin'>) => ({
            margin: value
        }),
        mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginTop: value
        }),
        mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
            marginRight: value
        }),
        mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
            marginBottom: value
        }),
        ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
            marginLeft: value
        }),
        mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
            marginLeft: value,
            marginRight: value
        }),
        my: (value: Stitches.PropertyValue<'marginTop'>) => ({
            marginTop: value,
            marginBottom: value
        }),

        ta: (value: Stitches.PropertyValue<'textAlign'>) => ({ textAlign: value }),

        fd: (value: Stitches.PropertyValue<'flexDirection'>) => ({ flexDirection: value }),
        fw: (value: Stitches.PropertyValue<'flexWrap'>) => ({ flexWrap: value }),

        ai: (value: Stitches.PropertyValue<'alignItems'>) => ({ alignItems: value }),
        ac: (value: Stitches.PropertyValue<'alignContent'>) => ({ alignContent: value }),
        jc: (value: Stitches.PropertyValue<'justifyContent'>) => ({ justifyContent: value }),
        as: (value: Stitches.PropertyValue<'alignSelf'>) => ({ alignSelf: value }),
        fg: (value: Stitches.PropertyValue<'flexGrow'>) => ({ flexGrow: value }),
        fs: (value: Stitches.PropertyValue<'flexShrink'>) => ({ flexShrink: value }),
        fb: (value: Stitches.PropertyValue<'flexBasis'>) => ({ flexBasis: value }),

        bc: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
            backgroundColor: value
        }),

        br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
            borderRadius: value
        }),
        btrr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
            borderTopRightRadius: value
        }),
        bbrr: (value: Stitches.PropertyValue<'borderBottomRightRadius'>) => ({
            borderBottomRightRadius: value
        }),
        bblr: (value: Stitches.PropertyValue<'borderBottomLeftRadius'>) => ({
            borderBottomLeftRadius: value
        }),
        btlr: (value: Stitches.PropertyValue<'borderTopLeftRadius'>) => ({
            borderTopLeftRadius: value
        }),

        bs: (value: Stitches.PropertyValue<'boxShadow'>) => ({ boxShadow: value }),

        lh: (value: Stitches.PropertyValue<'lineHeight'>) => ({ lineHeight: value }),

        ox: (value: Stitches.PropertyValue<'overflowX'>) => ({ overflowX: value }),
        oy: (value: Stitches.PropertyValue<'overflowY'>) => ({ overflowY: value }),

        pe: (value: Stitches.PropertyValue<'pointerEvents'>) => ({ pointerEvents: value }),
        us: (value: Stitches.PropertyValue<'userSelect'>) => ({
            WebkitUserSelect: value,
            userSelect: value
        }),

        userSelect: (value: Stitches.PropertyValue<'userSelect'>) => ({
            WebkitUserSelect: value,
            userSelect: value
        }),

        size: (value: Stitches.PropertyValue<'width'>) => ({
            width: value,
            height: value
        }),

        appearance: (value: Stitches.PropertyValue<'appearance'>) => ({
            WebkitAppearance: value,
            appearance: value
        }),
        backgroundClip: (value: Stitches.PropertyValue<'backgroundClip'>) => ({
            WebkitBackgroundClip: value,
            backgroundClip: value
        })
    }
})

const injectGlobalStyles = globalCss({
    // '@import': ['url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap")'],
    '*,*::before,*::after': {
        boxSizing: 'border-box',
        margin: 0
    },

    html: {
        fontSize: '$htmlFontSize',
        textSizeAdjust: '100%'
    },
    body: {
        minHeight: '100vh',
        backgroundColor: '$background',
        fontSize: '$bodyFontSize',
        fontFamily: '$primary',
        lineHeight: '1.5',
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale'
    },
    '#__next': {
        minHeight: '100vh',
        position: 'relative',
        isolation: 'isolate'
    }
})

export { getCssText, injectGlobalStyles, keyframes, styled }

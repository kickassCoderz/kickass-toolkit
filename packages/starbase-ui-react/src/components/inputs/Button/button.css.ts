import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { stardust } from '../../../theme'

const buttonBlueprint = recipe({
    base: [
        { minWidth: '6rem', transitionProperty: 'border-color,color,background-color' },
        stardust({
            appearance: 'none',
            userSelect: 'none',
            boxSizing: 'border-box',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'fit',
            cursor: 'pointer',
            fontFamily: 'body',
            fontWeight: 'bold',
            transitionTimingFunction: 'ease',
            transitionDuration: 'faster'
        })
    ],

    variants: {
        fullWidth: {
            true: stardust({ width: 'full' })
        },
        size: {
            sm: stardust({
                paddingInline: 'sm',
                paddingBlock: 'xs6',
                minHeight: 'xl4',
                fontSize: 'sm'
            }),
            md: stardust({
                paddingInline: 'md',
                paddingBlock: 'xs5',
                minHeight: 'xl5',
                fontSize: 'sm'
            }),
            lg: stardust({
                paddingInline: 'xl2',
                paddingBlock: 'xs4',
                minHeight: 'xl6',
                fontSize: 'md'
            })
        },
        shape: {
            square: stardust({
                borderRadius: 'none'
            }),
            rounded: stardust({
                borderRadius: 'sm'
            }),
            circular: stardust({
                borderRadius: 'circular'
            })
        },
        variant: {
            solid: stardust({
                borderStyle: 'none'
            }),
            soft: stardust({
                borderStyle: 'none'
            }),
            outlined: stardust({
                borderStyle: 'solid',
                borderWidth: 'sm'
            }),
            subtle: stardust({
                borderStyle: 'none'
            })
        },
        color: {
            neutral: {},
            primary: {},
            secondary: {},
            success: {},
            danger: {},
            warning: {},
            info: {}
        }
    },
    compoundVariants: [
        {
            variants: {
                variant: 'solid',
                color: 'neutral'
            },
            style: stardust({
                color: 'neutralSolidColor',
                backgroundColor: {
                    default: 'neutralSolidBgColor',
                    hover: 'neutralSolidBgColorHover',
                    active: 'neutralSolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'primary'
            },
            style: stardust({
                color: 'primarySolidColor',
                backgroundColor: {
                    default: 'primarySolidBgColor',
                    hover: 'primarySolidBgColorHover',
                    active: 'primarySolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'secondary'
            },
            style: stardust({
                color: 'secondarySolidColor',
                backgroundColor: {
                    default: 'secondarySolidBgColor',
                    hover: 'secondarySolidBgColorHover',
                    active: 'secondarySolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'success'
            },
            style: stardust({
                color: 'successSolidColor',
                backgroundColor: {
                    default: 'successSolidBgColor',
                    hover: 'successSolidBgColorHover',
                    active: 'successSolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'danger'
            },
            style: stardust({
                color: 'dangerSolidColor',
                backgroundColor: {
                    default: 'dangerSolidBgColor',
                    hover: 'dangerSolidBgColorHover',
                    active: 'dangerSolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'warning'
            },
            style: stardust({
                color: 'warningSolidColor',
                backgroundColor: {
                    default: 'warningSolidBgColor',
                    hover: 'warningSolidBgColorHover',
                    active: 'warningSolidBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'solid',
                color: 'info'
            },
            style: stardust({
                color: 'infoSolidColor',
                backgroundColor: {
                    default: 'infoSolidBgColor',
                    hover: 'infoSolidBgColorHover',
                    active: 'infoSolidBgColorActive'
                }
            })
        },
        //soft
        {
            variants: {
                variant: 'soft',
                color: 'neutral'
            },
            style: stardust({
                color: 'neutralSoftColor',
                backgroundColor: {
                    default: 'neutralSoftBgColor',
                    hover: 'neutralSoftBgColorHover',
                    active: 'neutralSoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'primary'
            },
            style: stardust({
                color: 'primarySoftColor',
                backgroundColor: {
                    default: 'primarySoftBgColor',
                    hover: 'primarySoftBgColorHover',
                    active: 'primarySoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'secondary'
            },
            style: stardust({
                color: 'secondarySoftColor',
                backgroundColor: {
                    default: 'secondarySoftBgColor',
                    hover: 'secondarySoftBgColorHover',
                    active: 'secondarySoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'success'
            },
            style: stardust({
                color: 'successSoftColor',
                backgroundColor: {
                    default: 'successSoftBgColor',
                    hover: 'successSoftBgColorHover',
                    active: 'successSoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'danger'
            },
            style: stardust({
                color: 'dangerSoftColor',
                backgroundColor: {
                    default: 'dangerSoftBgColor',
                    hover: 'dangerSoftBgColorHover',
                    active: 'dangerSoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'warning'
            },
            style: stardust({
                color: 'warningSoftColor',
                backgroundColor: {
                    default: 'warningSoftBgColor',
                    hover: 'warningSoftBgColorHover',
                    active: 'warningSoftBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'soft',
                color: 'info'
            },
            style: stardust({
                color: 'infoSoftColor',
                backgroundColor: {
                    default: 'infoSoftBgColor',
                    hover: 'infoSoftBgColorHover',
                    active: 'infoSoftBgColorActive'
                }
            })
        },
        //outlined
        {
            variants: {
                variant: 'outlined',
                color: 'neutral'
            },
            style: stardust({
                color: 'neutralOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'neutralOutlinedBgColorHover',
                    active: 'neutralOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'neutralOutlinedBorderColor',
                    hover: 'neutralOutlinedBorderColorHover',
                    active: 'neutralOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'primary'
            },
            style: stardust({
                color: 'primaryOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'primaryOutlinedBgColorHover',
                    active: 'primaryOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'primaryOutlinedBorderColor',
                    hover: 'primaryOutlinedBorderColorHover',
                    active: 'primaryOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'secondary'
            },
            style: stardust({
                color: 'secondaryOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'secondaryOutlinedBgColorHover',
                    active: 'secondaryOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'secondaryOutlinedBorderColor',
                    hover: 'secondaryOutlinedBorderColorHover',
                    active: 'secondaryOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'success'
            },
            style: stardust({
                color: 'successOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'successOutlinedBgColorHover',
                    active: 'successOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'successOutlinedBorderColor',
                    hover: 'successOutlinedBorderColorHover',
                    active: 'successOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'danger'
            },
            style: stardust({
                color: 'dangerOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'dangerOutlinedBgColorHover',
                    active: 'dangerOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'dangerOutlinedBorderColor',
                    hover: 'dangerOutlinedBorderColorHover',
                    active: 'dangerOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'warning'
            },
            style: stardust({
                color: 'warningOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'warningOutlinedBgColorHover',
                    active: 'warningOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'warningOutlinedBorderColor',
                    hover: 'warningOutlinedBorderColorHover',
                    active: 'warningOutlinedBorderColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'outlined',
                color: 'info'
            },
            style: stardust({
                color: 'infoOutlinedColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'infoOutlinedBgColorHover',
                    active: 'infoOutlinedBgColorActive'
                },
                borderColor: {
                    default: 'infoOutlinedBorderColor',
                    hover: 'infoOutlinedBorderColorHover',
                    active: 'infoOutlinedBorderColorActive'
                }
            })
        },
        //subtle
        {
            variants: {
                variant: 'subtle',
                color: 'neutral'
            },
            style: stardust({
                color: 'neutralSubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'neutralSubtleBgColorHover',
                    active: 'neutralSubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'primary'
            },
            style: stardust({
                color: 'primarySubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'primarySubtleBgColorHover',
                    active: 'primarySubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'secondary'
            },
            style: stardust({
                color: 'secondarySubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'secondarySubtleBgColorHover',
                    active: 'secondarySubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'success'
            },
            style: stardust({
                color: 'successSubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'successSubtleBgColorHover',
                    active: 'successSubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'danger'
            },
            style: stardust({
                color: 'dangerSubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'dangerSubtleBgColorHover',
                    active: 'dangerSubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'warning'
            },
            style: stardust({
                color: 'warningSubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'warningSubtleBgColorHover',
                    active: 'warningSubtleBgColorActive'
                }
            })
        },
        {
            variants: {
                variant: 'subtle',
                color: 'info'
            },
            style: stardust({
                color: 'infoSubtleColor',
                backgroundColor: {
                    default: 'transparent',
                    hover: 'infoSubtleBgColorHover',
                    active: 'infoSubtleBgColorActive'
                }
            })
        }
    ]
})

export type TButtonBlueprint = RecipeVariants<typeof buttonBlueprint>

export { buttonBlueprint }

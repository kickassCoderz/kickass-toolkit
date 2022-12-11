import { recipe, RecipeVariants } from '@vanilla-extract/recipes'

import { sprinkles } from '../../../theme'

const buttonBlueprint = recipe({
    base: [
        { minWidth: '6rem', transitionProperty: 'border-color,color,background-color' },
        sprinkles({
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
            transitionDuration: 'faster',
            lineHeight: 'none'
        })
    ],

    variants: {
        fullWidth: {
            true: sprinkles({ width: 'full' })
        },
        size: {
            sm: sprinkles({
                paddingInline: 'sm',
                paddingBlock: 'xs6',
                minHeight: 'xl4',
                fontSize: 'sm'
            }),
            md: sprinkles({
                paddingInline: 'md',
                paddingBlock: 'xs5',
                minHeight: 'xl5',
                fontSize: 'sm'
            }),
            lg: sprinkles({
                paddingInline: 'xl2',
                paddingBlock: 'xs4',
                minHeight: 'xl6',
                fontSize: 'md'
            })
        },
        shape: {
            square: sprinkles({
                borderRadius: 'none'
            }),
            rounded: sprinkles({
                borderRadius: 'sm'
            }),
            circular: sprinkles({
                borderRadius: 'circular'
            })
        },
        variant: {
            solid: sprinkles({
                borderStyle: 'none'
            }),
            soft: sprinkles({
                borderStyle: 'none'
            }),
            outlined: sprinkles({
                borderStyle: 'solid',
                borderWidth: 'sm'
            }),
            subtle: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
                color: 'success'
            },
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
                color: 'success'
            },
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
                color: 'success'
            },
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
                color: 'success'
            },
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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
            style: sprinkles({
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

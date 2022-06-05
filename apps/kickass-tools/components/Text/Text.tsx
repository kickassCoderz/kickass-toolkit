import { styled } from '../../stitches.config'

const Text = styled('p', {
    margin: 0,
    display: 'block',
    lineHeight: '1',
    fontVariantNumeric: 'tabular-nums',

    variants: {
        variant: {
            hero: {
                fontSize: '$11'
            },
            h1: {
                fontSize: '$10'
            },
            h2: {
                fontSize: '$9'
            },
            h3: {
                fontSize: '$8'
            },
            h4: {
                fontSize: '$7'
            },
            h5: {
                fontSize: '$6'
            },
            h6: {
                fontSize: '$5'
            },
            paragraph: {
                fontSize: '$4'
            }
        },
        size: {
            1: {
                fontSize: '$1'
            },
            2: {
                fontSize: '$2'
            },
            3: {
                fontSize: '$3'
            },
            4: {
                fontSize: '$4'
            },
            5: {
                fontSize: '$5'
            },
            6: {
                fontSize: '$6'
            },
            7: {
                fontSize: '$7'
            },
            8: {
                fontSize: '$8'
            },
            9: {
                fontSize: '$9'
            },
            10: {
                fontSize: '$10'
            },
            11: {
                fontSize: '$11'
            }
        },
        weight: {
            regular: {
                fontWeight: '$regular'
            },
            semiBold: {
                fontWeight: '$semiBold'
            },
            bold: {
                fontWeight: '$bold'
            }
        }
    }
})

export { Text }

import React, { forwardRef, useCallback, useMemo } from 'react'

import { CollapserProvider, useCollapserContext } from '../Collapser/CollapserProvider'
import { Slot } from '../Slot'
import { useAccordionContext } from './AccordionProvider'

type TAccordionItemViewProps = React.ComponentPropsWithoutRef<'li'>

type TAccordionItemRootProps = TAccordionItemViewProps & {
    asController?: boolean
}

type TAccordionItemProps = TAccordionItemRootProps & {
    value: string
}

const AccordionItemView = forwardRef<HTMLLIElement, TAccordionItemViewProps>((props, ref) => {
    return <li ref={ref} {...props} />
})

AccordionItemView.displayName = 'AccordionItemView'

const AccordionItemRoot = forwardRef<React.ElementRef<typeof AccordionItemView>, TAccordionItemRootProps>(
    ({ asController, ...restProps }, ref) => {
        const { dataState, dataDisabled } = useCollapserContext()

        const Component = asController ? Slot : AccordionItemView

        return <Component ref={ref} {...restProps} data-state={dataState} data-disabled={dataDisabled} />
    }
)

AccordionItemRoot.displayName = 'AccordionItemRoot'

const AccordionItem = forwardRef<React.ElementRef<typeof AccordionItemRoot>, TAccordionItemProps>(
    ({ value, ...restProps }, ref) => {
        const { isDisabled, activeValues, handleChange } = useAccordionContext()

        const isOpen = useMemo(() => activeValues.includes(value), [activeValues, value])

        const toggleOpen = useCallback(() => {
            handleChange(value)
        }, [value, handleChange])

        return (
            <CollapserProvider isDisabled={isDisabled} isOpen={isOpen} toggleOpen={toggleOpen}>
                <AccordionItemRoot ref={ref} {...restProps} />
            </CollapserProvider>
        )
    }
)

AccordionItem.displayName = 'AccordionItem'

export { AccordionItem }

export type { TAccordionItemProps }

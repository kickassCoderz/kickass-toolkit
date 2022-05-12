import { forwardRef, useCallback } from 'react'

import { Slot } from '../Slot'
import { useCombinedControlState } from '../utils'
import { getDataDisabled, getDataState } from '../utils/helpers'
import { AccordionProvider } from './AccordionProvider'

type TAccordionRootViewBaseProps = React.ComponentPropsWithoutRef<'ul'>

type TAccordionRootViewProps = {
    dataState: string
    dataDisabled?: string
}

type TAccordionRootBaseProps = {
    mode: 'single' | 'multiple'
    values?: string[]
    onValuesChange?: () => void
    defaultExpandedValues?: string[]
    isDisabled?: boolean
    asController?: boolean
}

type TAccordionRootProps = TAccordionRootViewBaseProps & TAccordionRootBaseProps

const AccordionRootView = forwardRef<HTMLUListElement, TAccordionRootViewProps>(
    ({ dataState, dataDisabled, ...restProps }, ref) => {
        return <ul ref={ref} {...restProps} data-state={dataState} data-disabled={dataDisabled} />
    }
)

AccordionRootView.displayName = 'AccordionRootView'

const AccordionRoot = forwardRef<React.ElementRef<typeof AccordionRootView>, TAccordionRootProps>(
    ({ asController, values, onValuesChange, defaultExpandedValues, isDisabled, mode, ...restProps }, ref) => {
        const [activeValues, setActiveValues] = useCombinedControlState<string[]>({
            state: values,
            defaultState: defaultExpandedValues ?? [],
            handler: onValuesChange
        })
        const Component = asController ? Slot : AccordionRootView

        const handleChange = useCallback(
            (nextValue: string) => {
                if (mode === 'multiple') {
                    setActiveValues(previousValues => {
                        if (previousValues?.includes(nextValue)) {
                            return previousValues?.filter(previousValue => previousValue !== nextValue) || []
                        }

                        return [...(previousValues || []), nextValue]
                    })
                } else {
                    setActiveValues([nextValue])
                }
            },
            [setActiveValues, mode]
        )

        return (
            <AccordionProvider isDisabled={isDisabled} activeValues={activeValues} handleChange={handleChange}>
                <Component
                    ref={ref}
                    {...restProps}
                    dataState={getDataState(!!activeValues?.length)}
                    dataDisabled={getDataDisabled(isDisabled)}
                />
            </AccordionProvider>
        )
    }
)

AccordionRoot.displayName = 'AccordionRoot'

export { AccordionRoot }

export type { TAccordionRootProps }

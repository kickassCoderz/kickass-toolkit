import type { TSetStateFn } from '@kickass-coderz/hooks'
import { useCombinedControlState } from '@kickass-coderz/hooks'
import { forwardRef, useCallback } from 'react'

import { Slot } from '../Slot'
import { getDataDisabled, getDataState } from '../utils'
import { AccordionProvider } from './AccordionProvider'

type TAccordionRootViewBaseProps = React.ComponentPropsWithoutRef<'ul'>

type TAccordionRootViewProps = TAccordionRootViewBaseProps & {
    dataState: string
    dataDisabled?: string
}

type TAccordionRootBaseProps = {
    mode: 'single' | 'singleCollapsible' | 'multiple' | 'multipleCollapsible'
    values?: string[]
    onValuesChange?: (nextValue?: string[]) => void
    defaultExpandedValues?: string[]
    isDisabled?: boolean
    asController?: boolean
}

type TAccordionRootProps = TAccordionRootViewBaseProps & TAccordionRootBaseProps

type TModeCallback = (nextStateOrSetter: string[] | TSetStateFn<string[]>) => void

type TModeHandler = (nextValue: string, callback: TModeCallback) => void

const handleSingleMode: TModeHandler = (nextValue, callback) => {
    callback(prevValues => {
        if (!prevValues || prevValues?.length > 1) {
            return [nextValue]
        }

        if (prevValues?.includes(nextValue)) {
            return prevValues
        }

        return [nextValue]
    })
}

const handleSingleCollapsibleMode: TModeHandler = (nextValue, callback) => {
    callback(prevValues => {
        if (prevValues?.includes(nextValue)) {
            return []
        }

        return [nextValue]
    })
}

const handleMultipleMode: TModeHandler = (nextValue, callback) => {
    callback(prevValues => {
        if (prevValues?.length === 1 && prevValues[0] === nextValue) {
            return prevValues || []
        }

        if (prevValues?.includes(nextValue)) {
            return prevValues.filter(prevValue => prevValue !== nextValue) || []
        }

        return [...(prevValues || []), nextValue]
    })
}

const handleMultipleColapsibleMode: TModeHandler = (nextValue, callback) => {
    callback(prevValues => {
        if (prevValues?.includes(nextValue)) {
            return prevValues.filter(prevValue => prevValue !== nextValue) || []
        }

        return [...(prevValues || []), nextValue]
    })
}

const modeHandlersMap = {
    single: handleSingleMode,
    singleCollapsible: handleSingleCollapsibleMode,
    multiple: handleMultipleMode,
    multipleCollapsible: handleMultipleColapsibleMode
}

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
                const modeHandler = modeHandlersMap[mode]

                modeHandler(nextValue, setActiveValues)
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

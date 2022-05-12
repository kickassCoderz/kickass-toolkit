import React, { forwardRef, useCallback } from 'react'

import { Slot } from '../Slot'
import { useCombinedControlState } from '../utils'
import { getDataDisabled, getDataState } from '../utils/helpers'
import { CollapserProvider } from './CollapserProvider'

type TCollapserRootViewBaseProps = React.ComponentPropsWithoutRef<'div'>

type TCollapserRootViewProps = {
    dataState: string
    dataDisabled?: string
}

type TCollapserRootBaseProps = {
    isOpen?: boolean
    defaultOpen?: boolean
    isDisabled?: boolean
    onOpenChange?: (nextState?: boolean) => void
}

type TCollapserRootProps = TCollapserRootBaseProps &
    TCollapserRootViewBaseProps & {
        asController?: boolean
    }

const CollapserRootView = forwardRef<HTMLDivElement, TCollapserRootViewProps>(
    ({ dataState, dataDisabled, ...restViewProps }, ref) => {
        return <div ref={ref} {...restViewProps} data-state={dataState} data-disabled={dataDisabled} />
    }
)

CollapserRootView.displayName = 'CollapserRootView'

const CollapserRoot = forwardRef<React.ElementRef<typeof CollapserRootView>, TCollapserRootProps>(
    ({ isOpen, onOpenChange, defaultOpen, isDisabled, asController, ...rootViewProps }, ref) => {
        const [value, setValue] = useCombinedControlState<boolean>({
            state: isOpen,
            defaultState: defaultOpen ?? false,
            handler: onOpenChange
        })

        const handleToogleOpen = useCallback(() => {
            setValue(prevValue => !prevValue)
        }, [setValue])

        const Component = asController ? Slot : CollapserRootView

        return (
            <CollapserProvider isOpen={value} toggleOpen={handleToogleOpen} isDisabled={isDisabled}>
                <Component
                    ref={ref}
                    {...rootViewProps}
                    dataState={getDataState(value)}
                    dataDisabled={getDataDisabled(isDisabled)}
                />
            </CollapserProvider>
        )
    }
)

CollapserRoot.displayName = 'CollapserRoot'

export { CollapserRoot }

export type { TCollapserRootProps }

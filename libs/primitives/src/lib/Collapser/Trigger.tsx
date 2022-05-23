import { useCombineEventHandlers } from '@kickass-coderz/hooks'
import { forwardRef } from 'react'

import { Slot } from '../Slot'
import { getDataDisabled } from '../utils'
import { useCollapserContext } from './CollapserProvider'

type TCollapserTriggerViewBaseProps = React.ComponentPropsWithoutRef<'button'>

type TCollapserTriggerProps = TCollapserTriggerViewBaseProps & {
    asController?: boolean
}

const CollapserTriggerView = forwardRef<HTMLButtonElement, TCollapserTriggerViewBaseProps>((props, ref) => {
    return <button type="button" ref={ref} {...props} />
})

CollapserTriggerView.displayName = 'CollapserTriggerView'

const CollapserTrigger = forwardRef<React.ElementRef<typeof CollapserTriggerView>, TCollapserTriggerProps>(
    ({ asController, onClick: theirOnClick, ...restProps }, ref) => {
        const { triggerId, panelId, dataState, onClick, isOpen, isDisabled } = useCollapserContext()
        const handleClick = useCombineEventHandlers(onClick, theirOnClick)

        const Component = asController ? Slot : CollapserTriggerView

        return (
            <Component
                ref={ref}
                {...restProps}
                id={triggerId}
                disabled={isDisabled}
                data-disabled={getDataDisabled(isDisabled)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-state={dataState}
                onClick={handleClick}
            />
        )
    }
)

CollapserTrigger.displayName = 'CollapserTrigger'

export { CollapserTrigger }

export type { TCollapserTriggerProps }

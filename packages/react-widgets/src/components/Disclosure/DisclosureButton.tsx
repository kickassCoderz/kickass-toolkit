import { forwardRef } from 'react'

import { useCombineEventHandlers } from '../../internal'
import { DISCLOSURE_BUTTON_NAME } from './disclosure-names'
import { EDisclosureState, TDisclosureButtonProps } from './disclosure-types'
import { useDisclosureContext } from './DisclosureProvider'

const DisclosureButton = forwardRef<HTMLButtonElement, TDisclosureButtonProps>(
    ({ children, onClick, ...rest }, ref) => {
        const { buttonId, panelId, isExpanded, isDisabled, handleExpand } = useDisclosureContext('DisclosureButton')

        const handleClick = useCombineEventHandlers(onClick, e => {
            e.preventDefault()
            handleExpand()
        })

        return (
            <button
                ref={ref}
                {...rest}
                id={buttonId}
                disabled={isDisabled}
                aria-controls={panelId}
                aria-expanded={isExpanded}
                data-state={`${isExpanded ? EDisclosureState.Expanded : EDisclosureState.Collapsed}`}
                data-disabled={isDisabled}
                onClick={handleClick}
            >
                {children}
            </button>
        )
    }
)

DisclosureButton.displayName = DISCLOSURE_BUTTON_NAME

export { DisclosureButton }

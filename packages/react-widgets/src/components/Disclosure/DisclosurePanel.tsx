import { forwardRef } from 'react'

import { DISCLOSURE_PANEL_NAME } from './disclosure-names'
import type { TDisclosurePanelProps } from './disclosure-types'
import { EDisclosureState } from './disclosure-types'
import { useDisclosureContext } from './DisclosureProvider'

const DisclosurePanel = forwardRef<HTMLDivElement, TDisclosurePanelProps>(({ children, ...rest }, ref) => {
    const { buttonId, panelId, isExpanded, isDisabled } = useDisclosureContext('DisclosurePanel')

    return (
        <section
            ref={ref}
            {...rest}
            id={panelId}
            hidden={!isExpanded}
            aria-labelledby={buttonId}
            data-state={`${isExpanded ? EDisclosureState.Expanded : EDisclosureState.Collapsed}`}
            data-disabled={isDisabled}
        >
            {children}
        </section>
    )
})

DisclosurePanel.displayName = DISCLOSURE_PANEL_NAME

export { DisclosurePanel }

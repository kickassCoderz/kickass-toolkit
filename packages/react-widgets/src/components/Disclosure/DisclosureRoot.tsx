import { useCombinedControlState } from '@kickass-coderz/hooks'
import { forwardRef, useCallback } from 'react'

import { createId, useId } from '../../internal'
import { DISCLOSURE_ROOT_NAME } from './disclosure-names'
import { EDisclosureState, TDisclosureRootProps } from './disclosure-types'
import { DisclosureProvider } from './DisclosureProvider'

const DisclosureRoot = forwardRef<HTMLDivElement, TDisclosureRootProps>(
    ({ children, isExpanded, onExpandChange, isDisabled, defaultExpanded = false, id, ...rest }, ref) => {
        const buttonId = useId(id) as string
        const panelId = createId('panel', buttonId)

        const [isOpen, setIsOpen] = useCombinedControlState({
            state: isExpanded,
            initialState: defaultExpanded,
            handlerFn: onExpandChange
        })

        const handleExpand = useCallback(() => setIsOpen(prevOpen => !prevOpen), [setIsOpen])

        return (
            <DisclosureProvider
                isDisabled={isDisabled}
                isExpanded={isOpen}
                handleExpand={handleExpand}
                buttonId={buttonId}
                panelId={panelId}
            >
                <div
                    ref={ref}
                    {...rest}
                    data-state={`${isOpen ? EDisclosureState.Expanded : EDisclosureState.Collapsed}`}
                    data-disabled={isDisabled}
                >
                    {children}
                </div>
            </DisclosureProvider>
        )
    }
)

DisclosureRoot.displayName = DISCLOSURE_ROOT_NAME

export { DisclosureRoot }

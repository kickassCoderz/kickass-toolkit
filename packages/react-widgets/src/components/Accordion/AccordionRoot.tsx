import { useCombinedControlState } from '@kickass-coderz/hooks'
import { forwardRef, useCallback } from 'react'

import { ACCORDION_ROOT_NAME } from './accordion-names'
import type {
    TAccordionImplMultipleProps,
    TAccordionImplProps,
    TAccordionImplSingleProps,
    TAccordionRootProps
} from './accordion-types'
import { EAccordionMode } from './accordion-types'
import { AccordionProvider } from './AccordionProvider'

const AccordionImplSingle = ({
    children,
    isCollapsible,
    isDisabled,
    defaultExpanded,
    expanded,
    onExpandChange
}: TAccordionImplSingleProps) => {
    const [expandedState, setExpandedState] = useCombinedControlState({
        state: expanded,
        initialState: defaultExpanded || '',
        handlerFn: onExpandChange
    })

    const getIsItemExpanded = useCallback(
        (itemId: string) => {
            return expandedState === itemId
        },
        [expandedState]
    )

    const handleExpand = useCallback(
        (itemId: string) => {
            if (isCollapsible) {
                setExpandedState(prevState => (prevState === itemId ? '' : itemId))
            } else {
                setExpandedState(itemId)
            }
        },
        [setExpandedState, isCollapsible]
    )

    return (
        <AccordionProvider isDisabled={isDisabled} handleExpand={handleExpand} getIsItemExpanded={getIsItemExpanded}>
            {children}
        </AccordionProvider>
    )
}

const AccordionImplMultiple = ({
    children,
    isCollapsible,
    isDisabled,
    defaultExpanded,
    expanded,
    onExpandChange
}: TAccordionImplMultipleProps) => {
    const [expandedState, setExpandedState] = useCombinedControlState({
        state: expanded,
        initialState: defaultExpanded || [],
        handlerFn: onExpandChange
    })

    const getIsItemExpanded = useCallback(
        (itemId: string) => {
            return expandedState.some(id => id === itemId)
        },
        [expandedState]
    )

    const handleExpand = useCallback(
        (itemId: string) => {
            setExpandedState(prevState => {
                if (!isCollapsible && prevState.length === 1 && prevState[0] === itemId) {
                    return prevState
                }

                if (prevState.includes(itemId)) {
                    return prevState.filter(id => id !== itemId)
                }

                return [...prevState, itemId]
            })
        },
        [setExpandedState, isCollapsible]
    )

    return (
        <AccordionProvider isDisabled={isDisabled} handleExpand={handleExpand} getIsItemExpanded={getIsItemExpanded}>
            {children}
        </AccordionProvider>
    )
}

const AccordionImpl = ({
    children,
    mode,
    isCollapsible,
    isDisabled,
    defaultExpanded,
    expanded,
    onExpandChange
}: TAccordionImplProps) => {
    if (mode === EAccordionMode.Single) {
        return (
            <AccordionImplSingle
                isDisabled={isDisabled}
                isCollapsible={isCollapsible}
                defaultExpanded={defaultExpanded}
                expanded={expanded}
                onExpandChange={onExpandChange}
            >
                {children}
            </AccordionImplSingle>
        )
    } else {
        return (
            <AccordionImplMultiple
                isDisabled={isDisabled}
                isCollapsible={isCollapsible}
                defaultExpanded={defaultExpanded}
                expanded={expanded}
                onExpandChange={onExpandChange}
            >
                {children}
            </AccordionImplMultiple>
        )
    }
}

const AccordionRoot = forwardRef<HTMLUListElement, TAccordionRootProps>(
    (
        {
            children,
            mode = EAccordionMode.Single,
            isDisabled = false,
            isCollapsible = false,
            defaultExpanded,
            expanded,
            onExpandChange,
            ...rest
        },
        ref
    ) => {
        const implementationProps = {
            mode,
            isCollapsible,
            isDisabled,
            defaultExpanded,
            expanded,
            onExpandChange
        } as TAccordionImplProps

        return (
            <AccordionImpl {...implementationProps}>
                <ul ref={ref} {...rest}>
                    {children}
                </ul>
            </AccordionImpl>
        )
    }
)

AccordionRoot.displayName = ACCORDION_ROOT_NAME

export { AccordionRoot }

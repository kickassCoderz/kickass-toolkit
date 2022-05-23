import { createContext, useContext, useId, useMemo } from 'react'

import { getDataDisabled, getDataState } from '../utils'

type TCollapserContext = {
    isOpen: boolean
    isDisabled?: boolean
    triggerId: string
    panelId: string
    dataState: string
    dataDisabled?: string
    onClick: () => void
}

type TCollapserProviderProps = {
    children: JSX.Element
    isDisabled?: boolean
    isOpen: boolean
    toggleOpen: () => void
}

const CollapserContext = createContext<TCollapserContext | undefined>(undefined)

CollapserContext.displayName = 'CollapserContext'

const useCollapserContext = () => {
    const context = useContext(CollapserContext)

    if (!context) {
        throw new Error(`[KickassCollapser]: useCollapserContex must be used inside CollapserProvider scope!`)
    }

    return context
}

const CollapserProvider = ({ children, isDisabled, isOpen, toggleOpen }: TCollapserProviderProps) => {
    const itemId = useId()

    const value = useMemo(() => {
        return {
            isOpen,
            isDisabled,
            onClick: toggleOpen,
            triggerId: `${itemId}-trigger`,
            panelId: `${itemId}-panel`,
            dataState: getDataState(isOpen),
            dataDisabled: getDataDisabled(isDisabled)
        }
    }, [isOpen, toggleOpen, itemId, isDisabled])

    return <CollapserContext.Provider value={value}>{children}</CollapserContext.Provider>
}

export { CollapserProvider, useCollapserContext }

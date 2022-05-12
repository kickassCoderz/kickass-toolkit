import { createContext, useContext, useMemo } from 'react'

type TAccordionContext = {
    isDisabled?: boolean
    activeValues: string[]
    handleChange: (nextValue: string) => void
}

type TAccordionProviderProps = {
    children: JSX.Element
    isDisabled?: boolean
    activeValues: string[]
    handleChange: (nextValue: string) => void
}

const AccordionContext = createContext<TAccordionContext | undefined>(undefined)

AccordionContext.displayName = 'AccordionContext'

const useAccordionContext = () => {
    const context = useContext(AccordionContext)

    if (!context) {
        throw new Error(`[KickassAccordion]: useAccordionContext must be used inside AccordionProvider scope!`)
    }

    return context
}

const AccordionProvider = ({ children, isDisabled, activeValues, handleChange }: TAccordionProviderProps) => {
    const values = useMemo(
        () => ({
            isDisabled,
            activeValues,
            handleChange
        }),
        [isDisabled, activeValues, handleChange]
    )
    return <AccordionContext.Provider value={values}>{children}</AccordionContext.Provider>
}

export { AccordionProvider, useAccordionContext }

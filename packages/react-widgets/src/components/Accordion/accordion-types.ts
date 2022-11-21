export type TAccordionProviderProps = {
    isDisabled?: boolean
    handleExpand: (itemId: string) => void
    getIsItemExpanded: (itemId: string) => boolean
}

export type TAccordionImplBaseProps = {
    isDisabled?: boolean
    isCollapsible?: boolean
    children: React.ReactNode
}

export type TAccordionImplSingleProps = TAccordionImplBaseProps & {
    defaultExpanded?: string
    expanded?: string
    onExpandChange?(expanded: string): void
}

export type TAccordionImplMultipleProps = TAccordionImplBaseProps & {
    defaultExpanded?: Array<string>
    expanded?: Array<string>
    onExpandChange?(expanded: Array<string>): void
}

export enum EAccordionMode {
    Single = 'single',
    Multiple = 'multiple'
}

export type TAccordionImplProps =
    | ({ mode: EAccordionMode.Single } & TAccordionImplSingleProps)
    | ({ mode: EAccordionMode.Multiple } & TAccordionImplMultipleProps)

export type TAccordionRootProps = React.ComponentPropsWithRef<'ul'> & TAccordionImplProps

export type TAccordionItemProps = React.ComponentPropsWithRef<'li'> & {
    id?: string
    isDisabled?: boolean
}

export enum EAccordionItemState {
    Expanded = 'expanded',
    Collapsed = 'collapsed'
}

export type TAccordionItemProviderProps = {
    buttonId: string
    panelId: string
    isDisabled?: boolean
    isExpanded: boolean
    handleExpand(): void
}

export type TAccordionItemHeaderProps = React.ComponentPropsWithRef<'h1'> & {
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export type TAccordionItemButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'id' | 'disabled'>

export type TAccordionItemPanelProps = Omit<React.ComponentPropsWithRef<'section'>, 'id'>

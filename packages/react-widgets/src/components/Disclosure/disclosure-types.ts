export type TDisclosureProviderProps = {
    buttonId: string
    panelId: string
    isDisabled?: boolean
    isExpanded: boolean
    handleExpand(): void
}

export type TDisclosureRootProps = React.ComponentPropsWithRef<'div'> & {
    isExpanded?: boolean
    onExpandChange?(isExpanded: boolean): void
    isDisabled?: boolean
    defaultExpanded?: boolean
}

export type TDisclosureButtonProps = Omit<React.ComponentPropsWithRef<'button'>, 'id' | 'disabled'>

export type TDisclosurePanelProps = Omit<React.ComponentPropsWithRef<'div'>, 'id'>

export enum EDisclosureState {
    Expanded = 'expanded',
    Collapsed = 'collapsed'
}

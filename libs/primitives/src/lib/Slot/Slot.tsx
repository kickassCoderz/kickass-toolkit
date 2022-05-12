import { Children, cloneElement, forwardRef, isValidElement } from 'react'

type TSlotProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
}

//@TODO: mergeProps
//@TODO: mergeRefs

const Slot = forwardRef<HTMLElement, TSlotProps>(({ children, ...restProps }, ref) => {
    return isValidElement(children)
        ? cloneElement(Children.only(children), { ...restProps, ...children.props, ref })
        : null
})

Slot.displayName = 'KickassSlot'

export { Slot }

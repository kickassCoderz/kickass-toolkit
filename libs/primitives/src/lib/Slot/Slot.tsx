import React, { Children, cloneElement, forwardRef, isValidElement } from 'react'

import { combineEventHandlers, combineRefs } from '../utils'

type TSlotProps = React.HTMLAttributes<HTMLElement> & {
    children?: React.ReactNode
}

type TMergeProps = {
    [key: string]: any
}

// @NOTE: Here we can merge/modify all props
const mergeProps = (slotProps: TMergeProps, childProps: TMergeProps) => {
    const modifiedChildProps = Object.entries(childProps).reduce((acc, [propKey, propValue]) => {
        const isEventHandler = /^on[A-Z]/.test(propKey)

        if (isEventHandler && slotProps[propKey]) {
            acc[propKey] = combineEventHandlers(slotProps[propKey], propValue)
        } else {
            acc[propKey] = propValue
        }

        return acc
    }, {} as TMergeProps)

    return { ...slotProps, ...modifiedChildProps }
}

const Slot = forwardRef<HTMLElement, TSlotProps>(({ children, ...restProps }, ref) => {
    return isValidElement(children)
        ? cloneElement(Children.only(children), {
              ...mergeProps(restProps, children.props),
              ref: combineRefs(ref, (children as any)?.ref) //@TODO: untangle this laters damn TS
          })
        : null
})

Slot.displayName = 'KickassSlot'

export { Slot }

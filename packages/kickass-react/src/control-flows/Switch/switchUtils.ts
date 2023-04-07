import type { TSwitchChild, TSwitchChildArray, TSwitchChildren } from './Switch'

function resolveSwitchChild(child: TSwitchChild) {
    if (child.props.when) {
        return child.props.children
    }
}

function resolveSwitchChildArray(children: TSwitchChildArray) {
    for (const child of children) {
        return resolveSwitchChild(child)
    }
}

function resolveSwitchChildren(children: TSwitchChildren) {
    if (!children) {
        return
    }

    return Array.isArray(children) ? resolveSwitchChildArray(children) : resolveSwitchChild(children)
}

export { resolveSwitchChild, resolveSwitchChildArray, resolveSwitchChildren }

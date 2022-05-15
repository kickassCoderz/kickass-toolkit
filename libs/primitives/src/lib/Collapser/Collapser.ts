import { CollapserPanel } from './Panel'
import { CollapserRoot } from './Root'
import { CollapserTrigger } from './Trigger'

type TCollapser = {
    Root: typeof CollapserRoot
    Trigger: typeof CollapserTrigger
    Panel: typeof CollapserPanel
}

const Collapser: TCollapser = {
    Root: CollapserRoot,
    Trigger: CollapserTrigger,
    Panel: CollapserPanel
}

export type { TCollapser }

export { Collapser }

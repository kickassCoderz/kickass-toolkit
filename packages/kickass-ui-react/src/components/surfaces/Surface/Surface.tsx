import { surfaceStyles } from './surface.css'

type TKAUISurfaceProps = {
    children: React.ReactNode
}

const Surface = ({ children }: TKAUISurfaceProps) => {
    return <div className={surfaceStyles}>{children}</div>
}

export { Surface }

import { surfaceStyles } from './surface.css'

const Surface = ({ children }) => {
    return <div className={surfaceStyles}>{children}</div>
}

export { Surface }

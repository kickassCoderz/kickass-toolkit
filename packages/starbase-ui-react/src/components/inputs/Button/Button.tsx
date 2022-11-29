import { buttonBlueprint } from './button.css'

const Button = ({ children }) => {
    return <button className={buttonBlueprint}>{children}</button>
}

export { Button }

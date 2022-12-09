import { Button, useKickassTheme } from '@kickass-coderz/kickass-ui-react'
import { NextPage } from 'next'

const ToggleThemeButton = () => {
    const { toggleTheme } = useKickassTheme()

    return <Button onClick={toggleTheme}>Toggle theme</Button>
}

const HomePage: NextPage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <ToggleThemeButton />
        </div>
    )
}

export default HomePage

import { Button, useKickassTheme } from '@kickass-coderz/kickass-ui-react'

const ToggleThemeButton = () => {
    const { toggleTheme } = useKickassTheme()

    return (
        <Button size="sm" onClick={toggleTheme}>
            Toggle theme
        </Button>
    )
}

export { ToggleThemeButton }

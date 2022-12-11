import { AppLayout, Footer, Header, Main } from '@kickass-coderz/kickass-ui-react'

import { ToggleThemeButton } from '../common'

type TLandingLayoutProps = {
    children: React.ReactNode
}

const LandingLayout = ({ children }: TLandingLayoutProps) => {
    return (
        <AppLayout
            header={
                <Header position="sticky" justifyContent="space-between">
                    <h1>NextJS Playgrounds</h1>
                    <ToggleThemeButton />
                </Header>
            }
            footer={<Footer>&copy; {new Date().getFullYear()} KickassCoderz</Footer>}
        >
            <Main padding="md">{children}</Main>
        </AppLayout>
    )
}

export { LandingLayout }

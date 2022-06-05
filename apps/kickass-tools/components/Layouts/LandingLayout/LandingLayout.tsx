import { Container } from '../../Container'

const LandingLayout = ({ children }) => {
    return (
        <Container as="main" direction="column">
            {children}
        </Container>
    )
}

export { LandingLayout }

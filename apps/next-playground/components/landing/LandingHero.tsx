import { Box } from '@kickass-coderz/kickass-ui-react'
import Link from 'next/link'

const LandingHero = () => {
    return (
        <Box
            width="full"
            padding="md"
            borderRadius="lg"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="xl"
            borderStyle="solid"
            borderWidth="sm"
            borderColor="separatorColor"
            backgroundColor="surfaceBackground"
        >
            <h1>Welcome to NextJS Playgrounds</h1>
            <h2>Chose your playground</h2>
            <Box display="flex" gap="md">
                <Link href="playgrounds/cap-javert">capJavert</Link>
                <Link href="playgrounds/fazla-grom">Fazla-GroM</Link>
            </Box>
        </Box>
    )
}

export { LandingHero }

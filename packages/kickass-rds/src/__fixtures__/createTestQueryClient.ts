import { QueryClient } from '@tanstack/react-query'

const defaultTestClientConfig = {
    defaultOptions: {
        queries: {
            retry: false
        }
    },
    logger: {
        log: console.log,
        warn: console.warn,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: () => {}
    }
}

const createTestQueryClient = () => {
    const queryClient = new QueryClient(defaultTestClientConfig)

    return queryClient
}
export { createTestQueryClient, defaultTestClientConfig }

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import { createContextProvider } from './createContextProvider'

describe('createContextProvider', () => {
    beforeAll(() => {
        // @TODO: Remove this when there is solution to catch errors in hooks and components or if we create our own custom renderers.
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterAll(() => {
        jest.restoreAllMocks()
    })

    it('should create Provider component and useProvider hook', () => {
        const [Provider, useProvider] = createContextProvider(() => {
            return { kickass: 'Coderz' }
        })

        expect(Provider).toBeDefined()

        expect(useProvider).toBeDefined()
    })

    it('should throw if useProvider returns undefined', () => {
        const [Provider, useProvider] = createContextProvider(() => {
            return
        })

        const Consumer = () => {
            useProvider()

            return <div></div>
        }

        expect(() => render(<Consumer />, { wrapper: Provider })).toThrow()
    })

    it("should throw if useProvider is used outside of Provider's scope", () => {
        const [, useProvider] = createContextProvider(() => {
            return
        })

        const Consumer = () => {
            useProvider()

            return <div></div>
        }

        expect(() => render(<Consumer />)).toThrow()
    })

    it('should throw if useProvider is used outside of Provider scope with custom error message', () => {
        const errorMessage = 'Custom error message'

        const [, useProvider] = createContextProvider(
            () => {
                return
            },
            { errorMessage }
        )

        const Consumer = () => {
            useProvider()

            return <div></div>
        }

        expect(() => render(<Consumer />)).toThrow(errorMessage)
    })

    it('should throw if useProvider is used outside of Provider scope with custom error message factory', () => {
        const errorMessage = 'Custom error message'

        const [, useProvider] = createContextProvider(
            () => {
                return
            },
            { errorMessage: () => errorMessage }
        )

        const Consumer = () => {
            useProvider()

            return <div></div>
        }

        expect(() => render(<Consumer />)).toThrow(errorMessage)
    })

    it("should prepend scope to error message and Provider if it's provided", () => {
        const scope = 'User'
        const errorMessage = 'Custom error message'

        const [Provider, useProvider] = createContextProvider(
            () => {
                return
            },
            { scope, errorMessage }
        )

        expect(Provider.displayName).toBe('UserProvider')

        const Consumer = () => {
            useProvider()

            return <div></div>
        }

        expect(() => render(<Consumer />)).toThrow(`[UserProvider]: ${errorMessage}`)
    })

    it('should create working Provider and useProvider hook', async () => {
        const user = userEvent.setup()

        const ACTIVE_LABEL = 'Active'
        const INACTIVE_LABEL = 'Inactive'

        const [Provider, useProvider] = createContextProvider(() => {
            const [isActive, setActive] = useState(false)

            const toggleActive = () => setActive(previous => !previous)

            return { isActive, toggleActive }
        })

        const Consumer = () => {
            const { isActive, toggleActive } = useProvider()

            return <button onClick={toggleActive}>{isActive ? ACTIVE_LABEL : INACTIVE_LABEL}</button>
        }

        render(<Consumer />, { wrapper: Provider })

        const button = screen.getByRole('button')

        expect(button.textContent).toBe(INACTIVE_LABEL)

        await user.click(button)

        expect(button.textContent).toBe(ACTIVE_LABEL)
    })

    it('should create Provider and useProvider hook with initialValues', async () => {
        const user = userEvent.setup()

        const ACTIVE_LABEL = 'Active'
        const INACTIVE_LABEL = 'Inactive'

        const [Provider, useProvider] = createContextProvider(
            ({ initialActive = true }: { initialActive?: boolean; children: React.ReactNode }) => {
                const [isActive, setActive] = useState(initialActive)

                const toggleActive = () => setActive(previous => !previous)

                return { isActive, toggleActive }
            }
        )

        const Consumer = () => {
            const { isActive, toggleActive } = useProvider()

            return <button onClick={toggleActive}>{isActive ? ACTIVE_LABEL : INACTIVE_LABEL}</button>
        }

        render(<Consumer />, { wrapper: Provider })

        const button = screen.getByRole('button')

        expect(button.textContent).toBe(ACTIVE_LABEL)

        await user.click(button)

        expect(button.textContent).toBe(INACTIVE_LABEL)
    })

    it("should render Provider which takes props and pass them to context's factory", async () => {
        const user = userEvent.setup()

        const ACTIVE_LABEL = 'Active'
        const INACTIVE_LABEL = 'Inactive'

        const [Provider, useProvider] = createContextProvider(
            ({ initialActive }: { initialActive?: boolean; children: React.ReactNode }) => {
                const [isActive, setActive] = useState(!!initialActive)

                const toggleActive = () => setActive(previous => !previous)

                return { isActive, toggleActive }
            }
        )

        const Consumer = () => {
            const { isActive, toggleActive } = useProvider()

            return <button onClick={toggleActive}>{isActive ? ACTIVE_LABEL : INACTIVE_LABEL}</button>
        }

        const { rerender } = render(
            <Provider initialActive={false}>
                <Consumer />
            </Provider>
        )

        const button = screen.getByRole('button')

        expect(button.textContent).toBe(INACTIVE_LABEL)

        await user.click(button)

        expect(button.textContent).toBe(ACTIVE_LABEL)

        rerender(
            <Provider initialActive>
                <Consumer />
            </Provider>
        )

        expect(button.textContent).toBe(ACTIVE_LABEL)

        await user.click(button)

        expect(button.textContent).toBe(INACTIVE_LABEL)
    })
})

import { Disclosure, useDisclosureContext } from '@kickass-coderz/react-widgets'

import { buttonStyles, headerStyles, iconStyles, itemStyles, listStyles, rootStyles } from './disclosure.css'

const Icon = () => {
    const { isExpanded } = useDisclosureContext('Icon')

    return isExpanded ? (
        <svg className={iconStyles} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
        </svg>
    ) : (
        <svg className={iconStyles} focusable="false" aria-hidden="true" viewBox="0 0 24 24">
            <path d="M4 20h16v2H4zM4 2h16v2H4zm9 7h3l-4-4-4 4h3v6H8l4 4 4-4h-3z"></path>
        </svg>
    )
}

const DisclosureDemo = () => {
    return (
        <Disclosure.Root className={rootStyles}>
            <div className={headerStyles}>
                You have 3 unread messages!
                <Disclosure.Button
                    className={buttonStyles}
                    aria-label="Expand all messages"
                    title="Expand all messages"
                >
                    <Icon />
                </Disclosure.Button>
            </div>
            <Disclosure.Panel>
                <ul className={listStyles}>
                    <li className={itemStyles}>Message from @ante</li>
                    <li className={itemStyles}>Message from @skenda</li>
                    <li className={itemStyles}>Message from @doric</li>
                </ul>
            </Disclosure.Panel>
        </Disclosure.Root>
    )
}

export { DisclosureDemo }

import { useCallback } from 'react'

const combineEventHandlers = <E>(
    ourHandler?: (event: E) => void,
    theirHandler?: (event: E) => void,
    { checkForDefaultPrevented = true } = {}
) => {
    const handleEvent = (event: E) => {
        theirHandler?.(event)

        if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
            return ourHandler?.(event)
        }
    }

    return handleEvent
}

const useCombineEventHandlers = <E>(
    ourHandler?: (event: E) => void,
    theirHandler?: (event: E) => void,
    { checkForDefaultPrevented = true } = {}
) => {
    return useCallback(
        (event: E) => {
            const combinedHandler = combineEventHandlers<E>(ourHandler, theirHandler, { checkForDefaultPrevented })

            combinedHandler(event)
        },
        [ourHandler, theirHandler, checkForDefaultPrevented]
    )
}

export { combineEventHandlers, useCombineEventHandlers }

import { useEvent } from '@kickass-coderz/hooks'

/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */
function combineEventHandlers<EventType extends React.SyntheticEvent | Event>(
    theirHandler: ((event: EventType) => void) | undefined,
    ourHandler: (event: EventType) => void
): (event: EventType) => void {
    return event => {
        theirHandler && theirHandler(event)
        if (!event.defaultPrevented) {
            return ourHandler(event)
        }
    }
}

const useCombineEventHandlers = <EventType extends React.SyntheticEvent | Event>(
    theirHandler: ((event: EventType) => void) | undefined,
    ourHandler: (event: EventType) => void
) => {
    const combinedEvent = useEvent(combineEventHandlers(theirHandler, ourHandler))

    return combinedEvent
}

export { combineEventHandlers, useCombineEventHandlers }

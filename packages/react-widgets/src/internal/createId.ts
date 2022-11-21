/**
 * Joins strings to format IDs for compound components.
 *
 * @param args
 */
export function createId(...args: (string | number | null | undefined)[]) {
    return args.filter(val => val != null).join('--')
}

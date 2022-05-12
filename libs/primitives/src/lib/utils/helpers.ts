const getDataState = (state?: boolean) => (state ? 'open' : 'closed')

const getDataDisabled = (isDisabled?: boolean) => (isDisabled ? '' : undefined)

export { getDataDisabled, getDataState }

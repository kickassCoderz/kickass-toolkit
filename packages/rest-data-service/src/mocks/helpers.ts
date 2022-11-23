const createHexString = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
}

const createId = () => {
    return `${createHexString()}${createHexString()}-${createHexString()}-${createHexString()}-${createHexString()}-${createHexString()}${createHexString()}${createHexString()}`
}

export { createId }

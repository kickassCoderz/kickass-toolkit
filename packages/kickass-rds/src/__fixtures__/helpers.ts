const createHexString = () => {
    return Math.floor((1 + Math.random()) * 0x1_00_00)
        .toString(16)
        .slice(1)
}

const createId = () => {
    return `${createHexString()}${createHexString()}-${createHexString()}-${createHexString()}-${createHexString()}-${createHexString()}${createHexString()}${createHexString()}`
}

export { createId }

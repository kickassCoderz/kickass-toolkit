import { composePipe } from './composePipe'

describe('composePipe', () => {
    const addOneMock = jest.fn((firstValue: number, secondValue: number) => firstValue + secondValue + 1)

    const multiplyByTwoMock = jest.fn((value: number) => value * 2)

    const subtractThreeMock = jest.fn((value: number) => value - 3)
    it('should create a callable pipe function from a list of unary functions', () => {
        const pipe = composePipe(addOneMock, multiplyByTwoMock, subtractThreeMock)

        expect(pipe).toBeInstanceOf(Function)
    })

    it('should create a callable pipe function that takes the same arguments as the first function in the pipe', () => {
        const pipe = composePipe(addOneMock, multiplyByTwoMock, subtractThreeMock)

        expect(pipe).toHaveLength(addOneMock.getMockImplementation.length)
    })

    it('should create a callable pipe function that returns the result of the last function in the pipe', () => {
        const pipe = composePipe(addOneMock, multiplyByTwoMock, subtractThreeMock)

        const result = pipe(1, 2)

        expect(result).toBe(5)

        expect(addOneMock).toHaveBeenCalledTimes(1)

        expect(addOneMock).toHaveBeenCalledWith(1, 2)

        expect(multiplyByTwoMock).toHaveBeenCalledTimes(1)

        expect(multiplyByTwoMock).toHaveBeenCalledWith(4)

        expect(subtractThreeMock).toHaveBeenCalledTimes(1)

        expect(subtractThreeMock).toHaveBeenCalledWith(8)
    })
})

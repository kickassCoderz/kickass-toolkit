import { pipe } from './pipe'
describe('pipe', () => {
    it('should execute a list of unary functions in non mathematical order from left to right', () => {
        const addOneMock = jest.fn((value: number) => value + 1)

        const multiplyByTwoMock = jest.fn((value: number) => value * 2)

        const subtractThreeMock = jest.fn((value: number) => value - 3)

        const result = pipe(1, addOneMock, multiplyByTwoMock, subtractThreeMock)

        expect(result).toBe(1)

        expect(addOneMock).toHaveBeenCalledTimes(1)

        expect(addOneMock).toHaveBeenCalledWith(1)

        expect(multiplyByTwoMock).toHaveBeenCalledTimes(1)

        expect(multiplyByTwoMock).toHaveBeenCalledWith(2)

        expect(subtractThreeMock).toHaveBeenCalledTimes(1)

        expect(subtractThreeMock).toHaveBeenCalledWith(4)
    })
})

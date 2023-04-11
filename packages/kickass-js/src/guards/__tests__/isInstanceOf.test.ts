import { isInstanceOf } from '../isInstanceOf'

const logCoderz = (): void => {
    console.log('Kickass Coderz')
}

describe('isInstanceOf', () => {
    it('should return true for all instances which are created with constructors or inherited constructors', () => {
        expect(isInstanceOf(Object, {})).toBe(true)

        expect(isInstanceOf(Object, [])).toBe(true)

        expect(isInstanceOf(Array, [])).toBe(true)

        expect(isInstanceOf(Date, new Date())).toBe(true)

        expect(isInstanceOf(RegExp, /Kickass Coderz/)).toBe(true)

        expect(isInstanceOf(Error, new Error('Error'))).toBe(true)

        expect(isInstanceOf(Function, logCoderz)).toBe(true)

        expect(isInstanceOf(Map, new Map())).toBe(true)

        expect(isInstanceOf(Set, new Set())).toBe(true)

        expect(isInstanceOf(WeakMap, new WeakMap())).toBe(true)

        expect(isInstanceOf(WeakSet, new WeakSet())).toBe(true)

        expect(isInstanceOf(Promise, Promise.resolve())).toBe(true)

        class Animal {
            eat() {
                console.log('eat')
            }
            sleep() {
                console.log('sleep')
            }
            shit() {
                console.log('shit')
            }
            repeat() {
                console.log('repeat')
            }
        }

        class Dog extends Animal {
            walk() {
                console.log('walk')
            }
        }

        const dog = new Dog()

        expect(isInstanceOf(Dog, dog)).toBe(true)

        expect(isInstanceOf(Animal, dog)).toBe(true)
    })
})

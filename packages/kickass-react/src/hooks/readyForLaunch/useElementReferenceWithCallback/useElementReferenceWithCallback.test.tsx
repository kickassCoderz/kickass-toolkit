import { render, renderHook } from '@testing-library/react'

import { useElementReferenceWithCallback } from './useElementReferenceWithCallback'

describe('useElementReferenceWithCallback', () => {
    const onMountMock = jest.fn()
    const onUnmountMock = jest.fn()

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should return a reference callback and take options object as parameter', () => {
        const { result } = renderHook(() =>
            useElementReferenceWithCallback<HTMLButtonElement>({ onMount: onMountMock, onUnmount: onUnmountMock })
        )

        expect(result.current).toBeInstanceOf(Function)

        expect(onMountMock).not.toHaveBeenCalled()

        expect(onUnmountMock).not.toHaveBeenCalled()
    })

    it('should call reference onMount when component mounts,and onUnmount when component unmounts', () => {
        const useElementReferenceWithCallbackMock = jest
            .fn(useElementReferenceWithCallback)
            .mockImplementation(useElementReferenceWithCallback)

        const TestElement = () => {
            const callback = useElementReferenceWithCallbackMock({ onMount: onMountMock, onUnmount: onUnmountMock })
            return <button ref={callback}>Kickass</button>
        }
        const { unmount } = render(<TestElement />)

        expect(useElementReferenceWithCallbackMock).toHaveBeenCalled()

        expect(onMountMock).toHaveBeenCalled()

        unmount()

        expect(onUnmountMock).toHaveBeenCalled()
    })
})

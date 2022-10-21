import { useEffect, useLayoutEffect } from 'react'

import { getIsBrowser } from '../useIsBrowser'

const isBrowser = getIsBrowser()

const useIsomorphicLayoutEffect = !isBrowser ? useEffect : useLayoutEffect

export { useIsomorphicLayoutEffect }

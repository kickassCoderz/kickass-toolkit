import { useEffect, useLayoutEffect } from 'react'

import { getIsBrowser } from '../useIsBrowser'

const isBrowser = getIsBrowser()

const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

export { useIsomorphicLayoutEffect }

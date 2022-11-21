import { createScopedContext } from '../../internal'
import { DISCLOSURE_NAME } from './disclosure-names'
import type { TDisclosureProviderProps } from './disclosure-types'

const [DisclosureProvider, useDisclosureContext] = createScopedContext<TDisclosureProviderProps>(DISCLOSURE_NAME)

export { DisclosureProvider, useDisclosureContext }

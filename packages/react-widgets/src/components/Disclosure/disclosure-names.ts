import { createComponentName } from '../../internal'

const DISCLOSURE_NAME = 'Disclosure'
const DISCLOSURE_ROOT_NAME = createComponentName(DISCLOSURE_NAME, 'Root')
const DISCLOSURE_BUTTON_NAME = createComponentName(DISCLOSURE_NAME, 'Button')
const DISCLOSURE_PANEL_NAME = createComponentName(DISCLOSURE_NAME, 'Panel')

export { DISCLOSURE_BUTTON_NAME, DISCLOSURE_NAME, DISCLOSURE_PANEL_NAME, DISCLOSURE_ROOT_NAME }

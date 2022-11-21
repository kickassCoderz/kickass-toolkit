import { createComponentName } from '../../internal'

const ACCORDION_NAME = 'Accordion'
const ACCORDION_ROOT_NAME = createComponentName(ACCORDION_NAME, 'Root')
const ACCORDION_ITEM_NAME = createComponentName(ACCORDION_NAME, 'Item')
const ACCORDION_HEADER_NAME = createComponentName(ACCORDION_NAME, 'Header')
const ACCORDION_BUTTON_NAME = createComponentName(ACCORDION_NAME, 'Button')
const ACCORDION_PANEL_NAME = createComponentName(ACCORDION_NAME, 'Panel')

export {
    ACCORDION_BUTTON_NAME,
    ACCORDION_HEADER_NAME,
    ACCORDION_ITEM_NAME,
    ACCORDION_NAME,
    ACCORDION_PANEL_NAME,
    ACCORDION_ROOT_NAME
}

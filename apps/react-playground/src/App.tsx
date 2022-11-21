import { AccordionDemo, DisclosureDemo } from '../components'

function App() {
    return (
        <main>
            <h1 className="title">
                Admin <br />
                <span>Kitchen Sink</span>
            </h1>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '64px' }}>
                <div>
                    <h2>Accordion demo</h2>
                    <AccordionDemo />
                </div>
                <div>
                    <h2>Disclosure demo</h2>
                    <DisclosureDemo />
                </div>
            </div>
        </main>
    )
}

export default App

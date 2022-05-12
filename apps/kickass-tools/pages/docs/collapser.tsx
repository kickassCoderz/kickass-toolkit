import { CollapserPanel, CollapserRoot, CollapserTrigger } from '@kickass-coderz/primitives'

const Collapser = () => {
    return (
        <div>
            <CollapserRoot defaultOpen>
                <CollapserTrigger>Im a Collapsertrigger</CollapserTrigger>
                <CollapserPanel asController>
                    <section>Im a Content</section>
                </CollapserPanel>
            </CollapserRoot>
        </div>
    )
}

export default Collapser

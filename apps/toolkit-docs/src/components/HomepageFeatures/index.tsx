/* eslint-disable @typescript-eslint/no-var-requires */
import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'

type FeatureItem = {
    title: string
    Svg: React.ComponentType<React.ComponentProps<'svg'>>
    description: JSX.Element
}

const FeatureList: FeatureItem[] = [
    {
        title: 'Easy to Use',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (
            <>
                <strong>Kickass Toolkit</strong> was designed from the ground up to be easily installed and used to get
                your app up and running quickly.
            </>
        )
    },
    {
        title: 'Focus on What Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                We have created <strong>Kickass Toolkit</strong> because we are scratching our own itch. Let's be real,
                developers are lazy. Starting a new project is a boring and repetitive task which always has to be done.
                This is where <strong>Kickass Toolkit</strong> kicks in.
            </>
            // <>
            //     Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go ahead and move your docs into
            //     the <code>docs</code> directory.
            // </>
        )
    },
    {
        title: 'Typed and tested',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                <strong>Kickass Toolkit</strong> is thoroughly tested and typed. We use <strong>Typescript</strong> and{' '}
                <strong>Jest</strong> to provide great dev experience and performant code.
            </>
        )
    }
]

function Feature({ title, Svg, description }: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img" />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    )
}

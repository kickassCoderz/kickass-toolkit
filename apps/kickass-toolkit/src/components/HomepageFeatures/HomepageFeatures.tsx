import clsx from 'clsx'
import React from 'react'

import styles from './HomepageFeatures.module.css'

type FeatureItem = {
    title: string
    image: string
    description: JSX.Element
}

const FeatureList: FeatureItem[] = []

const Feature = ({ title, image, description }: FeatureItem) => {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <img className={styles.featureSvg} alt={title} src={image} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )
}

const HomepageFeatures = (): JSX.Element => {
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

export { HomepageFeatures }

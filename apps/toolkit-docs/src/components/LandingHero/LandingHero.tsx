import Link from 'next/link'

import styles from './LandingHero.module.css'

const LandingHero = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heroTitle}>
                Develop <span className={styles.heroTitleDistinct}>Kickass</span> projects
                <br /> with rapid development <span className={styles.heroTitleDistinct}>Toolkit</span>
            </h1>
            <p className={styles.description}>
                Simple, powerful and flexible toolkit for building web apps.
                <br />
                Focus on code let us take care of chores!
            </p>
            <Link className={styles.cta} href="/docs/introduction">
                Get started <span>→</span>
            </Link>
        </div>
    )
}

export { LandingHero }

import styles from './Logo.module.css'

const Logo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>😎</div>
            <div className={styles.text}>Kickass Toolkit</div>
        </div>
    )
}

export { Logo }

import styles from "./index.module.css"

export default function HomeMessage() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Welcome to Product Hunt! 👋</h4>
      <p className={styles.subtitle}>The place to launch and discover new tech products.</p>
    </div>
  )
}

import styles from "./index.module.css"

export default function HomeMessage() {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>There is a refreshing new version of this project 🤩</h4>
      <p className={styles.subtitle}>Check it out carefully tough, it's in the works ⚒️</p>
      <a
        className={styles.link}
        href="https://product-hunt-clone-git-development-tzivi.vercel.app/"
        target="_blank"
        rel="noreferrer noopener nofollow"
      >
        See new version
      </a>
    </div>
  )
}

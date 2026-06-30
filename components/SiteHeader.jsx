import Link from "next/link";
import { navigation, profile } from "../app/portfolioData";
import styles from "./SiteHeader.module.css";

export default function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.brand} aria-label="Go to home page">
        <span>{profile.firstName}</span>
        <span>{profile.lastName}</span>
      </Link>

      <nav className={styles.nav} aria-label="Main navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navLink}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

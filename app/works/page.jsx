import SiteHeader from "../../components/SiteHeader";
import { works } from "../portfolioData";
import styles from "../inner-pages.module.css";

export const metadata = {
  title: "Works | Jothick Rishi",
  description: "Selected DevOps, cloud infrastructure, and web design work.",
};

export default function WorksPage() {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Selected works</p>
          <h1 className={styles.title}>Projects built for speed, clarity, and reliability.</h1>
          <p className={styles.lead}>
            A focused view of infrastructure, automation, and web experience
            work. Replace these entries with live projects as your portfolio grows.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {works.map((work) => (
            <article key={work.title} className={styles.workCard}>
              <div>
                <div className={styles.meta}>
                  <span>{work.type}</span>
                  <span>{work.year}</span>
                </div>
                <h2 className={styles.cardTitle}>{work.title}</h2>
                <p className={styles.bodyText}>{work.description}</p>
              </div>
              <div className={styles.chipRow}>
                {work.stack.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

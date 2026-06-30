import SiteHeader from "../../components/SiteHeader";
import { works } from "../portfolioData";
import styles from "../inner-pages.module.css";

export const metadata = {
  title: "Works | Jothick Rishi",
  description: "Selected DevOps, cloud infrastructure, and web design work.",
};

export default function WorksPage() {
  return (
    <main
      className={styles.page}
      style={{ "--page-image": "url('/images/works/cbfc-official.png')" }}
    >
      <SiteHeader />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Selected works</p>
          <h1 className={styles.title}>Projects built for speed, clarity, and reliability.</h1>
          <p className={styles.lead}>
            Web design work with live links, plus cloud engineering projects that
            show your DevOps direction.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {works.map((work) => (
            <article key={work.title} className={styles.workCard}>
              <div className={styles.workImageWrap}>
                <img className={styles.workImage} src={work.image} alt={`${work.title} preview`} />
              </div>
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
              {work.link && (
                <a className={styles.textLink} href={work.link} target="_blank" rel="noreferrer">
                  Open project
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

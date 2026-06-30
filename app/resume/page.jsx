import SiteHeader from "../../components/SiteHeader";
import { profile, resumeSections } from "../portfolioData";
import styles from "../inner-pages.module.css";

export const metadata = {
  title: "Resume | Jothick Rishi",
  description: "Resume overview for Jothick Rishi.",
};

export default function ResumePage() {
  return (
    <main
      className={styles.page}
      style={{ "--page-image": "url('/images/works/cinematic-portfolio.png')" }}
    >
      <SiteHeader />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Resume</p>
          <h1 className={styles.title}>{profile.fullName}</h1>
          <p className={styles.lead}>
            {profile.role}. Based in {profile.location}, focused on cloud
            infrastructure, automation, and premium web interfaces.
          </p>
          <div className={styles.buttonRow}>
            <a className={styles.button} href={profile.github} target="_blank" rel="noreferrer">
              GitHub profile
            </a>
            <a className={styles.button} href={`mailto:${profile.email}`}>
              Email me
            </a>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          {resumeSections.map((section) => (
            <article key={section.title} className={styles.panel}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <ul className={styles.list}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

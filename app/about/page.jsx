import SiteHeader from "../../components/SiteHeader";
import { profile, focusAreas, toolkit } from "../portfolioData";
import styles from "../inner-pages.module.css";

export const metadata = {
  title: "About | Jothick Rishi",
  description: "About Jothick Rishi, DevOps engineer and web designer.",
};

export default function AboutPage() {
  return (
    <main
      className={styles.page}
      style={{ "--page-image": "url('/images/works/cinematic-portfolio.png')" }}
    >
      <SiteHeader />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>About me</p>
          <h1 className={styles.title}>{profile.aboutIntro}</h1>
          <p className={styles.lead}>{profile.aboutBody}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoColumn}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>What I do</h2>
            <p className={styles.bodyText}>{profile.aboutLong}</p>
          </div>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>What I Focus On</h2>
            <div className={styles.focusList}>
              {focusAreas.map((item) => (
                <div key={item.label} className={styles.focusItem}>
                  <span className={styles.focusIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.panel}>
          <h2 className={styles.sectionTitle}>Toolkit</h2>
          <div className={styles.chipRow}>
            {toolkit.map((skill) => (
              <span key={skill} className={styles.chip}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import SiteHeader from "../../components/SiteHeader";
import { profile, skills } from "../portfolioData";
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
          <h1 className={styles.title}>Engineer for calm systems and sharp interfaces.</h1>
          <p className={styles.lead}>{profile.summary}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoColumn}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>What I do</h2>
            <p className={styles.bodyText}>
              I care about the full journey from code to production. My work sits
              between infrastructure, automation, observability, and frontend
              craft, so teams can ship quickly without losing control of quality.
            </p>
          </div>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>Toolkit</h2>
            <div className={styles.chipRow}>
              {skills.map((skill) => (
                <span key={skill} className={styles.chip}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

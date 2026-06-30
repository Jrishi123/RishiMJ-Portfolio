import SiteHeader from "../../components/SiteHeader";
import { careerSteps, careerStory, careerToday, careerVision } from "../portfolioData";
import styles from "../inner-pages.module.css";

export const metadata = {
  title: "Career | Jothick Rishi",
  description: "Career path and focus areas for Jothick Rishi.",
};

export default function CareerPage() {
  return (
    <main
      className={styles.page}
      style={{ "--page-image": "url('/images/works/cloud-pipeline.svg')" }}
    >
      <SiteHeader />
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>{careerStory.eyebrow}</p>
          <h1 className={styles.title}>{careerStory.title}</h1>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.panel}>
          {careerStory.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.bodyText}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Career Timeline</h2>
        <div className={styles.timeline}>
          {careerSteps.map((step) => (
            <article key={step.label} className={styles.timelineItem}>
              <p className={styles.timelineLabel}>{step.label}</p>
              <div>
                <h2 className={styles.timelineTitle}>{step.title}</h2>
                <p className={styles.timelineBody}>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.twoColumn}>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>Today</h2>
            <p className={styles.bodyText}>
              I specialize in delivering complete solutions across the entire
              software lifecycle:
            </p>
            <div className={styles.focusList}>
              {careerToday.map((item) => (
                <div key={item.label} className={styles.focusItem}>
                  <span className={styles.focusIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.panel}>
            <h2 className={styles.sectionTitle}>My Vision</h2>
            <p className={styles.bodyText}>{careerVision}</p>
          </div>
        </div>
      </section>
    </main>
  );
}

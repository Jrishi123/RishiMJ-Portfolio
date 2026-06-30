import SiteHeader from "../../components/SiteHeader";
import { careerSteps } from "../portfolioData";
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
          <p className={styles.eyebrow}>Career</p>
          <h1 className={styles.title}>A path from web craft to reliable cloud delivery.</h1>
          <p className={styles.lead}>
            My career direction is about becoming the engineer who can make the
            experience look polished, the pipeline run cleanly, and the
            infrastructure stay dependable.
          </p>
        </div>
      </section>

      <section className={styles.section}>
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
    </main>
  );
}

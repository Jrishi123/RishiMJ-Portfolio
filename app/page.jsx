import VideoIntro from "../components/VideoIntro";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <VideoIntro
        firstName="Jothick"
        lastName="Rishi"
        tagline="DevOps Engineer & Web Designer "
        subtitle={
          <>
            I design and automate <strong>resilient cloud infrastructure</strong> —
            building CI/CD pipelines, container orchestration, and observability
            systems that keep production calm under pressure.
          </>
        }
        nextSectionId="next-section"
      />

      {/* Replace with your real next section */}
      <section id="next-section" className={styles.nextSection}>
        <h2>Infrastructure & Tooling</h2>
        <p>AWS, Kubernetes, Terraform, Docker, CI/CD — your work continues here.</p>
      </section>
    </main>
  );
}

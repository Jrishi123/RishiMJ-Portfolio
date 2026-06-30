import VideoIntro from "../components/VideoIntro";
import SiteHeader from "../components/SiteHeader";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
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

      <section id="next-section" className={styles.nextSection}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Portfolio chapters</p>
          <h2>Infrastructure, design, and career story in one cinematic flow.</h2>
          <p>
            Explore the pages added around the original template: a resume overview,
            selected works, an about page, and a career timeline.
          </p>
        </div>

        <div className={styles.chapterGrid}>
          <a className={styles.chapterCard} href="/works">
            <span>01</span>
            <h3>Works</h3>
            <p>Selected DevOps, cloud infrastructure, and web experience projects.</p>
          </a>
          <a className={styles.chapterCard} href="/resume">
            <span>02</span>
            <h3>Resume</h3>
            <p>Profile, technical toolkit, strengths, and quick contact links.</p>
          </a>
          <a className={styles.chapterCard} href="/about">
            <span>03</span>
            <h3>About Me</h3>
            <p>A concise story about the way you think, build, and ship.</p>
          </a>
          <a className={styles.chapterCard} href="/career">
            <span>04</span>
            <h3>Career</h3>
            <p>A timeline from fundamentals to cloud automation and reliability.</p>
          </a>
        </div>
      </section>
    </main>
  );
}

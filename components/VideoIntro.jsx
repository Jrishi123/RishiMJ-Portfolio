"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import styles from "./VideoIntro.module.css";

// Three.js layer is client-only and has zero overlap with SSR
const CinematicLayer = dynamic(() => import("./CinematicLayer"), {
  ssr: false,
});

const VIDEO_SRC = "/videos/intro.mp4";

export default function VideoIntro({
  firstName = "Jothick",
  lastName = "Rishi",
  tagline = "DevOps Engineer & Web Designer",
  subtitle = (
    <>
      I design and automate <strong>resilient cloud infrastructure</strong> —
      building CI/CD pipelines, container orchestration, and observability
      systems that keep production calm under pressure.
    </>
  ),
  nextSectionId = "next-section",
}) {
  const sectionRef = useRef(null);
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgWrapRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRefs = useRef([]);
  const subtitleRef = useRef(null);
  const controlsRef = useRef(null);
  const scrollRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);
  const [hintVisibleClass, setHintVisibleClass] = useState("");
  const [revealed, setRevealed] = useState(false);

  const playVideos = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    fg.muted = isMuted;
    fg.defaultMuted = false;
    if (bg) {
      bg.muted = true;
      bg.defaultMuted = true;
    }

    const fgPlay = fg.play();
    bg?.play();

    if (fgPlay && typeof fgPlay.then === "function") {
      fgPlay
        .then(() => setIsPlaying(true))
        .catch(() => {
          fg.muted = true;
          setIsMuted(true);
          setShowSoundHint(true);
          setHintVisibleClass(styles.show);

          const mutedPlay = fg.play();
          bg?.play();
          if (mutedPlay && typeof mutedPlay.then === "function") {
            mutedPlay
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          } else {
            setIsPlaying(true);
          }
        });
    } else {
      setIsPlaying(true);
    }
  }, [isMuted]);

  // ---- Entrance animation ------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => setRevealed(true),
      });

      tl.set(
        [taglineRef.current, subtitleRef.current, controlsRef.current, scrollRef.current],
        { autoAlpha: 0 }
      )
        .to(fgWrapRef.current, { opacity: 1, duration: 1.4 }, 0)
        .to(
          taglineRef.current,
          { autoAlpha: 1, duration: 0.9, y: 0 },
          0.5
        )
        .fromTo(
          nameRefs.current,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "expo.out",
          },
          0.45
        )
        .to(
          subtitleRef.current,
          { autoAlpha: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .to(
          controlsRef.current,
          { autoAlpha: 1, duration: 0.8 },
          "-=0.6"
        )
        .to(
          scrollRef.current,
          { autoAlpha: 1, duration: 0.8 },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---- Sound hint auto show / hide --------------------------------------
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (isMuted) {
        setShowSoundHint(true);
        setHintVisibleClass(styles.show);
      }
    }, 1800);

    return () => clearTimeout(showTimer);
  }, [isMuted]);

  useEffect(() => {
    if (!showSoundHint) return;
    const hideTimer = setTimeout(() => {
      setHintVisibleClass(styles.hide);
    }, 6000);
    return () => clearTimeout(hideTimer);
  }, [showSoundHint]);

  // ---- Controls ----------------------------------------------------------
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;
    if (fg.paused) {
      const fgPlay = fg.play();
      bg?.play();
      if (fgPlay && typeof fgPlay.then === "function") {
        fgPlay
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(true);
      }
    } else {
      fg.pause();
      bg?.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const next = !fg.muted;
    fg.muted = next;
    setIsMuted(next);
    setHintVisibleClass(styles.hide);
  }, []);

  const scrollToNext = useCallback(() => {
    const target = document.getElementById(nextSectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  }, [nextSectionId]);

  // ---- Keep bg + fg video roughly in sync on resume ----------------------
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    const sync = () => {
      if (Math.abs(fg.currentTime - bg.currentTime) > 0.4) {
        bg.currentTime = fg.currentTime;
      }
    };
    fg.addEventListener("timeupdate", sync);
    return () => fg.removeEventListener("timeupdate", sync);
  }, []);

  useEffect(() => {
    playVideos();
  }, [playVideos]);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Intro">
      {/* Ambient blurred background video */}
      <div className={styles.bgLayer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          preload="auto"
        />
      </div>

      {/* Cinematic particle / bokeh layer */}
      <CinematicLayer className={styles.particleLayer} />

      {/* Foreground sharp video */}
      <div
        ref={fgWrapRef}
        className={`${styles.fgLayer} ${revealed ? styles.revealed : ""}`}
      >
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted={isMuted}
          defaultMuted
          playsInline
          preload="auto"
          onCanPlay={playVideos}
          onPlaying={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Gradient scrims for legibility */}
      <div className={styles.scrim} />
      <div className={styles.scrimSide} />
      <div className={`${styles.glowAccent} ${styles.glowWarm}`} />
      <div className={`${styles.glowAccent} ${styles.glowBlue}`} />
      <div className={styles.grain} />

      {/* Content */}
      <div className={styles.content}>
        <p ref={taglineRef} className={styles.tagline}>
          <span className={styles.taglineDash} />
          {tagline}
        </p>

        <h1 className={styles.nameBlock}>
          <span className={styles.nameLine}>
            <span
              ref={(el) => (nameRefs.current[0] = el)}
              className={styles.nameLineInner}
            >
              {firstName}
            </span>
          </span>
          <span className={styles.nameLine}>
            <span
              ref={(el) => (nameRefs.current[1] = el)}
              className={styles.nameLineInner}
            >
              {lastName}
            </span>
          </span>
        </h1>

        <p ref={subtitleRef} className={styles.subtitle}>
          {subtitle}
        </p>
      </div>

      {/* Sound hint badge */}
      {showSoundHint && (
        <div className={`${styles.soundHint} ${hintVisibleClass}`}>
          <span className={styles.soundPulse} />
          Tap for sound
        </div>
      )}

      {/* Play / mute controls */}
      <div ref={controlsRef} className={styles.controls}>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button
          type="button"
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <MuteIcon /> : <UnmuteIcon />}
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        type="button"
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLabel}>Scroll</span>
        <span className={styles.scrollLine} />
      </button>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Inline icon set (no external deps)                                */
/* ---------------------------------------------------------------- */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 4.5v15l13-7.5-13-7.5z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
      <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9.5v5h4l5 4v-13l-5 4H4z"
        fill="currentColor"
      />
      <path
        d="M16.5 9.5l4 4M20.5 9.5l-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UnmuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9.5v5h4l5 4v-13l-5 4H4z" fill="currentColor" />
      <path
        d="M16.2 9.2a4.2 4.2 0 010 5.6M18.6 7a7.6 7.6 0 010 10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
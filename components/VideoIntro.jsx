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
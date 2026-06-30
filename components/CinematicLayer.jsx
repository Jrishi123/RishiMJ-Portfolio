"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CinematicLayer
 * A transparent, full-bleed Three.js canvas that renders a slow-drifting
 * field of warm orange / soft-white bokeh particles with additive blending.
 * Includes gentle mouse parallax on the camera for a "movie intro" depth feel.
 *
 * Fully self-disposing: all geometry / material / renderer resources are
 * torn down on unmount, and rendering pauses when the tab is hidden.
 */
export default function CinematicLayer({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Scene setup -------------------------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ---- Particle texture (soft radial glow, drawn once) -------------
    const glowCanvas = document.createElement("canvas");
    glowCanvas.width = 128;
    glowCanvas.height = 128;
    const ctx = glowCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.25, "rgba(255,225,190,0.8)");
    gradient.addColorStop(0.55, "rgba(255,150,70,0.25)");
    gradient.addColorStop(1, "rgba(255,120,40,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    const glowTexture = new THREE.CanvasTexture(glowCanvas);

    // ---- Particle field ------------------------------------------------
    const COUNT = 140;
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT * 3); // speed, phase, radius
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const warm = new THREE.Color("#ffb066");
    const white = new THREE.Color("#fff6ea");
    const blue = new THREE.Color("#7fb3ff");

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 22;
      positions[i3 + 1] = (Math.random() - 0.5) * 14;
      positions[i3 + 2] = (Math.random() - 0.5) * 14 - 2;

      seeds[i3] = 0.15 + Math.random() * 0.35; // speed
      seeds[i3 + 1] = Math.random() * Math.PI * 2; // phase
      seeds[i3 + 2] = 0.4 + Math.random() * 1.4; // sway radius

      // Mostly warm + white, a rare soft blue accent for "monitor glow"
      const roll = Math.random();
      const c =
        roll < 0.55 ? warm.clone() : roll < 0.9 ? white.clone() : blue.clone();
      c.toArray(colors, i3);

      sizes[i] = Math.random() * 0.9 + 0.25;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.62,
      map: glowTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ---- Mouse parallax ------------------------------------------------
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function onPointerMove(e) {
      const rect = mount.getBoundingClientRect();
      target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ---- Resize ----------------------------------------------------------
    let resizeObserver;
    function handleResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(mount);
    } else {
      window.addEventListener("resize", handleResize);
    }

    // ---- Animation loop --------------------------------------------------
    let rafId;
    let running = true;
    const clock = new THREE.Clock();
    const posAttr = geometry.getAttribute("position");

    function onVisibilityChange() {
      running = document.visibilityState === "visible";
      if (running) animate();
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function animate() {
      if (!running) return;
      rafId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        for (let i = 0; i < COUNT; i++) {
          const i3 = i * 3;
          const speed = seeds[i3];
          const phase = seeds[i3 + 1];
          const radius = seeds[i3 + 2];
          posAttr.array[i3 + 1] +=
            Math.sin(t * speed + phase) * 0.0009 * radius;
          posAttr.array[i3] += Math.cos(t * speed * 0.7 + phase) * 0.0006;
        }
        posAttr.needsUpdate = true;
        points.rotation.y = Math.sin(t * 0.02) * 0.05;
      }

      // smooth camera parallax
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      camera.position.x = mouse.x * 0.8;
      camera.position.y = -mouse.y * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    // ---- Cleanup -----------------------------------------------------
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}

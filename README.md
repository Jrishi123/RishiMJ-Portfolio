# Cinematic Portfolio Hero

A fullscreen, sticky, cinematic video hero built with Next.js (App Router), React, Three.js, GSAP, and CSS Modules — designed to feel like a premium, award-winning portfolio intro.

## Structure

```
app/
  layout.jsx           Root layout, loads Fraunces / Inter / JetBrains Mono
  globals.css           Minimal reset
  page.jsx               Wires VideoIntro into the homepage
  page.module.css        Placeholder "next section" styling

components/
  VideoIntro.jsx          Main hero component (video layers, GSAP entrance, controls)
  VideoIntro.module.css   All hero styling (gradients, glass controls, typography)
  CinematicLayer.jsx     Three.js bokeh/particle overlay (additive blending, parallax)

public/videos/
  hero-talking.mp4        Your uploaded talking-head video (used as both fg + bg source)
```

## How it works

- **Two video layers**: the same `hero-talking.mp4` is rendered twice — once full-resolution
  and sharp in the foreground, and once heavily blurred + darkened behind it as an ambient
  "glow" layer.
- **CinematicLayer** is a transparent `<canvas>` (via Three.js `Points`) sitting between the
  two video layers, rendering ~140 soft glowing particles in warm orange / white / a touch of
  blue, using additive blending and sine-wave drift, with camera parallax tied to pointer
  position. It pauses rendering when the tab is hidden and fully disposes all GPU resources
  on unmount.
- **Gradient scrims** (top/bottom + side) plus two soft radial "glow" blooms (warm bottom-left,
  cool blue top-right) sit above the video to guarantee text contrast while preserving the
  cinematic mood.
- **GSAP entrance timeline** fades in the foreground video, then reveals the tagline, slides
  the stacked first/last name up from below (clipped, expo-out), then fades in the subtitle,
  glass controls, and scroll indicator — all sequenced with overlaps for a single cohesive
  "title card" moment.
- **Controls** are glassmorphism circular buttons (`backdrop-filter: blur`) for play/pause and
  mute/unmute. A "Tap for sound" badge with a pulsing dot appears ~1.8s after load while muted,
  and auto-hides after ~6s (or immediately once the user unmutes).
- **Scroll indicator** is a thin vertical line with an animated light pulse traveling down it;
  clicking it smooth-scrolls to the `#next-section` element (id is configurable via the
  `nextSectionId` prop).

## Using your own video

Swap `public/videos/hero-talking.mp4` for any other source, or change the `VIDEO_SRC` constant
at the top of `components/VideoIntro.jsx`.

## Installing & running

```bash
npm install
npm run dev
```

Requires Node 18+. The component is fully self-contained — drop the `components/` folder and
`public/videos/` asset into any existing Next.js App Router project and import `VideoIntro`
wherever you want the hero to render.

## Customization

`VideoIntro` accepts props:

- `firstName`, `lastName` — stacked headline
- `tagline` — small uppercase line above the name
- `subtitle` — JSX or string, the supporting paragraph
- `nextSectionId` — id of the section to scroll to when the indicator is clicked

Colors, blur intensity, particle count/colors, and type scale are all controlled via
CSS variables / constants at the top of `VideoIntro.module.css` and `CinematicLayer.jsx`,
so the look can be retuned without touching component logic.

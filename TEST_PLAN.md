# 3D Portfolio Project Test Plan

This document outlines both automated and manual test cases to ensure the 3D portfolio meets all requirements and functions as intended.

---

## 1. Automated Code Test Plan (Unit/Integration)

### General
- [ ] All modules in `src/sectors/` export a function that returns a valid Three.js object.
- [ ] `src/data.js` exports a `SECTORS` object with all required keys and HTML content.
- [ ] The main entry (`src/main.js`) initializes the scene, camera, renderer, and controls without errors.

### UI/UX
- [ ] The HUD overlay renders and remains visible above the 3D canvas.
- [ ] Quick-Nav radar buttons are present and clickable.
- [ ] Info panels open with correct data when a sector is clicked.
- [ ] Glassmorphism and neon styles are applied to panels and overlays.

### 3D Interactivity
- [ ] All five sectors are present in the scene and positioned correctly.
- [ ] Clicking a sector triggers the correct camera flight and opens the corresponding info panel.
- [ ] Hovering over a sector triggers a glow and rotation speed increase.
- [ ] The intro sequence (preloader, warp effect) plays on first load.
- [ ] Post-processing (UnrealBloomPass) is applied to glowing objects.

### Responsiveness
- [ ] HUD and panels are responsive on mobile and desktop.
- [ ] 3D scene resizes correctly on window resize.

### Build & Deployment
- [ ] `npm run build` completes without errors.
- [ ] Production build serves correctly with `npm run preview`.

---

## 2. Manual Feature/Requirement Checklist

### Core Technologies
- [ ] Uses HTML5, CSS3, JavaScript (ES6+), Three.js, GSAP.

### 2D Overlay (HUD)
- [ ] Header displays "Utsav Kumar".
- [ ] Contact links (phone, email, LinkedIn, GitHub) are present and functional.
- [ ] Overlay is always visible and responsive.

### 3D Scene
- [ ] Galaxy background is rendered.
- [ ] Camera controls and programmatic flights work.
- [ ] Raycaster detects clicks on 3D objects.

### Sectors
- [ ] Education: Rotating planetary base, opens holographic panel.
- [ ] Experience: Glowing nebula, two data streams.
- [ ] Projects: Two interlocking shapes, two project nodes.
- [ ] Certifications: Glowing ring/star, multiple panels.
- [ ] Skills: 3D grid of cubes, skill tags.

### Advanced UX
- [ ] Hyper-drive intro sequence plays on load.
- [ ] Glassmorphism and neon styling present.
- [ ] Quick-Nav radar works for all sectors.
- [ ] Bloom/post-processing visible on glowing objects.
- [ ] Hover and micro-interactions work.
- [ ] Typewriter/decoding effect on panel text.

### Deployment
- [ ] Deployed to GitHub Pages and/or Vercel/Netlify.
- [ ] All features work in production.

---

## Notes
- Automated tests can be implemented with Jest and @testing-library/dom for DOM/UI, and Three.js scene validation.
- Manual checklist should be reviewed before each release.

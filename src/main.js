/* ============================================================
   main.js — Entry point for the 3D Galaxy Portfolio
   ============================================================ */
import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import gsap from 'gsap';

import { SECTORS } from './data.js';
import { createEducationSector } from './sectors/education.js';
import { createExperienceNebula } from './sectors/experience.js';
import { createProjectNodes } from './sectors/projects.js';
import { createCertificationHub } from './sectors/certifications.js';
import { createSkillsGrid } from './sectors/skills.js';

/* ──────── DOM references ──────── */
const canvas = document.getElementById('galaxy-canvas');
const hud = document.getElementById('hud');
const introOverlay = document.getElementById('intro-overlay');
const introText = document.getElementById('intro-text');
const infoPanel = document.getElementById('info-panel');
const panelContent = document.getElementById('panel-content');
const panelClose = document.getElementById('panel-close');
const navButtons = document.querySelectorAll('.nav-btn');

/* ──────── Scene setup ──────── */
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0B0C10, 0.006);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 8, 40);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

/* ──────── Post-processing (Bloom) ──────── */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.8,   // strength
  0.4,   // radius
  0.85   // threshold
);
composer.addPass(bloomPass);

/* ──────── Orbit Controls ──────── */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.maxDistance = 80;
controls.minDistance = 5;
controls.enabled = false; // disabled until intro finishes

/* ──────── Lights ──────── */
scene.add(new THREE.AmbientLight(0x404060, 1.2));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

/* ──────── Starfield background ──────── */
function createStarfield() {
  const count = 6000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 180;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 180;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 180;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
  });
  return new THREE.Points(geo, mat);
}
scene.add(createStarfield());

/* ──────── Build Sectors ──────── */
const sectorGroups = {};

sectorGroups.education = createEducationSector(SECTORS.education.position);
sectorGroups.experience = createExperienceNebula(SECTORS.experience.position);
sectorGroups.projects = createProjectNodes(SECTORS.projects.position);
sectorGroups.certifications = createCertificationHub(SECTORS.certifications.position);
sectorGroups.skills = createSkillsGrid(SECTORS.skills.position);

Object.values(sectorGroups).forEach((g) => scene.add(g));

/* ──────── Raycaster for click detection ──────── */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredSector = null;

function onPointerMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function onClick() {
  if (hoveredSector) {
    flyToSector(hoveredSector);
  }
}

window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);

/* ──────── Camera flight ──────── */
let isFlying = false;

function flyToSector(name) {
  const data = SECTORS[name];
  if (!data || isFlying) return;
  isFlying = true;

  const target = data.cameraOffset;

  // Disable controls during flight
  controls.enabled = false;

  gsap.to(camera.position, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => {
      camera.lookAt(data.position.x, data.position.y, data.position.z);
    },
    onComplete: () => {
      controls.target.set(data.position.x, data.position.y, data.position.z);
      controls.enabled = true;
      isFlying = false;
      openPanel(name);
    },
  });

  // Highlight active nav
  navButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.sector === name);
  });
}

function flyHome() {
  isFlying = true;
  controls.enabled = false;
  closePanel();

  gsap.to(camera.position, {
    x: 0, y: 8, z: 40,
    duration: 1.8,
    ease: 'power2.inOut',
    onUpdate: () => camera.lookAt(0, 0, -20),
    onComplete: () => {
      controls.target.set(0, 0, -20);
      controls.enabled = true;
      isFlying = false;
    },
  });
  navButtons.forEach((btn) => btn.classList.remove('active'));
}

/* ──────── Info Panel ──────── */
function openPanel(name) {
  const data = SECTORS[name];
  if (!data) return;
  panelContent.innerHTML = data.html;
  infoPanel.style.display = 'block';
  // Typewriter effect on text nodes
  typewritePanel();
}

function closePanel() {
  infoPanel.style.display = 'none';
  panelContent.innerHTML = '';
}

function typewritePanel() {
  const elements = panelContent.querySelectorAll('p, li, h3');
  elements.forEach((el, i) => {
    const text = el.textContent;
    el.textContent = '';
    el.style.opacity = '1';
    let charIndex = 0;
    setTimeout(() => {
      const interval = setInterval(() => {
        el.textContent += text[charIndex];
        charIndex++;
        if (charIndex >= text.length) clearInterval(interval);
      }, 8);
    }, i * 60);
  });
}

panelClose.addEventListener('click', closePanel);

/* ──────── Nav Button Clicks ──────── */
navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const sector = btn.dataset.sector;
    if (sector === 'home') {
      flyHome();
    } else {
      flyToSector(sector);
    }
  });
});

/* ──────── Hover detection (per frame) ──────── */
function updateHover() {
  raycaster.setFromCamera(pointer, camera);
  let found = null;

  for (const [name, group] of Object.entries(sectorGroups)) {
    const intersects = raycaster.intersectObjects(group.children, true);
    if (intersects.length > 0) {
      found = name;
      break;
    }
  }

  if (found !== hoveredSector) {
    // Reset previous
    if (hoveredSector && sectorGroups[hoveredSector]) {
      gsap.to(sectorGroups[hoveredSector].scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
    // Highlight new
    if (found && sectorGroups[found]) {
      gsap.to(sectorGroups[found].scale, { x: 1.12, y: 1.12, z: 1.12, duration: 0.3 });
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
    hoveredSector = found;
  }
}

/* ──────── Intro Sequence (Hyper-Drive) ──────── */
function runIntro() {
  const lines = [
    'System Initialization...',
    'Scanning Sectors...',
    'Locating Utsav Kumar...',
    'Galaxy Portfolio Online.',
  ];
  let lineIndex = 0;
  let charIndex = 0;

  function typeNext() {
    if (lineIndex >= lines.length) {
      // Intro done — warp in
      setTimeout(warpIn, 400);
      return;
    }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      introText.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeNext, 35);
    } else {
      introText.textContent += '\n';
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 300);
    }
  }

  typeNext();
}

function warpIn() {
  // Move camera far back, then fly forward
  camera.position.set(0, 0, 120);
  camera.lookAt(0, 0, -15);

  gsap.to(introOverlay, {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      introOverlay.style.display = 'none';
      hud.style.display = 'block';
    },
  });

  gsap.to(camera.position, {
    x: 0, y: 8, z: 40,
    duration: 2.5,
    ease: 'power3.out',
    onUpdate: () => camera.lookAt(0, 0, -15),
    onComplete: () => {
      controls.target.set(0, 0, -15);
      controls.enabled = true;
    },
  });
}

/* ──────── Animation Loop ──────── */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Animate each sector
  Object.values(sectorGroups).forEach((g) => {
    if (g.userData.animate) g.userData.animate(t);
  });

  updateHover();
  controls.update();
  composer.render();
}

/* ──────── Resize handler ──────── */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

/* ──────── Boot ──────── */
animate();
runIntro();

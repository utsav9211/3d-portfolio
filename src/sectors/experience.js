/* ============================================================
   Sector 2 — The Experience Nebula
   A particle cloud representing internship experience.
   ============================================================ */
import * as THREE from 'three';

export function createExperienceNebula(position) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.sector = 'experience';

  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const c1 = new THREE.Color(0x66FCF1);
  const c2 = new THREE.Color(0x9B59B6);

  for (let i = 0; i < count; i++) {
    const r = 5 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const mix = Math.random();
    const c = c1.clone().lerp(c2, mix);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geo, mat);
  group.add(points);

  // Glowing core
  const coreGeo = new THREE.SphereGeometry(2, 32, 32);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x66FCF1,
    transparent: true,
    opacity: 0.08,
  });
  group.add(new THREE.Mesh(coreGeo, coreMat));

  // Label
  group.add(createLabel('EXPERIENCE', 0, 10, 0));

  group.userData.animate = (t) => {
    points.rotation.y = t * 0.08;
    points.rotation.x = Math.sin(t * 0.2) * 0.1;
  };

  return group;
}

function createLabel(text, x, y, z) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 48px Rajdhani, sans-serif';
  ctx.fillStyle = '#66FCF1';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#66FCF1';
  ctx.shadowBlur = 12;
  ctx.fillText(text, 256, 80);

  const tex = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.position.set(x, y, z);
  sprite.scale.set(8, 2, 1);
  return sprite;
}

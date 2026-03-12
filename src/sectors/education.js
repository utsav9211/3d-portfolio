/* ============================================================
   Sector 1 — The Academy Base (Education)
   A rotating, textured icosahedron representing a planetary base.
   ============================================================ */
import * as THREE from 'three';

export function createEducationSector(position) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.sector = 'education';

  // Core planet
  const geo = new THREE.IcosahedronGeometry(3, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x45A29E,
    emissive: 0x1F7A6F,
    emissiveIntensity: 0.4,
    metalness: 0.6,
    roughness: 0.35,
    wireframe: false,
  });
  const planet = new THREE.Mesh(geo, mat);
  group.add(planet);

  // Orbiting ring
  const ringGeo = new THREE.TorusGeometry(4.5, 0.08, 16, 100);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x66FCF1, transparent: true, opacity: 0.5 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2.2;
  group.add(ring);

  // Label sprite
  group.add(createLabel('EDUCATION', 0, 5.5, 0));

  group.userData.animate = (t) => {
    planet.rotation.y = t * 0.3;
    planet.rotation.x = t * 0.1;
    ring.rotation.z = t * 0.15;
  };

  return group;
}

function createLabel(text, x, y, z) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, 512, 128);
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

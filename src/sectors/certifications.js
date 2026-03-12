/* ============================================================
   Sector 4 — The Certification Hub
   A glowing ring around a star.
   ============================================================ */
import * as THREE from 'three';

export function createCertificationHub(position) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.sector = 'certifications';

  // Central star
  const starGeo = new THREE.OctahedronGeometry(1.5, 0);
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xFFD700,
    emissive: 0xFFD700,
    emissiveIntensity: 0.7,
    metalness: 0.8,
    roughness: 0.1,
  });
  const star = new THREE.Mesh(starGeo, starMat);
  group.add(star);

  // Glowing rings
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.TorusGeometry(3 + i * 1.2, 0.06, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.4 - i * 0.1,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + i * 0.2;
    ring.rotation.y = i * 0.3;
    ring.userData.ringIndex = i;
    group.add(ring);
  }

  // Point light for bloom glow
  const light = new THREE.PointLight(0xFFD700, 2, 15);
  group.add(light);

  // Label
  group.add(createLabel('CERTIFICATIONS', 0, 7, 0));

  group.userData.animate = (t) => {
    star.rotation.y = t * 0.5;
    star.rotation.x = t * 0.25;
    group.children.forEach((child) => {
      if (child.userData.ringIndex !== undefined) {
        child.rotation.z = t * 0.2 * (child.userData.ringIndex + 1);
      }
    });
  };

  return group;
}

function createLabel(text, x, y, z) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 44px Rajdhani, sans-serif';
  ctx.fillStyle = '#FFD700';
  ctx.textAlign = 'center';
  ctx.shadowColor = '#FFD700';
  ctx.shadowBlur = 12;
  ctx.fillText(text, 320, 80);

  const tex = new THREE.CanvasTexture(canvas);
  const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.position.set(x, y, z);
  sprite.scale.set(10, 2, 1);
  return sprite;
}

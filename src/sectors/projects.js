/* ============================================================
   Sector 3 — The Project Nodes
   Two interlocking geometric shapes floating in space.
   ============================================================ */
import * as THREE from 'three';

export function createProjectNodes(position) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.sector = 'projects';

  // Node 1 – Transfer Learning (Icosahedron)
  const geo1 = new THREE.IcosahedronGeometry(2.2, 0);
  const mat1 = new THREE.MeshStandardMaterial({
    color: 0xE74C3C,
    emissive: 0xE74C3C,
    emissiveIntensity: 0.3,
    metalness: 0.5,
    roughness: 0.3,
    wireframe: true,
  });
  const node1 = new THREE.Mesh(geo1, mat1);
  node1.position.set(-2.5, 0, 0);
  group.add(node1);

  // Node 2 – Git Visualizer (Torus Knot)
  const geo2 = new THREE.TorusKnotGeometry(1.6, 0.4, 80, 16);
  const mat2 = new THREE.MeshStandardMaterial({
    color: 0xF39C12,
    emissive: 0xF39C12,
    emissiveIntensity: 0.3,
    metalness: 0.5,
    roughness: 0.3,
    wireframe: true,
  });
  const node2 = new THREE.Mesh(geo2, mat2);
  node2.position.set(3, 0, 0);
  group.add(node2);

  // Connecting beam
  const beamGeo = new THREE.CylinderGeometry(0.03, 0.03, 5.5, 8);
  const beamMat = new THREE.MeshBasicMaterial({ color: 0x66FCF1, transparent: true, opacity: 0.35 });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.z = Math.PI / 2;
  beam.position.set(0.25, 0, 0);
  group.add(beam);

  // Label
  group.add(createLabel('PROJECTS', 0, 5.5, 0));

  group.userData.animate = (t) => {
    node1.rotation.y = t * 0.4;
    node1.rotation.x = t * 0.2;
    node2.rotation.y = -t * 0.35;
    node2.rotation.x = t * 0.15;
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

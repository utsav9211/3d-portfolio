/* ============================================================
   Sector 5 — The Technology Grid (Skills)
   Floating hexagonal-style tiles with skill labels.
   ============================================================ */
import * as THREE from 'three';

const SKILL_ITEMS = [
  'Java', 'Python', 'C/C++', 'MySQL', 'JavaScript', 'HTML/CSS',
  'React', 'Node.js', 'Flask', 'WordPress',
  'Git', 'VS Code', 'Visual Studio', 'PyCharm',
  'pandas', 'NumPy',
];

export function createSkillsGrid(position) {
  const group = new THREE.Group();
  group.position.set(position.x, position.y, position.z);
  group.userData.sector = 'skills';

  const cols = 4;
  const spacingX = 3.2;
  const spacingY = 3.0;

  SKILL_ITEMS.forEach((skill, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col - (cols - 1) / 2) * spacingX;
    const y = -row * spacingY;

    const tile = createSkillTile(skill);
    tile.position.set(x, y, 0);
    tile.userData.baseY = y;
    tile.userData.offset = i;
    group.add(tile);
  });

  // Center the grid vertically
  const totalRows = Math.ceil(SKILL_ITEMS.length / cols);
  group.children.forEach((child) => {
    child.position.y += ((totalRows - 1) * spacingY) / 2;
  });

  // Label
  group.add(createLabel('SKILLS', 0, ((totalRows - 1) * spacingY) / 2 + 4, 0));

  group.userData.animate = (t) => {
    group.children.forEach((child) => {
      if (child.userData.offset !== undefined) {
        child.position.y = child.userData.baseY + ((Math.ceil(SKILL_ITEMS.length / cols) - 1) * spacingY) / 2 + Math.sin(t + child.userData.offset * 0.5) * 0.3;
        child.rotation.y = Math.sin(t * 0.5 + child.userData.offset) * 0.15;
      }
    });
  };

  return group;
}

function createSkillTile(text) {
  const group = new THREE.Group();

  // Hexagonal shape approximation (rounded box)
  const geo = new THREE.BoxGeometry(2.6, 1.4, 0.15, 1, 1, 1);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x1F2833,
    emissive: 0x66FCF1,
    emissiveIntensity: 0.08,
    metalness: 0.6,
    roughness: 0.4,
    transparent: true,
    opacity: 0.85,
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  // Edges glow
  const edgesGeo = new THREE.EdgesGeometry(geo);
  const edgesMat = new THREE.LineBasicMaterial({ color: 0x66FCF1, transparent: true, opacity: 0.5 });
  group.add(new THREE.LineSegments(edgesGeo, edgesMat));

  // Skill text – render onto the box face directly using a plane
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 256);
  ctx.font = 'bold 56px Rajdhani, sans-serif';
  ctx.fillStyle = '#66FCF1';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 128);
  const tex = new THREE.CanvasTexture(canvas);
  const labelGeo = new THREE.PlaneGeometry(2.5, 1.3);
  const labelMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthTest: true });
  const labelMesh = new THREE.Mesh(labelGeo, labelMat);
  labelMesh.position.z = 0.09;
  group.add(labelMesh);

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

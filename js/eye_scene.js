// 眼睛專屬 3D 場景邏輯 (Eye Scene) — v1

let scene, camera, renderer, controls;
let eyeballGroup  = new THREE.Group(); // 眼球本體
let musclesGroup  = new THREE.Group(); // 眼外肌
let nervesGroup   = new THREE.Group(); // 視神經

let interactableModels = [];
let raycaster, mouse;
let selectedMesh = null;
const originalMaterials = new Map();

const outlineMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.6,
  wireframe: true, transparent: true, opacity: 0.6
});

// ── 顏色定義 ────────────────────────────────
const EC = {
  sclera:      new THREE.Color(0xFFFAF0),  // 乳白色  — 鞏膜
  cornea:      new THREE.Color(0xADD8E6),  // 透明淡藍 — 角膜
  iris:        new THREE.Color(0x5B8DB8),  // 鋼藍   — 虹膜
  pupil:       new THREE.Color(0x111111),  // 近黑   — 瞳孔
  retina:      new THREE.Color(0xFF6B6B),  // 淡紅   — 視網膜
  choroid:     new THREE.Color(0xA0522D),  // 棕紅   — 脈絡膜
  lens:        new THREE.Color(0xE0F8FF),  // 水晶藍 — 水晶體
  vitreous:    new THREE.Color(0xD0F0FF),  // 淡冰藍 — 玻璃體
  ciliary:     new THREE.Color(0xB0A090),  // 灰褐   — 睫狀體/肌
  conjunctiva: new THREE.Color(0xFFCCCC),  // 淡粉紅 — 結膜
  canal:       new THREE.Color(0xFFD700),  // 金黃   — Schlemm管/小樑網
  fovea:       new THREE.Color(0xFF4500),  // 橘紅   — 黃斑/中央窩
  optic_disc:  new THREE.Color(0xFFFFCC),  // 乳黃   — 視神經盤
  muscle:      new THREE.Color(0xE07050),  // 橘棕   — 眼外肌
  nerve:       new THREE.Color(0xFFFFAA),  // 淡黃   — 視神經
  dura:        new THREE.Color(0xD8D0B0),  // 米色   — 硬腦膜
  default:     new THREE.Color(0xCCCCCC),
};

function eyeColor(name) {
  const n = name.toLowerCase();
  if (n.includes('sclera'))               return EC.sclera;
  if (n.includes('cornea'))               return EC.cornea;
  if (n.includes('corneo'))               return EC.cornea;
  if (n.includes('pupil'))                return EC.pupil;
  if (n.includes('iris'))                 return EC.iris;
  if (n.includes('retina') && !n.includes('ora')) return EC.retina;
  if (n.includes('ora_serrata'))          return EC.retina;
  if (n.includes('fovea') || n.includes('macula')) return EC.fovea;
  if (n.includes('optic_disc'))           return EC.optic_disc;
  if (n.includes('choroid'))              return EC.choroid;
  if (n.includes('lens'))                 return EC.lens;
  if (n.includes('vitreous'))             return EC.vitreous;
  if (n.includes('suspensory') || n.includes('ligament')) return EC.lens;
  if (n.includes('ciliary_body') || n.includes('ciliary_muscle') || n.includes('ciliary_processes')) return EC.ciliary;
  if (n.includes('conjunctiva'))          return EC.conjunctiva;
  if (n.includes('schlemm') || n.includes('trabecular')) return EC.canal;
  if (n.includes('aqueous'))              return new THREE.Color(0xCCEEFF);
  return EC.default;
}

// ─────────────────────────────────────────────
function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.001, 100);
  camera.position.set(0, 0, 0.12);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping   = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance   = 0.01;
  controls.maxDistance   = 2.0;

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dl1.position.set(2, 4, 3); scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xffffff, 0.5);
  dl2.position.set(-2, -1, -2); scene.add(dl2);

  scene.add(eyeballGroup);
  scene.add(musclesGroup);
  scene.add(nervesGroup);

  raycaster = new THREE.Raycaster();
  mouse     = new THREE.Vector2();

  loadModels();
  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);
  setupUIControls();
  animate();
}

// ── 模型載入 ──────────────────────────────────
function loadModels() {
  const loader = new THREE.GLTFLoader();
  let loadedCount = 0;
  const TOTAL = 6; // 左右眼球 + 左右眼肌 + 左右視神經

  function onDone() {
    loadedCount++;
    console.log('眼睛已載入:', loadedCount, '/', TOTAL);
    if (loadedCount >= TOTAL) {
      document.getElementById('loading-overlay').style.display = 'none';
      focusCamera();
    }
  }

  function loadEye(path, isLeft) {
    loader.load(path, (gltf) => {
      console.log(path, '載入成功');
      const meshes = [];
      gltf.scene.traverse(c => { if (c.isMesh) meshes.push(c); });
      console.log('  網格數:', meshes.length);
      meshes.forEach(child => {
        const color = eyeColor(child.name);
        const n = child.name.toLowerCase();
        // 透明材質：角膜、玻璃體、房水、水晶體
        const isTransparent = n.includes('cornea') || n.includes('vitreous') ||
                              n.includes('aqueous') || n.includes('lens') ||
                              n.includes('suspensory') || n.includes('aqueous');
        const mat = new THREE.MeshStandardMaterial({
          color,
          roughness: isTransparent ? 0.0 : 0.6,
          metalness: 0.05,
          transparent: true,
          opacity: isTransparent ? 0.45 : 1.0,
          side: THREE.DoubleSide,
        });
        child.material = mat;
        originalMaterials.set(child.uuid, mat);
        interactableModels.push(child);
        eyeballGroup.add(child);
      });
      onDone();
    }, undefined, err => { console.error(path, '載入失敗:', err); onDone(); });
  }

  function loadMuscles(path) {
    loader.load(path, (gltf) => {
      const meshes = [];
      gltf.scene.traverse(c => { if (c.isMesh) meshes.push(c); });
      meshes.forEach(child => {
        const mat = new THREE.MeshStandardMaterial({
          color: EC.muscle, roughness: 0.7, metalness: 0.05,
          transparent: true, opacity: 1.0, side: THREE.DoubleSide,
        });
        child.material = mat;
        originalMaterials.set(child.uuid, mat);
        interactableModels.push(child);
        musclesGroup.add(child);
      });
      onDone();
    }, undefined, err => { console.error(path, '載入失敗:', err); onDone(); });
  }

  function loadNerves(path) {
    loader.load(path, (gltf) => {
      const meshes = [];
      gltf.scene.traverse(c => { if (c.isMesh) meshes.push(c); });
      meshes.forEach(child => {
        const n = child.name.toLowerCase();
        const color = n.includes('dura') ? EC.dura : EC.nerve;
        const mat = new THREE.MeshStandardMaterial({
          color, roughness: 0.5, metalness: 0.05,
          transparent: true, opacity: 1.0, side: THREE.DoubleSide,
        });
        child.material = mat;
        originalMaterials.set(child.uuid, mat);
        interactableModels.push(child);
        nervesGroup.add(child);
      });
      onDone();
    }, undefined, err => { console.error(path, '載入失敗:', err); onDone(); });
  }

  loadEye('./models/b2_eye_l.glb', true);
  loadEye('./models/b2_eye_r.glb', false);
  loadMuscles('./models/b2_eye_muscles_l.glb');
  loadMuscles('./models/b2_eye_muscles_r.glb');
  loadNerves('./models/b2_eye_nerves_l.glb');
  loadNerves('./models/b2_eye_nerves_r.glb');
}

function focusCamera() {
  const box = new THREE.Box3();
  [eyeballGroup, musclesGroup, nervesGroup].forEach(g => {
    if (g.children.length) box.expandByObject(g);
  });
  if (box.isEmpty()) { console.warn('眼睛場景是空的！'); return; }
  const center = box.getCenter(new THREE.Vector3());
  const size   = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  controls.target.copy(center);
  camera.position.set(center.x, center.y, center.z + maxDim * 1.6);
  controls.update();
  console.log('眼睛場景尺寸:', size, '中心:', center);
}

// ── 互動 ──────────────────────────────────────
function onMouseMove(event) {
  const c = document.getElementById('canvas-container');
  const r = c.getBoundingClientRect();
  mouse.x =  ((event.clientX - r.left) / c.clientWidth)  * 2 - 1;
  mouse.y = -((event.clientY - r.top)  / c.clientHeight) * 2 + 1;
}

function onClick() {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(scene.children, true);
  const valid = hits.find(h => {
    if (!interactableModels.includes(h.object)) return false;
    let o = h.object;
    while (o) { if (o.visible === false) return false; o = o.parent; }
    if (h.object.material && h.object.material.opacity <= 0.05) return false;
    return true;
  });
  if (valid) selectPart(valid.object);
  else closeInfoPanel();
}

function selectPart(mesh) {
  if (selectedMesh) selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
  selectedMesh = mesh;
  selectedMesh.material = outlineMaterial.clone();
  const data = window.getEyeData ? window.getEyeData(mesh.name) :
               { system: '眼睛', zh: mesh.name, en: mesh.name, desc: '' };
  document.getElementById('info-system').innerText      = data.system;
  document.getElementById('info-title-zh').innerText    = data.zh;
  document.getElementById('info-title-en').innerText    = data.en;
  document.getElementById('info-description').innerText = data.desc;
  document.getElementById('info-panel').classList.add('open');
}

function closeInfoPanel() {
  document.getElementById('info-panel').classList.remove('open');
  if (selectedMesh) {
    selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
    selectedMesh = null;
  }
}

// ── UI 控制 ───────────────────────────────────
function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);

  const toggleMap = {
    'toggle-eyeball':  eyeballGroup,
    'toggle-muscles':  musclesGroup,
    'toggle-nerves':   nervesGroup,
  };
  for (const [id, group] of Object.entries(toggleMap)) {
    document.getElementById(id)?.addEventListener('change', e => { group.visible = e.target.checked; });
  }

  function setOpacity(group, opacity) {
    group.traverse(child => {
      if (!child.isMesh) return;
      const mat = originalMaterials.get(child.uuid);
      if (mat) { mat.transparent = opacity < 1.0; mat.opacity = opacity; mat.needsUpdate = true; }
    });
  }

  [
    { s: 'opacity-eyeball',  v: 'opacity-eyeball-val',  g: eyeballGroup  },
    { s: 'opacity-muscles',  v: 'opacity-muscles-val',  g: musclesGroup  },
    { s: 'opacity-nerves',   v: 'opacity-nerves-val',   g: nervesGroup   },
  ].forEach(({ s, v, g }) => {
    const el = document.getElementById(s);
    const vl = document.getElementById(v);
    if (!el) return;
    el.addEventListener('input', e => {
      const pct = parseInt(e.target.value, 10);
      if (vl) vl.textContent = pct + '%';
      setOpacity(g, pct / 100);
    });
  });

  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const box = new THREE.Box3();
      [eyeballGroup, musclesGroup, nervesGroup].forEach(g => { if (g.children.length) box.expandByObject(g); });
      if (box.isEmpty()) return;
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const dist   = Math.max(size.x, size.y, size.z) * 1.6;
      switch (btn.dataset.view) {
        case 'front': camera.position.set(center.x, center.y, center.z + dist); break;
        case 'back':  camera.position.set(center.x, center.y, center.z - dist); break;
        case 'top':   camera.position.set(center.x, center.y + dist, center.z); break;
        case 'left':  camera.position.set(center.x - dist, center.y, center.z); break;
      }
      controls.target.copy(center);
      controls.update();
    });
  });
}

function onWindowResize() {
  const c = document.getElementById('canvas-container');
  camera.aspect = c.clientWidth / c.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(c.clientWidth, c.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);

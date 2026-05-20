// 心臟專屬 3D 場景邏輯 (Heart Scene) — v4 修正 traverse+add 衝突

let scene, camera, renderer, controls;
let myocardiumGroup = new THREE.Group();
let valvesGroup     = new THREE.Group();
let coronaryGroup   = new THREE.Group();
let vesselsGroup    = new THREE.Group();

let interactableModels = [];
let raycaster, mouse;
let selectedMesh = null;
const originalMaterials = new Map();

const outlineMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.6,
  wireframe: true, transparent: true, opacity: 0.6
});

// ── 顏色 ─────────────────────────────────────
const C = {
  myocardium_right: new THREE.Color(0xA52A2A),
  myocardium_left:  new THREE.Color(0xC0392B),
  valve:            new THREE.Color(0xFFFACD),
  papillary:        new THREE.Color(0xDC143C),
  coronary_artery:  new THREE.Color(0xFF3333),
  coronary_vein:    new THREE.Color(0x4169E1),
  artery:           new THREE.Color(0xFF0000),
  vein:             new THREE.Color(0x1E90FF),
};

function heartColor(name) {
  const n = name.toLowerCase();
  if (n.includes('valve'))     return C.valve;
  if (n.includes('papillary')) return C.papillary;
  if (n.includes('right'))     return C.myocardium_right;
  return C.myocardium_left;
}

function vesselColor(name) {
  const n = name.toLowerCase();
  const isCoronary = n.includes('coronary') || n.includes('descending_artery') ||
                     n.includes('marginal')  || n.includes('cardiac_vein') ||
                     n.includes('oblique_vein') || n.includes('posterior_vein') ||
                     n.includes('sinus');
  if (isCoronary) {
    return (n.includes('vein') || n.includes('sinus')) ? C.coronary_vein : C.coronary_artery;
  }
  if (n.includes('pulmonary_artery') || n.includes('pulmonary_trunk') ||
      n.includes('vena_cava') || n.includes('brachiocephalic_vein')) return C.vein;
  return C.artery;
}

// ─────────────────────────────────────────────
function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.001, 1000);
  camera.position.set(0, 0, 0.35);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping   = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance   = 0.02;
  controls.maxDistance   = 3.0;

  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.3);
  dl1.position.set(2, 5, 3); scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xffffff, 0.6);
  dl2.position.set(-2, -2, -3); scene.add(dl2);

  scene.add(myocardiumGroup);
  scene.add(valvesGroup);
  scene.add(coronaryGroup);
  scene.add(vesselsGroup);

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
  const TOTAL = 2;

  function onDone() {
    loadedCount++;
    console.log('已載入:', loadedCount, '/', TOTAL);
    if (loadedCount >= TOTAL) {
      document.getElementById('loading-overlay').style.display = 'none';
      focusCamera();
    }
  }

  // 1) 心臟本體 —— 先收集，再分組
  loader.load('./models/b1_heart.glb',
    (gltf) => {
      console.log('b1_heart.glb 載入成功');
      const meshes = [];
      gltf.scene.traverse((child) => {
        if (child.isMesh) meshes.push(child);
      });
      console.log('心臟網格數:', meshes.length);

      meshes.forEach((child) => {
        const n = child.name.toLowerCase();
        const isValve     = n.includes('valve');
        const isPapillary = n.includes('papillary');
        const color       = heartColor(child.name);
        const mat = new THREE.MeshStandardMaterial({
          color, roughness: 0.6, metalness: 0.1,
          transparent: true, opacity: 1.0, side: THREE.DoubleSide
        });
        child.material = mat;
        originalMaterials.set(child.uuid, mat);
        interactableModels.push(child);
        if (isValve || isPapillary) valvesGroup.add(child);
        else myocardiumGroup.add(child);
      });
      onDone();
    },
    undefined,
    (err) => { console.error('b1_heart.glb 錯誤:', err); onDone(); }
  );

  // 2) 心臟血管 —— 先收集，再分組
  loader.load('./models/b1_heart_vessels.glb',
    (gltf) => {
      console.log('b1_heart_vessels.glb 載入成功');
      const meshes = [];
      gltf.scene.traverse((child) => {
        if (child.isMesh) meshes.push(child);
      });
      console.log('血管網格數:', meshes.length);

      meshes.forEach((child) => {
        const n = child.name.toLowerCase();
        const isCoronary = n.includes('coronary') || n.includes('descending_artery') ||
                           n.includes('marginal')  || n.includes('cardiac_vein') ||
                           n.includes('oblique_vein') || n.includes('posterior_vein') ||
                           n.includes('sinus');
        const color = vesselColor(child.name);
        const mat = new THREE.MeshStandardMaterial({
          color, roughness: 0.4, metalness: 0.25,
          transparent: true, opacity: 1.0, side: THREE.DoubleSide
        });
        child.material = mat;
        originalMaterials.set(child.uuid, mat);
        interactableModels.push(child);
        if (isCoronary) coronaryGroup.add(child);
        else vesselsGroup.add(child);
      });
      onDone();
    },
    undefined,
    (err) => { console.error('b1_heart_vessels.glb 錯誤:', err); onDone(); }
  );
}

function focusCamera() {
  const box = new THREE.Box3();
  [myocardiumGroup, valvesGroup, coronaryGroup, vesselsGroup].forEach(g => {
    if (g.children.length) box.expandByObject(g);
  });
  if (box.isEmpty()) { console.warn('場景是空的！'); return; }
  const center = box.getCenter(new THREE.Vector3());
  const size   = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  controls.target.copy(center);
  camera.position.set(center.x, center.y, center.z + maxDim * 1.5);
  controls.update();
  console.log('場景尺寸:', size, '中心:', center);
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
  const data = window.getHeartData ? window.getHeartData(mesh.name) :
               { system: '心臟', zh: mesh.name, en: mesh.name, desc: '' };
  document.getElementById('info-system').innerText     = data.system;
  document.getElementById('info-title-zh').innerText   = data.zh;
  document.getElementById('info-title-en').innerText   = data.en;
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

// ── UI ────────────────────────────────────────
function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);

  const toggleMap = {
    'toggle-myocardium': myocardiumGroup,
    'toggle-valves':     valvesGroup,
    'toggle-coronary':   coronaryGroup,
    'toggle-vessels':    vesselsGroup,
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
    { s: 'opacity-myocardium', v: 'opacity-myocardium-val', g: myocardiumGroup },
    { s: 'opacity-valves',     v: 'opacity-valves-val',     g: valvesGroup     },
    { s: 'opacity-coronary',   v: 'opacity-coronary-val',   g: coronaryGroup   },
    { s: 'opacity-vessels',    v: 'opacity-vessels-val',    g: vesselsGroup    },
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
      [myocardiumGroup, valvesGroup, coronaryGroup, vesselsGroup].forEach(g => { if (g.children.length) box.expandByObject(g); });
      if (box.isEmpty()) return;
      const center = box.getCenter(new THREE.Vector3());
      const size   = box.getSize(new THREE.Vector3());
      const dist   = Math.max(size.x, size.y, size.z) * 1.5;
      switch (btn.dataset.view) {
        case 'front': camera.position.set(center.x, center.y, center.z + dist); break;
        case 'back':  camera.position.set(center.x, center.y, center.z - dist); break;
        case 'top':   camera.position.set(center.x, center.y + dist, center.z); break;
      }
      controls.target.copy(center);
      controls.update();
    });
  });
}

// ── 動畫 ──────────────────────────────────────
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

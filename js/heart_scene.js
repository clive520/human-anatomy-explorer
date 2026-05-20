// 心臟專屬 3D 場景邏輯 (Heart Scene) — v3 重寫穩定版

let scene, camera, renderer, controls;
let myocardiumGroup = new THREE.Group(); // 心房與心室肌肉
let valvesGroup     = new THREE.Group(); // 瓣膜與乳頭肌
let coronaryGroup   = new THREE.Group(); // 冠狀血管
let vesselsGroup    = new THREE.Group(); // 大血管

let interactableModels = [];
let raycaster, mouse;
let selectedMesh = null;
const originalMaterials = new Map();

const outlineMaterial = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.6,
  wireframe: true, transparent: true, opacity: 0.6
});

// ── 顏色定義 ─────────────────────────────────
const C = {
  myocardium_right: new THREE.Color(0xA52A2A),  // 右心  暗紅
  myocardium_left:  new THREE.Color(0xB22222),  // 左心  鮮紅
  valve:            new THREE.Color(0xFFFACD),  // 瓣膜  象牙黃
  papillary:        new THREE.Color(0xDC143C),  // 乳頭肌 深紅
  coronary_artery:  new THREE.Color(0xFF2222),  // 冠狀動脈 紅
  coronary_vein:    new THREE.Color(0x4169E1),  // 冠狀靜脈 藍
  artery:           new THREE.Color(0xFF0000),  // 大動脈   鮮紅
  vein:             new THREE.Color(0x1E90FF),  // 大靜脈   鮮藍
};

function heartColor(name) {
  const n = name.toLowerCase();
  if (n.includes('valve'))                return C.valve;
  if (n.includes('papillary'))            return C.papillary;
  if (n.includes('right'))                return C.myocardium_right;
  return C.myocardium_left;
}

function vesselColor(name) {
  const n = name.toLowerCase();
  const isCoronary = n.includes('coronary') || n.includes('descending_artery') ||
                     n.includes('marginal') || n.includes('cardiac_vein') ||
                     n.includes('sinus') || n.includes('cardiac_v');
  if (isCoronary) {
    return (n.includes('vein') || n.includes('sinus')) ? C.coronary_vein : C.coronary_artery;
  }
  // 大血管
  if (n.includes('pulmonary_artery') || n.includes('pulmonary_trunk') ||
      n.includes('vena_cava') || n.includes('brachiocephalic_vein')) return C.vein;
  return C.artery;
}

// ─────────────────────────────────────────────
function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  scene.background = null; // 透明背景，讓 CSS 的深色主題透出

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
  controls.minDistance   = 0.05;
  controls.maxDistance   = 2.0;

  // 燈光
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.3);
  dl1.position.set(2, 5, 3);
  scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xffffff, 0.6);
  dl2.position.set(-2, -2, -3);
  scene.add(dl2);

  // 把四個群組加入場景
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

  function onLoaded() {
    loadedCount++;
    if (loadedCount >= TOTAL) {
      document.getElementById('loading-overlay').style.display = 'none';

      // 自動對焦
      const allGroups = [myocardiumGroup, valvesGroup, coronaryGroup, vesselsGroup];
      const box = new THREE.Box3();
      allGroups.forEach(g => { if (g.children.length) box.expandByObject(g); });
      if (!box.isEmpty()) {
        const center = box.getCenter(new THREE.Vector3());
        controls.target.copy(center);
        camera.position.set(center.x, center.y, center.z + 0.15);
        controls.update();
      }
    }
  }

  // 1) 心臟本體
  loader.load('./models/b1_heart.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;
      const n = child.name.toLowerCase();
      const isValve    = n.includes('valve');
      const isPapillary = n.includes('papillary');
      const color      = heartColor(child.name);
      const mat = new THREE.MeshStandardMaterial({
        color, roughness: 0.6, metalness: 0.1, transparent: true, opacity: 1.0, side: THREE.DoubleSide
      });
      child.material = mat;
      originalMaterials.set(child.uuid, mat);
      interactableModels.push(child);
      if (isValve || isPapillary) {
        valvesGroup.add(child);
      } else {
        myocardiumGroup.add(child);
      }
    });
    onLoaded();
  }, undefined, (err) => { console.error('心臟本體載入失敗:', err); onLoaded(); });

  // 2) 心臟血管
  loader.load('./models/b1_heart_vessels.glb', (gltf) => {
    gltf.scene.traverse((child) => {
      if (!child.isMesh) return;
      const n = child.name.toLowerCase();
      const isCoronary = n.includes('coronary') || n.includes('descending_artery') ||
                         n.includes('marginal')  || n.includes('cardiac_vein') ||
                         n.includes('cardiac_v') || n.includes('sinus') ||
                         n.includes('oblique_vein') || n.includes('posterior_vein');
      const color = vesselColor(child.name);
      const mat = new THREE.MeshStandardMaterial({
        color, roughness: 0.4, metalness: 0.25, transparent: true, opacity: 1.0, side: THREE.DoubleSide
      });
      child.material = mat;
      originalMaterials.set(child.uuid, mat);
      interactableModels.push(child);
      if (isCoronary) {
        coronaryGroup.add(child);
      } else {
        vesselsGroup.add(child);
      }
    });
    onLoaded();
  }, undefined, (err) => { console.error('心臟血管載入失敗:', err); onLoaded(); });
}

// ── 滑鼠事件 ─────────────────────────────────
function onMouseMove(event) {
  const container = document.getElementById('canvas-container');
  const rect = container.getBoundingClientRect();
  mouse.x =  ((event.clientX - rect.left) / container.clientWidth)  * 2 - 1;
  mouse.y = -((event.clientY - rect.top)  / container.clientHeight) * 2 + 1;
}

function onClick() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);
  const hit = intersects.find(h => {
    if (!interactableModels.includes(h.object)) return false;
    let obj = h.object;
    while (obj) { if (obj.visible === false) return false; obj = obj.parent; }
    if (h.object.material && h.object.material.opacity <= 0.05) return false;
    return true;
  });
  if (hit) selectPart(hit.object);
  else closeInfoPanel();
}

function selectPart(mesh) {
  if (selectedMesh) selectedMesh.material = originalMaterials.get(selectedMesh.uuid) || selectedMesh.material;
  selectedMesh = mesh;
  selectedMesh.material = outlineMaterial.clone();
  const data = window.getHeartData ? window.getHeartData(mesh.name) : { system: '心臟', zh: mesh.name, en: mesh.name, desc: '' };
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

// ── UI 控制 ───────────────────────────────────
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
    { slider: 'opacity-myocardium', val: 'opacity-myocardium-val', group: myocardiumGroup },
    { slider: 'opacity-valves',     val: 'opacity-valves-val',     group: valvesGroup     },
    { slider: 'opacity-coronary',   val: 'opacity-coronary-val',   group: coronaryGroup   },
    { slider: 'opacity-vessels',    val: 'opacity-vessels-val',    group: vesselsGroup    },
  ].forEach(({ slider, val, group }) => {
    const s = document.getElementById(slider);
    const v = document.getElementById(val);
    if (!s) return;
    s.addEventListener('input', e => {
      const pct = parseInt(e.target.value, 10);
      if (v) v.textContent = pct + '%';
      setOpacity(group, pct / 100);
    });
  });

  // 視角按鈕
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view   = btn.dataset.view;
      const box    = new THREE.Box3();
      [myocardiumGroup, valvesGroup, coronaryGroup, vesselsGroup].forEach(g => { if (g.children.length) box.expandByObject(g); });
      if (box.isEmpty()) return;
      const center = box.getCenter(new THREE.Vector3());
      const dist   = 0.15;
      switch (view) {
        case 'front': camera.position.set(center.x,          center.y,          center.z + dist); break;
        case 'back':  camera.position.set(center.x,          center.y,          center.z - dist); break;
        case 'top':   camera.position.set(center.x,          center.y + dist,   center.z);        break;
      }
      controls.target.copy(center);
      controls.update();
    });
  });
}

// ── 動畫迴圈 ─────────────────────────────────
function onWindowResize() {
  const container = document.getElementById('canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', init);

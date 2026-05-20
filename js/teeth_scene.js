// 牙齒 3D 場景（程序化生成 32 顆牙齒）— v1

let scene, camera, renderer, controls;
let upperGroup = new THREE.Group(); // 上顎牙齒
let lowerGroup = new THREE.Group(); // 下顎牙齒

let interactableObjects = []; // { mesh, toothNum }
let raycaster, mouse;
let selectedMeshes = [];
const originalMaterials = new Map();

const highlightMat = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.5,
  transparent: true, opacity: 0.85, roughness: 0.1
});

// ── 牙型參數 ─────────────────────────────────
const TOOTH_CFG = {
  central_incisor:  { crownTopR: 0.046, crownBotR: 0.050, crownH: 0.100, rootTopR: 0.050, rootTipR: 0.008, rootH: 0.135 },
  lateral_incisor:  { crownTopR: 0.036, crownBotR: 0.040, crownH: 0.090, rootTopR: 0.040, rootTipR: 0.007, rootH: 0.125 },
  canine:           { crownTopR: 0.020, crownBotR: 0.040, crownH: 0.115, rootTopR: 0.040, rootTipR: 0.007, rootH: 0.170 },
  premolar:         { crownTopR: 0.042, crownBotR: 0.048, crownH: 0.090, rootTopR: 0.048, rootTipR: 0.010, rootH: 0.130 },
  molar:            { crownTopR: 0.060, crownBotR: 0.065, crownH: 0.085, rootTopR: 0.065, rootTipR: 0.015, rootH: 0.120 },
};

// ── 牙齒顏色 ─────────────────────────────────
const CROWN_COLOR = {
  central_incisor:  new THREE.Color(0xFFFEF5),
  lateral_incisor:  new THREE.Color(0xFFFEF0),
  canine:           new THREE.Color(0xFFF8E0),
  premolar:         new THREE.Color(0xFFF5DC),
  molar:            new THREE.Color(0xFFF0CC),
};
const ROOT_COLOR  = new THREE.Color(0xF0E0A0);
const GUM_COLOR   = new THREE.Color(0xFFB5C0);

// ── 上下顎資料 ────────────────────────────────
const UPPER_TEETH = [
  { num:1,  type:'molar'          }, { num:2,  type:'molar'          },
  { num:3,  type:'molar'          }, { num:4,  type:'premolar'       },
  { num:5,  type:'premolar'       }, { num:6,  type:'canine'         },
  { num:7,  type:'lateral_incisor'}, { num:8,  type:'central_incisor'},
  { num:9,  type:'central_incisor'}, { num:10, type:'lateral_incisor'},
  { num:11, type:'canine'         }, { num:12, type:'premolar'       },
  { num:13, type:'premolar'       }, { num:14, type:'molar'          },
  { num:15, type:'molar'          }, { num:16, type:'molar'          },
];
const LOWER_TEETH = [
  { num:17, type:'molar'          }, { num:18, type:'molar'          },
  { num:19, type:'molar'          }, { num:20, type:'premolar'       },
  { num:21, type:'premolar'       }, { num:22, type:'canine'         },
  { num:23, type:'lateral_incisor'}, { num:24, type:'central_incisor'},
  { num:25, type:'central_incisor'}, { num:26, type:'lateral_incisor'},
  { num:27, type:'canine'         }, { num:28, type:'premolar'       },
  { num:29, type:'premolar'       }, { num:30, type:'molar'          },
  { num:31, type:'molar'          }, { num:32, type:'molar'          },
];

// ── 建立單顆牙齒 Mesh ─────────────────────────
function buildTooth(type, toothNum, isUpper) {
  const cfg = TOOTH_CFG[type] || TOOTH_CFG.molar;
  const group = new THREE.Group();

  // 牙冠（琺瑯質 enamel）
  const crownGeo = new THREE.CylinderGeometry(cfg.crownTopR, cfg.crownBotR, cfg.crownH, 10);
  const crownMat = new THREE.MeshStandardMaterial({
    color: CROWN_COLOR[type] || new THREE.Color(0xFFFFF0),
    roughness: 0.05, metalness: 0.1, transparent: false,
  });
  const crown = new THREE.Mesh(crownGeo, crownMat);
  crown.position.y = isUpper ? -(cfg.crownH / 2) : (cfg.crownH / 2);
  crown.userData.toothNum = toothNum;
  originalMaterials.set(crown.uuid, crownMat);
  group.add(crown);
  interactableObjects.push(crown);

  // 齒根（牙本質 dentin）
  const rootGeo = new THREE.CylinderGeometry(cfg.rootTipR, cfg.rootTopR, cfg.rootH, 8);
  const rootMat = new THREE.MeshStandardMaterial({
    color: ROOT_COLOR, roughness: 0.3, metalness: 0.0, transparent: false,
  });
  const root = new THREE.Mesh(rootGeo, rootMat);
  root.position.y = isUpper ? (cfg.rootH / 2) : -(cfg.rootH / 2);
  root.userData.toothNum = toothNum;
  originalMaterials.set(root.uuid, rootMat);
  group.add(root);
  interactableObjects.push(root);

  return group;
}

// ── 建立牙弓 ─────────────────────────────────
function buildArch(teethList, isUpper, archA, archB, yBase) {
  const n = teethList.length; // 16
  for (let i = 0; i < n; i++) {
    const { num, type } = teethList[i];
    const t = (i / (n - 1)) * Math.PI; // 0 → π
    const px = -archA * Math.cos(t);
    const pz =  archB * Math.sin(t);

    const toothGroup = buildTooth(type, num, isUpper);
    toothGroup.position.set(px, yBase, pz);

    // 讓牙齒面朝外（齒面朝弓形外側）
    const rotY = Math.atan2(-Math.cos(t), Math.sin(t));
    toothGroup.rotation.y = rotY;

    (isUpper ? upperGroup : lowerGroup).add(toothGroup);

    // 牙齦（Gum）— 小扁球在齒頸線處
    const gumGeo = new THREE.SphereGeometry(
      (TOOTH_CFG[type] || TOOTH_CFG.molar).crownBotR * 0.7,
      8, 6
    );
    const gumMat = new THREE.MeshStandardMaterial({
      color: GUM_COLOR, roughness: 0.8, metalness: 0.0,
    });
    const gum = new THREE.Mesh(gumGeo, gumMat);
    gum.position.set(px, yBase, pz);
    gum.scale.set(1.0, 0.4, 1.0);
    (isUpper ? upperGroup : lowerGroup).add(gum);
  }
}

// ── 初始化場景 ────────────────────────────────
function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 100);
  camera.position.set(0, 0.25, 0.95);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping   = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0.20);
  controls.minDistance = 0.1;
  controls.maxDistance = 3.0;
  controls.update();

  // 燈光
  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.2);
  dl1.position.set(1, 3, 2); scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xffffdd, 0.5);
  dl2.position.set(-1, -1, -1); scene.add(dl2);

  // 建立上下顎牙弓
  // Upper arch: a=0.42 (寬), b=0.30 (深), y=0.15 (上方，與下顎保持足夠間距)
  buildArch(UPPER_TEETH, true,  0.42, 0.30,  0.16);
  // Lower arch: 稍小且稍窄（解剖上下顎比上顎窄）
  buildArch(LOWER_TEETH, false, 0.38, 0.27, -0.16);

  scene.add(upperGroup);
  scene.add(lowerGroup);

  raycaster = new THREE.Raycaster();
  mouse     = new THREE.Vector2();

  // 隱藏載入中
  document.getElementById('loading-overlay').style.display = 'none';

  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);

  setupUIControls();
  animate();
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
  const hits = raycaster.intersectObjects(interactableObjects, false);

  // 還原上一個選取
  selectedMeshes.forEach(m => { m.material = originalMaterials.get(m.uuid) || m.material; });
  selectedMeshes = [];

  if (hits.length === 0) { closeInfoPanel(); return; }

  const hitMesh = hits[0].object;
  const toothNum = hitMesh.userData.toothNum;
  if (!toothNum) { closeInfoPanel(); return; }

  // 高亮同一顆牙的所有 mesh（crown+root）
  interactableObjects.forEach(m => {
    if (m.userData.toothNum === toothNum) {
      originalMaterials.set(m.uuid + '_bak', m.material);
      m.material = highlightMat.clone();
      selectedMeshes.push(m);
    }
  });

  const data = window.getTeethData ? window.getTeethData(toothNum) : { zh: `牙齒 #${toothNum}`, en: '', system: '牙齒', desc: '' };
  document.getElementById('info-system').innerText      = data.system;
  document.getElementById('info-tooth-num').innerText   = `牙位 #${toothNum}`;
  document.getElementById('info-title-zh').innerText    = data.zh;
  document.getElementById('info-title-en').innerText    = data.en;
  document.getElementById('info-description').innerText = data.desc;
  document.getElementById('info-panel').classList.add('open');
}

function closeInfoPanel() {
  selectedMeshes.forEach(m => { m.material = originalMaterials.get(m.uuid) || m.material; });
  selectedMeshes = [];
  document.getElementById('info-panel').classList.remove('open');
}

// ── UI 控制 ───────────────────────────────────
function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);

  document.getElementById('toggle-upper')?.addEventListener('change', e => { upperGroup.visible = e.target.checked; });
  document.getElementById('toggle-lower')?.addEventListener('change', e => { lowerGroup.visible = e.target.checked; });

  // 視角按鈕
  const VIEWS = {
    front:  [0,    0.1,  0.95],
    top:    [0,    1.0,  0.25],
    bottom: [0,   -1.0,  0.25],
    left:   [-1.0, 0.1,  0.2],
  };
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = VIEWS[btn.dataset.view];
      if (!v) return;
      camera.position.set(v[0], v[1], v[2]);
      controls.target.set(0, 0, 0.3);
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

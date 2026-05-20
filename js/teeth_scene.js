// 牙齒 3D 場景（BoxGeometry 重製版）— v3

let scene, camera, renderer, controls;
let upperGroup = new THREE.Group();
let lowerGroup = new THREE.Group();

let interactableObjects = [];
let raycaster, mouse;
let selectedMeshes = [];
const originalMaterials = new Map();

const highlightMat = new THREE.MeshStandardMaterial({
  color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 0.4,
  transparent: true, opacity: 0.80, roughness: 0.1
});

// ── 牙型參數 (單位 = Three.js units，約 1 unit = 10 mm) ─────
// w = 近遠中寬, h = 冠高, d = 頰舌厚, rootH = 根長
const TOOTH_SHAPES = {
  central_incisor:  { w: 0.090, h: 0.100, d: 0.066, rootH: 0.00 },
  lateral_incisor:  { w: 0.072, h: 0.090, d: 0.060, rootH: 0.00 },
  canine:           { w: 0.080, h: 0.108, d: 0.070, rootH: 0.00 },
  premolar:         { w: 0.086, h: 0.090, d: 0.086, rootH: 0.00 },
  molar:            { w: 0.105, h: 0.082, d: 0.098, rootH: 0.00 },
};

// ── 牙齒顏色 ─────────────────────────────────────────────
const CROWN_COLORS = {
  central_incisor: new THREE.Color(0xFFFEF8),
  lateral_incisor: new THREE.Color(0xFFFEF4),
  canine:          new THREE.Color(0xFFFAE0),
  premolar:        new THREE.Color(0xFFF5D8),
  molar:           new THREE.Color(0xFFF0C8),
};
const GUM_COLOR = new THREE.Color(0xFF9EB0);

// ── 牙列資料 ─────────────────────────────────────────────
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

// ── 建立單顆牙冠 (BoxGeometry) ────────────────────────────
function buildCrown(type, toothNum, isUpper) {
  const s = TOOTH_SHAPES[type] || TOOTH_SHAPES.molar;
  const color = CROWN_COLORS[type] || new THREE.Color(0xFFFEF0);

  // 牙冠本體 —— 梯形效果：頂部稍窄（齒頸），底部稍寬（咬合面）
  // 用兩個略微縮放的 BoxGeometry 疊加模擬梯形
  const crownGeo = new THREE.BoxGeometry(s.w, s.h, s.d);
  const crownMat = new THREE.MeshStandardMaterial({
    color, roughness: 0.08, metalness: 0.12,
  });
  const crown = new THREE.Mesh(crownGeo, crownMat);

  // 上顎：冠朝下（-y），下顎：冠朝上（+y）
  // 齒頸線 (CEJ) 在 y=0 處，冠從 0 往咬合方向延伸
  crown.position.y = isUpper ? -(s.h / 2) : (s.h / 2);

  crown.userData.toothNum = toothNum;
  originalMaterials.set(crown.uuid, crownMat);
  interactableObjects.push(crown);

  return crown;
}

// ── 建立牙齦管（TubeGeometry，沿牙弓曲線） ─────────────────
function buildGumTube(isUpper, archA, archB, yBase) {
  const pts = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * Math.PI;
    pts.push(new THREE.Vector3(-archA * Math.cos(t), yBase, archB * Math.sin(t)));
  }
  const curve  = new THREE.CatmullRomCurve3(pts);
  const geo    = new THREE.TubeGeometry(curve, 60, 0.030, 10, false);
  const mat    = new THREE.MeshStandardMaterial({ color: GUM_COLOR, roughness: 0.75, metalness: 0.0 });
  return new THREE.Mesh(geo, mat);
}

// ── 建立整條牙弓 ──────────────────────────────────────────
function buildArch(teethList, isUpper, archA, archB, yBase) {
  const n = teethList.length; // 16

  teethList.forEach(({ num, type }, i) => {
    const t  = (i / (n - 1)) * Math.PI;
    const px = -archA * Math.cos(t);
    const pz =  archB * Math.sin(t);

    const crown = buildCrown(type, num, isUpper);

    // 讓牙冠面朝弓形外側
    const rotY = Math.atan2(-Math.cos(t), Math.sin(t));
    crown.position.set(px, yBase, pz);
    crown.rotation.y = rotY;

    // 牙冠上方（上顎）/ 下方（下顎）加一個略帶弧度的齒頸縮口效果
    // 用微微縮放的 clone 疊加
    const neck = crown.clone();
    neck.material = crown.material;
    const s = TOOTH_SHAPES[type] || TOOTH_SHAPES.molar;
    const neckScale = isUpper ? 1 : 1;
    neck.scale.set(0.82, 0.14, 0.88);
    neck.position.set(px, isUpper ? yBase : yBase, pz);
    neck.rotation.y = rotY;
    // neck 僅為視覺輔助，不加入 interactable

    (isUpper ? upperGroup : lowerGroup).add(crown);
  });

  // 牙齦管
  const gum = buildGumTube(isUpper, archA, archB, yBase);
  (isUpper ? upperGroup : lowerGroup).add(gum);
}

// ── 初始化場景 ────────────────────────────────────────────
function init() {
  const container = document.getElementById('canvas-container');

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 100);
  camera.position.set(0, 0.1, 0.90);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping   = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.target.set(0, 0, 0.18);
  controls.minDistance = 0.1;
  controls.maxDistance = 3.0;
  controls.update();

  // 燈光（多向光，讓牙齒有立體感）
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl1 = new THREE.DirectionalLight(0xffffff, 1.3);
  dl1.position.set(0.5, 2, 2); scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xfff0e0, 0.6);
  dl2.position.set(-1, -0.5, -1); scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.4);
  dl3.position.set(0, -1, 2); scene.add(dl3);

  // Upper arch: 寬 0.42, 深 0.30, y = +0.14（牙齦線在 0.14）
  buildArch(UPPER_TEETH, true,  0.42, 0.30,  0.14);
  // Lower arch: 寬 0.38, 深 0.27, y = −0.14
  buildArch(LOWER_TEETH, false, 0.38, 0.27, -0.14);

  scene.add(upperGroup);
  scene.add(lowerGroup);

  raycaster = new THREE.Raycaster();
  mouse     = new THREE.Vector2();

  document.getElementById('loading-overlay').style.display = 'none';

  window.addEventListener('resize', onWindowResize);
  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('click', onClick);

  setupUIControls();
  animate();
}

// ── 互動 ─────────────────────────────────────────────────
function onMouseMove(event) {
  const c = document.getElementById('canvas-container');
  const r = c.getBoundingClientRect();
  mouse.x =  ((event.clientX - r.left) / c.clientWidth)  * 2 - 1;
  mouse.y = -((event.clientY - r.top)  / c.clientHeight) * 2 + 1;
}

function onClick() {
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactableObjects, false);

  // 還原選取
  selectedMeshes.forEach(m => { m.material = originalMaterials.get(m.uuid) || m.material; });
  selectedMeshes = [];

  if (!hits.length) { closeInfoPanel(); return; }

  const mesh     = hits[0].object;
  const toothNum = mesh.userData.toothNum;
  if (!toothNum) { closeInfoPanel(); return; }

  // 高亮
  mesh.material = highlightMat.clone();
  selectedMeshes = [mesh];

  const data = window.getTeethData ? window.getTeethData(toothNum) :
               { zh: `牙齒 #${toothNum}`, en: '', system: '牙齒', desc: '' };
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

// ── UI 控制 ──────────────────────────────────────────────
function setupUIControls() {
  document.getElementById('close-info').addEventListener('click', closeInfoPanel);
  document.getElementById('toggle-upper')?.addEventListener('change', e => { upperGroup.visible = e.target.checked; });
  document.getElementById('toggle-lower')?.addEventListener('change', e => { lowerGroup.visible = e.target.checked; });

  const VIEWS = {
    front:  [0,   0.05,  0.90],
    top:    [0,   0.90,  0.20],
    bottom: [0,  -0.90,  0.20],
    left:   [-0.90, 0.05, 0.18],
  };
  document.querySelectorAll('.camera-views .btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = VIEWS[btn.dataset.view];
      if (!v) return;
      camera.position.set(...v);
      controls.target.set(0, 0, 0.18);
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
